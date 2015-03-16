/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var util = require('util');
var webpackify = require('broccoli-webpack');
var path = require('path');
var webpack = require("webpack");

// Custom inherited EmberApp to include own compilations
var VaultierApp = function () {
  return VaultierApp.super_.apply(this, arguments);
};
util.inherits(VaultierApp, EmberApp);

VaultierApp.prototype.kernelJavascript = function () {

  var bundler = webpackify(path.resolve('kernel'), {
    entry: './main',
    output: {filename: './assets/kernel.js'},
    devtool: 'eval',

    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel-loader' },
        {test: /\.hbs$/, loader: "handlebars-loader"}
      ]
    },
    plugins: [
      //@todo: maybe uglify and minifi
      // if (this.options.minifyJS.enabled === true) >>>
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });

  return bundler;
};

VaultierApp.prototype.toArray = function () {
  var trees = EmberApp.prototype.toArray.apply(this, arguments);

  trees.push(this.kernelJavascript());

  return trees;
};

var app = new VaultierApp({
  name: 'vaultier/app',
  outputPaths: {
    app: {
      html: 'index.html',
      css: {
        'app': '/assets/vaultier.css'
      },
      js: '/assets/vaultier.js'
    }
  }
});

/**********************************************************************************
 **********************************************************************************
 * BOOTSTRAP
 **********************************************************************************
 **********************************************************************************/
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {destDir: 'assets'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/js/bootstrap.js');

/**********************************************************************************
 **********************************************************************************
 * Ember RESTLess
 **********************************************************************************
 **********************************************************************************/
app.import('bower_components/ember-restless/dist/ember-restless.js');

/**********************************************************************************
 **********************************************************************************
 * Momentjs
 **********************************************************************************
 **********************************************************************************/
app.import('bower_components/momentjs/moment.js');


/**********************************************************************************
 **********************************************************************************
 * Keypress
 **********************************************************************************
 **********************************************************************************/
app.import('bower_components/Keypress/keypress.js');


/**********************************************************************************
 **********************************************************************************
 * JSEP Javascript expression parse
 **********************************************************************************
 **********************************************************************************/
//@todo: elaborate to import over AMD
app.import('bower_components/jsep/build/jsep.js');


// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
