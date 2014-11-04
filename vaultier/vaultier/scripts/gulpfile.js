(function () {

    'use strict';

    /* global require:true */
    /* global __dirname:true */
    /* global console:true */

    // Configuration
    var destination = './dist/';
    var destinationUrl = '/static/vaultier/';
    var sourcesDestination = destination;
    var includesFile = destination + 'includes.json';
    var indexFile = './html/index.html';
    var configUrl = '/config/config.js';

    // Load modules definition
    var modulesFilename = './modules.js';
    var modules = require(modulesFilename);
    var modulesTasks = [];
    var moduleTaskNameFormat = 'build-module-{name}';
    var moduleScriptFilenameFormat = '{name}.js';
    var moduleTemplateFilenameFormat = '{name}.tpl.js';

    // Gulp requirements
    var gulp = require('gulp');

    var gulp_concat = require('gulp-concat');
    var gulp_concat_sourcemap = require('gulp-concat-sourcemap');
    var gulp_uglify = require('gulp-uglify');
    var gulp_jshint = require('gulp-jshint');
    var gulp_sourcemaps = require('gulp-sourcemaps');
    var gulp_newer = require('gulp-newer'); // including only newer files
    var gulp_rimraf = require('gulp-rimraf'); // deleting and cleaning
    var gulp_hbars = require('gulp-ember-handlebars');
    var gulp_watch = require('gulp-watch');
    var gulp_livereload = require('gulp-livereload');
    var gulp_replace = require('gulp-replace');
    var gulp_yuidoc = require("gulp-yuidoc");


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
//                .pipe(gulp_sourcemaps.init())
//                .pipe(gulp_uglify())
//                .pipe(gulp_concat(destFile))
//                .pipe(gulp_sourcemaps.write())

                .pipe(gulp_concat_sourcemap(destFile))
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
//                .pipe(gulp_sourcemaps.init())
//                .pipe(gulp_uglify())
//                .pipe(gulp_concat(destFile))
//                .pipe(gulp_sourcemaps.write())

                .pipe(gulp_concat_sourcemap(destFile))
                .pipe(gulp.dest(destination));
        });

    };


    var createBuildTasksForModules = function () {
        for (var m in modules) {
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
        var resources = [];
        for (var m in modules) {
            if (modules.hasOwnProperty(m)) {
                var name = m;
                var content = modules[m];
                if (content.resources) {
                    resources = resources.concat(content.resources);
                }
                if (content.styles) {
                    resources = resources.concat(content.styles);
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

    gulp.task('build-index', function() {
         return gulp.src(indexFile, { base: './' })
             .pipe(gulp_newer(destination))
             // remove comments
             .pipe(gulp_replace(/<!--[\s\S]*?-->/g, ''))
             // add destination url
             .pipe(gulp_replace(/{destinationUrl}/g, destinationUrl))
             // add config url
             .pipe(gulp_replace(/{configUrl}/g, configUrl))
             // build
             .pipe(gulp.dest(destination));

    });

    gulp.task('build-doc', function() {
         return gulp.src("./app/**/*.js")
          .pipe(
             gulp_yuidoc(
                 {
                     project: {
                         "name": "Vaultier",
                         "description": "Vaultier - Collaborative Password manager & file storage",
                         "version": "1.0.0",
                         "url": "http://vaultier.org/"
                     }
                 }
             )
         ).pipe(gulp.dest("./docs"));
    });

    gulp.task('build-includes', function (cb) {

        var resources = [];

        var createResource = function (file, type, module) {
                var destinationPath = path.resolve(destination) + '/';
                var filepath = path.resolve(__dirname, file);
                var mtime = fs.statSync(filepath).mtime.getTime();
                var url = filepath.replace(destinationPath, destinationUrl);
                url = url + '?t=' + mtime;

                resources.push({
                    url: url,
                    type: type,
                    skipLoading: module.skipLoading,
                    environments: module.environments
                });
        };


        for (var m in modules) {
            if (modules.hasOwnProperty(m)) {
                var name = m;
                var content = modules[m];

                if (content.scripts) {
                    var file = destination + moduleScriptFilenameFormat.replace('{name}', name)
                    createResource(file, 'js', content);
                }
                if (content.templates) {
                     var file =  destination + moduleTemplateFilenameFormat.replace('{name}', name)
                     createResource(file, 'js', content);

                }
                if (content.styles ) {
                    for (var i = 0; i < content.styles.length; i++) {
                        var file = destination + content.styles[i].replace('./', '');
                        createResource(file, 'css', content);
                    }
                }
            }
        }


        var pathname = path.resolve(includesFile);
        var file = fs.openSync(pathname, 'w');
        fs.writeSync(file, JSON.stringify({resources: resources}));
        fs.close(file);

        cb();
    });

    gulp.task('clean', function () {
        return gulp.src(destination)
            .pipe(gulp_rimraf({force: true}));
    });

    gulp.task('build', function () {
        var buildTasks = [].concat(modulesTasks, ['build-resources']);

        return runSequence(
            buildTasks,
            'build-index',
            'build-includes'
        );
    });

    gulp.task('watch', ['build'], function () {
        gulp_livereload.listen();

        var glob = [
            indexFile
        ];

        for (var m in modules) {
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
            if (file.path.indexOf(path.resolve(includesFile)) === -1) {
                message = message + ' ...reloading';
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


    gulp.task('clean-watch', function () {
        return runSequence(
            'clean',
            'build',
            'watch'
        );
    });


}());

