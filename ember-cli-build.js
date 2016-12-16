/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var zipTree = require('broccoli-zip-js');
var rename = require('broccoli-stew').rename;
var concat = require('broccoli-concat');
var deploy = require('broccoli-salesforce-deploy');
deploy.setLogLevel('info'); // info and error accepted
var log = require('broccoli-stew').log;

var pkgJson = require('./package.json');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    // inlineContent: {
    //   'projectName': { content: pkgJson.name },
    // },
    // outputPaths: {
    //   app: {  html: pkgJson.name + '.page' }
    // }
  // Add options here
  });
  var appTree = app.toTree();

  var staticresource = zipTree(appTree, { name: pkgJson.name + '.zip' });
  staticresource = deploy(staticresource, {
    skipFirstBuild: true,
    type: 'StaticResource',
    file: pkgJson.name + '.zip',
    username: 'bvellacott@yahoo.com',
    password: 'London2016',
    securityToken: 'IMuTdOkCa6DVTEteh1MZd9gd',
    name: pkgJson.name
  });

  var page = deploy(appTree, {
    type: 'ApexPage',
    apiVersion: '37.0',
    file: 'index.html',
    description: 'dodi',
    username: 'bvellacott@yahoo.com',
    password: 'London2016',
    securityToken: 'IMuTdOkCa6DVTEteh1MZd9gd',
    name: pkgJson.name
  });
   
  return mergeTrees([appTree, page, staticresource], { overwrite: true });
};
