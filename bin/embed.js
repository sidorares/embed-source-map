#!/usr/bin/env node

var fs    = require('fs');
var path  = require('path');
var embed = require('../index.js');
var globby = require('globby');

function makeSmInline(name) {
  var src = fs.readFileSync(name, 'utf8');
  var srcEmbed = embed(name, src);
  if(src != srcEmbed) {
    fs.writeFileSync(name + '.bak', src);
    fs.writeFileSync(name, srcEmbed);
  }
}

process.argv.slice(2).forEach((arg) => {
    if (arg.indexOf('*') > -1) {
        globby(arg)
            .then(paths => paths.forEach(makeSmInline));
    } else {
        makeSmInline(arg);
    }
});
