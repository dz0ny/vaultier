// Configuration
var destination = './../static/vaultier/';
var destinationUrl = '/static/vaultier/';
var sourcesDestination = destination;
var includesFile = destination + 'includes.json';
var environment = 'dev';

// Load modules definition
var modulesFilename = './modules.js';
var modulesDefinition = require(modulesFilename);
var modulesTasks = [];
var moduleTaskNameFormat = 'build-module-{name}';
var moduleScriptFilenameFormat = '{name}.js';
var moduleTemplateFilenameFormat = '{name}.tpl.js';

// Gulp requirements
var gulp = require('gulp');

var gulp_concat = require('gulp-concat-sourcemap'); // concating with source maps
var gulp_newer = require('gulp-newer'); // including only newer files
var gulp_rimraf = require('gulp-rimraf'); // deleting and cleaning
var gulp_hbars = require('gulp-ember-handlebars');
var gulp_watch = require('gulp-watch');
var gulp_livereload = require('gulp-livereload');


// Global requirements
var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');

var createTemplateBuildTask = function (taskname, name, content) {
    var destFile = moduleTemplateFilenameFormat.replace('{name}', name);
    var glob = content.templates;

    gulp.task(taskname, function () {
        return gulp
            .src(glob)
            .pipe(gulp_newer(destination + destFile))
            .pipe(gulp_hbars({
                outputType: 'browser',
                processTemplatePath: function (file) {
                    var path = file.path;
                    var dirs = path.split('/');
                    return dirs.slice(-2).join('/');
                }
            }))
            .pipe(gulp_concat(destFile))
            .pipe(gulp.dest(destination));
    });
};

var createScriptsBuildTask = function (taskname, name, content) {
    var destFile = moduleScriptFilenameFormat.replace('{name}', name);
    var glob = content.scripts;
    gulp.task(taskname, function () {
        return gulp
            .src(glob)
            .pipe(gulp_newer(destination + destFile))
            .pipe(gulp_concat(destFile))
            .pipe(gulp.dest(destination));
    });

};


var createBuildTasksForModules = function () {
    var modules = modulesDefinition[environment];
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {
            var name = m;
            var content = modules[m];
            var taskname = moduleTaskNameFormat.replace('{name}', name);
            var subtasks = [];


            if (content.templates) {
                var templatesTaskname = taskname + '-templates';
                createTemplateBuildTask(templatesTaskname, name, content);
                subtasks.push(templatesTaskname);
            }

            if (content.scripts) {
                var scriptsTaskname = taskname + '-scripts';
                createScriptsBuildTask(scriptsTaskname, name, content);
                subtasks.push(scriptsTaskname);
            }

            gulp.task(taskname, subtasks);
            modulesTasks.push(taskname);
        }
    }

};

createBuildTasksForModules();

gulp.task('build-resources', function () {
    var modules = modulesDefinition[environment];
    var resources = [];
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {
            var name = m;
            var content = modules[m];
            if (content.resources) {
                resources = resources.concat(content.resources)
            }
            if (content.scripts) {
                resources = resources.concat(content.scripts)
            }
            if (content.styles) {
                resources = resources.concat(content.styles)
            }
        }
    }

    resources = resources.concat([
        // add custom resources to copy here
    ]);

    return gulp
        .src(resources, { base: './' })
        .pipe(gulp_newer(sourcesDestination))
        .pipe(gulp.dest(sourcesDestination));
});

gulp.task('build-includes', function (cb) {
    var modules = modulesDefinition[environment];
    var scripts = [];
    var styles = [];
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {
            var name = m;
            var content = modules[m];
            if (content.scripts && !content.skipLoading) {
                scripts.push(
                        destination + moduleScriptFilenameFormat.replace('{name}', name)
                )
            }
            if (content.templates && !content.skipLoading) {
                scripts.push(
                        destination + moduleTemplateFilenameFormat.replace('{name}', name)
                )
            }
            if (content.styles && !content.skipLoading) {
                for (var i = 0; i < content.styles.length; i++) {
                    styles.push(destination + content.styles[i].replace('./', ''));
                }
            }
        }
    }

    var buildForFileType = function (urls, files, type) {
        for (var i = 0; i < files.length; i++) {
            var destinationPath = path.resolve(destination) + '/';
            var filepath = path.resolve(__dirname, files[i]);
            var mtime = fs.statSync(filepath).mtime.getTime();
            var url = filepath.replace(destinationPath, destinationUrl);
            var url = url + '?t=' + mtime;

            urls.push({file : url, type: type});
        }
    };

    var urls = [];
    buildForFileType(urls, scripts, 'scripts');
    buildForFileType(urls, styles, 'styles');


    var pathname = path.resolve(includesFile);
    var file = fs.openSync(pathname, 'w');
    fs.writeSync(file, JSON.stringify({modules: urls}));
    fs.close(file);

    cb();
});

// does not work in outside directory
gulp.task('clean', function () {
    return gulp.src(destination)
        .pipe(gulp_rimraf({force: true}));
});

gulp.task('build', function () {
    var buildTasks = [].concat(modulesTasks, ['build-resources']);

    return runSequence(
        buildTasks,
        'build-includes'
    )
});

gulp.task('watch', ['build'], function () {
    gulp_livereload.listen();

    var modules = modulesDefinition[environment];
    var glob = [];
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {
            var content = modules[m];
            if (content.scripts) {
                glob = glob.concat(content.scripts);
            }
            if (content.templates) {
                glob = glob.concat(content.templates);
            }
            if (content.styles) {
                glob = glob.concat(content.styles);
            }
            if (content.images) {
                glob = glob.concat(content.images);
            }
        }
    }

    gulp.watch(glob, ['build']);

    gulp.watch([destination + '**/*.*'], function (file) {
        var message = file.path + ' ...rebuilt';
        if (file.path.indexOf(path.resolve(includesFile)) == -1) {
            message = message + ' ...reloading'
            gulp_livereload.changed(file.path);
        }
        console.log(message);
    });

});

gulp.task('default', ['watch']);

gulp.task('clean-build', function () {
    return runSequence(
        'clean',
        'build'
    );
});