'use strict';

var APPLICATION_NAME = "vaultier";
var gulp = require('gulp'),
    vhost = require('vhost'),
    watch = require('gulp-watch'),
    newer = require('gulp-newer'),
    livereload = require('gulp-livereload'),
    connect = require('connect'),
    jshint = require('gulp-jshint'),
    EnviromentFactory = require('rclick-ember-enviroment'),
    vaultierConfig = require('./js/modules');

var paths = {
    dev: {
        scripts: ['./js/**/*js', './local_components/**/*.js'],
        images: './images/**/*',
        styles: './css/*.css',
        templates: ['./js/**/*.hbs'],
        vendors: ['./bower_components/', './local_components/'],
        config: './js/modules.json',
        fonts: './bower_components/bootstrap/dist/fonts/*{.eot,.svg,.ttf,.woff}'
    },
    build: {
        scripts: '../static/js/',
        images: '../static/images/',
        styles: '../static/css/',
        templates: '../static/tpl/',
        vendors: '../static/lib/',
        fonts: '../static/fonts/'
    }
};

var enviroment = new EnviromentFactory(paths, APPLICATION_NAME);

function jshint_watcher() {
    return gulp.src(paths.dev.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter());
}

function devBuilder() {
    var context = vaultierConfig.dev;
    for (var module in context) {
        enviroment.parseModule(context[module], module);
    }
    enviroment.createIncludesFile();
}

gulp.task('builder:dev', function () {
    devBuilder();
});

gulp.task('fonts', function () {
    return gulp.src(paths.dev.fonts).pipe(gulp.dest(paths.build.fonts));
});

gulp.task('server', function (next) {
    var server = connect();
    server.use(connect.static('/var/www/vaultier/sources')).listen(8001, next);
});

gulp.task('watch', ['fonts', 'builder:dev', 'server'], function () {
    var server = livereload();
    //gulp.watch(paths.dev.scripts, jshint_watcher);

    gulp.src(['./js/**/*.js', './css/**/*.css', './js/**/*.hbs'])
        .on('change', function (file) {
            devBuilder();
            server.changed(file.path);
        });
});

