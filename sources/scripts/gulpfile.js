'use strict';

var APPLICATION_NAME = 'vaultier';
var gulp = require('gulp'),
    gLivereload = require('gulp-livereload'),
    util = require('util'),
    Q = require('q'),
    gQunit = require('gulp-qunit'),
    jshint = require('gulp-jshint'),
    vaultierConfig = require('./js/modules'),
    EnviromentFactory = require('./js/builder');

var paths = {
    dev: {
        scripts: ["./js/**/*.js", "./local_components/**/*.js"],
        styles: "./css/**/*.css",
        templates: "./js/**/*.hbs",
        tests: "./js/tests/test-runner.html"
    }
}

/**
 * Check for poor coding styles
 * @returns {Stream|promise}
 */
function jshint_watcher() {
    return gulp.src(paths.dev.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter());
}

/**
 * Loop through each module inside the configuration json development environment
 */
function builder(context) {
    var environment = new EnviromentFactory(APPLICATION_NAME);
    var streams = [];
    for (var module in context) {
        try {
            streams.push(environment.build(context[module], module));
        } catch (error) {
            console.error(error, "devBuilder");
            throw error;
        }
    }
    environment.createIncludesFile();
    return Q.all(streams);
}

gulp.task('builder:dev', function () {
    return builder(vaultierConfig.dev);
});

/**
 * Run before deploy
 * use the minified version of the vendor
 */
gulp.task('builder:prod', function () {
    var context = vaultierConfig.dev;
    return builder(context.concat(vaultierConfig.prod));
});

gulp.task('jshint', function () {
    return jshint_watcher();
});

gulp.task('watch', ['builder:dev'], function () {
    var glob = paths.dev.scripts;
    var server = gLivereload();
    glob.push(paths.dev.styles);
    glob.push(paths.dev.templates);

    gulp.watch(glob, ['builder:dev']).on('change', function (file) {
        setTimeout(function () {
            server.changed(file.path);
        }, 140);
    });
});

