#!/usr/bin/env node

var fs    = require('fs');
var path  = require('path');
var embed = require('../index.js');

function makeSmInline(name) {
  var src = fs.readFileSync(name, 'utf8');
  var srcEmbed = embed(src);
  if(src != srcEmbed) {
    fs.writeFileSync(name + '.bak', src);
    fs.writeFileSync(name, srcEmbed);
  }
}

process.argv.slice(2).forEach(makeSmInline);
