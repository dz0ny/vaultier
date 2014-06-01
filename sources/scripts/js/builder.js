'use strict';

var gulp = require('gulp'),
    Path = require('path'),
    Stream = require('stream'),
    Q = require('q'),
    eventStream = require('event-stream'),
    util = require('util'),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'),
    gImageMin = require('gulp-imagemin'),
    gMinifyCss = require('gulp-minify-css'),
    gEmberHandlebars = require('gulp-ember-handlebars'),
    gConcatSourcemap = require('gulp-concat-sourcemap');

/**
 * Delegates on gulp for coping files to their destination
 * @param src {Glob}
 * @param dest {string}
 * @returns {stream}
 */
function gulpCopy(src, dest) {
    return gulp.src(src)
        .pipe(newer(dest))
        .pipe(gulp.dest(dest));
}

/**
 * Encapsulates the logic of building a clean path
 * @returns {string}
 */
function createPath() {
    var path = Path.join.apply(null, arguments);
    return Path.normalize(path);
}

/**
 * Compiles the handlebars templates and add then  to a directory with name passed to as name
 * @param target {Glob}
 * @param name {String}
 * @returns {Promise|Stream}
 */
function compileHandlebarsTemplates(target, name) {
    var dest = createPath(process.cwd(), 'tpl', name);
    return gulp.src(target)
        .pipe(gEmberHandlebars({
            outputType: 'browser',
            processTemplatePath: function (file) {
                var path = file.path;
                var dirs = path.split('/');
                return dirs.slice(-2).join('/');
            }
        }))
        .pipe(gulp.dest(dest));
}

/**
 * Encapsulates concatenation and compilation of files by type
 * in a module define on the application config
 * Supported types are {scripts|templates|styles}
 * @param applicationName {string}
 * @constructor
 */
var Builder = function (applicationName, options) {

    options = options || {};
    this.TEMPLATES_KEY = options.templatesKey || 'templates';
    this.SCRIPTS_KEY = options.scriptsKey || 'scripts';
    this.STYLES_KEY = options.stylesKey || 'styles';
    this.staticsdir = options.staticDir || 'static';
    this.compileTemplates = options.templatesDir || './tpl/';
    this.name;
    this.currentModule;

    /**
     * Used to handle access to methods inside closure
     * @type {Builder}
     */
    var self = this;

    /**
     * The name of the application
     * used to create the root directory
     * @type {string}
     */
    var application = applicationName;

    /**
     *  @var registry of parsed modules
     *  @private
     */
    var modules = [];

    /**
     *  @var registry of parsed files
     *  @private
     */
    var actualType;

    var currentRunningPath = process.cwd();

    var extensions = {
        'scripts': '.js',
        'styles': '.css',
        'templates': '.hbs'
    };

    /**
     * Get the parent directory from process.cwd()
     * @returns {string}
     */
    this.getParentDir = function () {
        // get the path to the parent dir of the current running directory
        return currentRunningPath.slice(0, currentRunningPath.lastIndexOf('/'));
    }

    /**
     * Replicate the original file for reference in sourcemap
     * @param file {Buffer}
     * @returns {promise | Stream}
     */
    var writeFileToDestiny = function (file) {
        var dest = self.getParentDir();
        dest = createPath(
            dest, self.staticsdir, self.getAppName(), 'sources',
            file.path.slice(currentRunningPath.length, file.relative.length * -1));
        return gulpCopy(file.path, dest);
    };

    /**
     * Holds the current type of the files that we are parsing
     * @param type {string}
     */
    this.setActualType = function (type) {
        actualType = type;
    };

    this.getActualType = function () {
        return actualType;
    };

    /**
     * Copy the file structure to the destination dir
     * @returns {exports.Transform}
     */
    this.prepareFiles = function () {
        var type = this.getActualType();
        var ts = new Stream.Transform({objectMode: true});
        var parentDir = (extensions[type] || type).slice(1);

        var name = this.name + extensions[type];
        var skipFromLoader = this.currentModule.skip_from_loader;
        if (!skipFromLoader && type === this.SCRIPTS_KEY) {
            modules.push({
                "type": type,
                "file": '/' + createPath(self.staticsdir, self.getAppName(), parentDir, name)
            });
        } else if (!skipFromLoader && type === this.STYLES_KEY) {
            for (var index in this.currentModule[type]) {
                var file  = this.currentModule[type][index];
                var pathToFile = file.slice(1);
                modules.push({
                    "type": type,
                    "file": '/' + createPath(self.staticsdir, self.getAppName(), 'sources', pathToFile)
                });
            }
        }

        /**
         * All Transform stream implementations must provide
         * a _transform method to accept input and produce output.
         * @param file {Buffer | String}
         * @param encoding {String}
         * @param callback {Function | Null}
         * @private
         */
        ts._transform = function (file, encoding, callback) {
            writeFileToDestiny(file);
            this.push(file);
            if (typeof callback === 'function') {
                callback();
            }
        };
        return ts;
    };

    /**
     * Needed to create the json with all the prosessed modules
     * @returns {Array}
     */
    this.getModules = function () {
        return modules;
    };

    /**
     * Get the file extension that is saved on the variable extensions under the <type> key
     * @param type {String}
     * @returns {String}
     */
    this.getExtension = function (type) {
        return extensions[type];
    };

    this.getAppName = function () {
        return application;
    };
};

