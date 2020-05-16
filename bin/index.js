#!/usr/bin/env node

('use strict');

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0]
var minor = semver[1]

if (Number(major) < 10 || (Number(major) === 10 && Number(minor) < 12)) {
  console.error(
    'You are running Node ' +
    currentNodeVersion +
    '.\n' +
    'Create Node App requires Node 10.12.0 or higher. \n' +
    'Please update your version of Node.',
  );
  process.exit(1);
}

require('../lib/create-node-app');
