/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var exportTree = require('broccoli-export-tree');
var zipTree = require('broccoli-zip');
var rename = require('broccoli-stew').rename;
var concat = require('broccoli-concat');

var pkgJson = require('./package.json');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    // inlineContent: {
    //   'projectName': { content: pkgJson.name },
    // },
    outputPaths: {
      app: {  html: pkgJson.name + '.page' }
    }
  // Add options here
  });
  var appTree = app.toTree();

  // var localPage = pickFiles(appTree, { include: ['index.html'] });
  // localPage = concat(localPage, {
  //   outputFile: 'index.html',
  //   header: '<!DOCTYPE html>',
  //   inputFiles: ['index.html'],
  // });

  // var vfPage = pickFiles('./app', { include: ['index.html'] });

  // vfPage = concat(vfPage, {
  //   outputFile: pkgJson.name + '.page',
  //   header: '<apex:page sidebar="false" showHeader="false" docType="html-5.0">',
  //   inputFiles: ['index.html'],
  //   footer: "</apex:page>",
  // });

  // var pageMeta = pickFiles('./app', { include: ['page-meta.xml'], destDir: 'pages' })
  // pageMeta = rename(pageMeta, 'page-meta.xml', pkgJson.name + '.page-meta.xml');

  var statickresource = zipTree(appTree, pkgJson.name);
  statickresource = rename(statickresource, pkgJson.name + '.zip', pkgJson.name + '.resource');
  // statickresource = pickFiles(statickresource, { include: [pkgJson.name + '.resource'], destDir: 'staticresources' });
  // var staticresourceMeta = pickFiles('./app', { include: ['resource-meta.xml'], destDir: 'staticresources' })
  // staticresourceMeta = rename(staticresourceMeta, 'resource-meta.xml', pkgJson.name + '.resource-meta.xml');

  // var package = mergeTrees([vfPage, pageMeta, statickresource, staticresourceMeta]);
  // package = exportTree(package, {
  //   destDir: 'package'
  // });
  // app = mergeTrees([app, tst]);

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
   
  return mergeTrees([appTree, /*localPage,*/ statickresource]/*, { overwrite: true }*/);
  // return app.toTree();
};
