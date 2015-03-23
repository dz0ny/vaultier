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
  hinting: false,
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


/**********************************************************************************
 **********************************************************************************
 * FILE UTILITIES
 **********************************************************************************
 **********************************************************************************/

app.import('bower_components/FileSaver/FileSaver.js');
app.import('bower_components/FileAPI/dist/FileAPI.js');

/**********************************************************************************
 **********************************************************************************
 * ENCRYPTION
 **********************************************************************************
 **********************************************************************************/

/**************** encryption core **/
app.import('bower_components/CryptoJS/build/components/core.js');
app.import('bower_components/CryptoJS/build/components/enc-base64.js');
app.import('bower_components/CryptoJS/build/components/md5.js');
app.import('bower_components/CryptoJS/build/components/sha1.js');
app.import('bower_components/CryptoJS/build/components/sha256.js');
app.import('bower_components/CryptoJS/build/components/ripemd160.js');
app.import('bower_components/CryptoJS/build/components/x64-core.js');
app.import('bower_components/CryptoJS/build/components/sha512.js');
app.import('bower_components/CryptoJS/build/rollups/aes.js');

/**************** rsa encryptions **/
app.import('bower_components/jsrsasign/ext/jsbn.js');
app.import('bower_components/jsrsasign/ext/jsbn2.js');
app.import('bower_components/jsrsasign/ext/rsa.js');
app.import('bower_components/jsrsasign/ext/rsa2.js');
app.import('bower_components/jsrsasign/ext/base64.js');
app.import('bower_components/jsrsasign/rsapem-1.1.js');
app.import('bower_components/jsrsasign/rsasign-1.2.js');
app.import('bower_components/jsrsasign/asn1hex-1.1.js');
app.import('bower_components/jsrsasign/x509-1.1.js');
app.import('bower_components/jsrsasign/crypto-1.1.js');


/**************** rsa signatures **/
app.import('bower_components/jsrsasign/jsrsasign-latest-all-min.js');

/**************** rsa keys generation **/
app.import('bower_components/jsencrypt/bin/jsencrypt.js');


/**********************************************************************************
 **********************************************************************************
 * JQUERY EXTENSIONS
 **********************************************************************************
 **********************************************************************************/

//@todo: get rid of sessionStorage jstorage and other nonsenses
app.import('bower_components/notifyjs/dist/notify.js');
app.import('bower_components/notifyjs/dist/styles/bootstrap/notify-bootstrap.js');
app.import('bower_components/jstorage/jstorage.js');
app.import('bower_components/jquery-cookie/jquery.cookie.js');
app.import('bower_components/jquery.dotdotdot/src/js/jquery.dotdotdot.js');
app.import('bower_components/jquery.sessionstorage/jquery.sessionStorage.js');



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
