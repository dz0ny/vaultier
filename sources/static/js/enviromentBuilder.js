'use strict';

var gulp = require('gulp'),
    Stream = require('stream'),
    es = require('event-stream'),
    streamqueue = require('streamqueue'),
    fs = require('fs'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'),
    minifyCss = require('gulp-minify-css'),
    handlebars = require('gulp-ember-handlebars'),
    gConcat = require('gulp-concat-sourcemap'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

/**
 *
 * @param src
 * @param dest
 * @returns {Stream}
 */
function gulpCopy(src, dest) {
    return gulp.src(src)
        .pipe(newer(dest))
        .pipe(gulp.dest(dest));
}

/**
 *
 * @param src
 * @param name
 * @returns {promise|stream}
 */
function compileHandlebarsTemplates(src, name) {
    var dest = './tpl/' + name;
    return gulp.src(src)
        .pipe(newer(dest))
        .pipe(handlebars({
            outputType: 'browser',
            processTemplateName: function (file) {
                var path = file.path;
                var dirs = path.split('/');
                return dirs.slice(-2).join('/');
            }
        }))
        .pipe(gulp.dest(dest));
}

var Builder = function (customPaths, applicationName) {
    var application = applicationName;
    var modules = [];
    var parsedFiles = [];
    var paths = customPaths;
    var actualType;
    var extensions = {
        'scripts': '.js',
        'styles': '.css',
        'templates': '.hbs'
    };

    var buildRootPath = function (path) {
        var pathDirs = path.split('/');
        // create the new file structure with adding the
        // application name before the last dir
        // eliminate the name of the file from the path
        var sourceMapRoot = pathDirs.slice(0, pathDirs.length - 2);
        sourceMapRoot.push(application); // Add the aplication name
        sourceMapRoot.push(pathDirs[pathDirs.length - 1]); // add the last dir
        var rootPath = sourceMapRoot.slice(1).join('/');// take off the dots from config
        return rootPath;
    };

    /**
     *
     * @param src
     * @param pathPrefix
     * @returns {promise}
     */
    var createFileStructure = function (src, pathPrefix) {
        var org = src.path;
        var dest;
        var dirs = org.split('/');
        var stream = streamqueue({objectMode: true});
        dest = pathPrefix + dirs.slice(dirs.indexOf(application) + 3, -1).join('/');
        stream.queue(gulpCopy(org, dest));
        return dest + '/' + src.relative;
    };

    var addFileAsParsed = function (file) {
        parsedFiles.push(file);
    };

    var resetParsedFiles = function () {
        parsedFiles = [];
    };

    this.TEMPLATES_KEY = "templates";
    this.SCRIPTS_KEY = "scripts";

    /**
     * Copy the file structure to the destination dir
     * @param module
     * @param type
     * @param name
     * @returns {exports.Transform}
     */
    this.createModule = function (module, type, name) {
        resetParsedFiles();
        var ts = new Stream.Transform({objectMode: true});
        actualType = type;
        var path = paths.build[type];
        name = name + extensions[type];
        if (!module.skip_from_loader) {
            modules.push({
                "type": type,
                "file": path.slice(2) + name
            });
        }
        var rootPath = buildRootPath(path);
        ts._transform = function (file, encoding, callback) {
            var finish = function (stream) {
                stream.push(file);
                callback();
            };
            var f = createFileStructure(file, '../' + rootPath + 'sources/');
            addFileAsParsed(f);
            finish(this);
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

    this.getDirByExtension = function (type) {
        return extensions[type].slice(1);
    };
};

/**
 * Creates the includes json with all the concatenated modules to be loaded
 * [{type: "module_type", file: "path_to_concatenated_file"}, ...]
 */
Builder.prototype.createIncludesFile = function () {
    var modules = this.getModules();
    var file = fs.openSync('../static/js/includes.json', 'w');
    fs.writeSync(file, JSON.stringify({"modules": modules}));
    fs.close(file);
};

/**
 * Loads the module configuration and executes the tasks
 * @param module object containing arrays od files
 * @param name the name of the module
 */
Builder.prototype.parseModule = function (module, name) {

    if (module[this.TEMPLATES_KEY] && module[this.SCRIPTS_KEY]) {
        // scripts and templates go together
        var extension = this.getDirByExtension(this.SCRIPTS_KEY);
        var queue = new streamqueue({objectMode: true});
        queue.queue(compileHandlebarsTemplates(module[this.TEMPLATES_KEY], name));
        queue.done(
                es.merge(
                    gulp.src(module[this.SCRIPTS_KEY]),
                    gulp.src('./tpl/' + name + '/*.js')
                )
            )
            .pipe(this.createModule(module, this.SCRIPTS_KEY, name))
            .pipe(
                gConcat(
                    name + '.' + extension,
                    {
                        sourceRoot: '/static/vaultier/sources/'
                    }
                ))
            .pipe(gulp.dest('../static/' + extension));

        delete module[this.TEMPLATES_KEY];
        delete module[this.SCRIPTS_KEY];
    }

    for (var type in module) {
        if (module[type].hasOwnProperty('length') && typeof module[type] !== 'string') {
            // make sure that it is an array
            var extension = this.getDirByExtension(type);
            var queue = new streamqueue({objectMode: true});
            queue.queue(
                    gulp.src(module[type])
                        .pipe(this.createModule(module, type, name))
                        .pipe(gulpif(type === 'styles', minifyCss()))
                ).done()
                .pipe(
                    gConcat(
                        name + '.' + extension,
                        {
                            sourceRoot: '/static/vaultier/sources/'
                        }
                    ))
                .pipe(gulp.dest('../static/' + extension));
        }
    }
};

module.exports = Builder;