/**
 * Creates the includes json with all the concatenated modules to be loaded
 * [{type: "module_type", file: "path_to_concatenated_file"}, ...]
 */
Builder.prototype.createIncludesFile = function () {
    var modules = this.getModules();
    var includesFilePath = createPath(this.getParentDir(), this.staticsdir, this.getAppName(), '/includes.json');
    var file = fs.openSync(includesFilePath, 'w');
    fs.writeSync(file, JSON.stringify({"modules": modules}));
    fs.close(file);
};

/**
 * Executes common tasks on the current stream
 * @param stream {Stream}
 * @param destination {String}
 * @param sourcesRootPath {String}
 * @returns {Stream}
 */
Builder.prototype.processStream = function (stream, destination, sourcesRootPath) {
    var type = this.getActualType();
    var extension = this.getExtension(type) || '.' + type;
    return stream
        .pipe(gulpif(type === 'images', newer(destination + '/' + extension.slice(1))))
        .pipe(this.prepareFiles(this.currentModule))
        .pipe(gulpif(type === this.STYLES_KEY, gMinifyCss()))
        .pipe(gulpif(type === 'images', gImageMin()))
        .pipe(
            gulpif(
                [this.SCRIPTS_KEY].indexOf(type) > -1,
                gConcatSourcemap(
                    this.name + extension,
                    {
                        sourceRoot: '/' + sourcesRootPath + '/'
                    }
                )
            ))
        .pipe(gulpif([this.STYLES_KEY, 'fonts'].indexOf(type) < 0, gulp.dest(destination + '/' + extension.slice(1))));
};

/**
 * Loads the module configuration and executes the
 * tasks for each type of file inside the module
 * @param module object containing arrays od files
 * @param name the name of the module
 */
Builder.prototype.build = function (module, name) {
    var streams = [];
    var moduleTypes = Object.keys(module);
    this.name = name;
    this.currentModule = module;
    var destination = createPath(this.getParentDir(), this.staticsdir, this.getAppName());
    var sourcesRootPath = createPath(this.staticsdir, this.getAppName(), 'sources');
    if (module[this.TEMPLATES_KEY] && module[this.SCRIPTS_KEY]) {
        this.setActualType(this.SCRIPTS_KEY);
        // scripts and templates go together
        var stream = eventStream.merge(
            eventStream.concat(compileHandlebarsTemplates(module[this.TEMPLATES_KEY], name)),
            gulp.src(module[this.SCRIPTS_KEY])
        );
        streams.push(this.processStream(stream, destination, sourcesRootPath));

        delete moduleTypes[moduleTypes.indexOf(this.SCRIPTS_KEY)];
        delete moduleTypes[moduleTypes.indexOf(this.TEMPLATES_KEY)];
    }

    for (var t in moduleTypes) {
        var type = moduleTypes[t];
        if (util.isArray(module[type])) {
            this.setActualType(type);
            var stream = gulp.src(module[type]);
            streams.push(this.processStream(stream, destination, sourcesRootPath));
        }
    }
    return Q.all(streams);
};

module.exports = Builder;