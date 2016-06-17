var convert = require('convert-source-map');

var fs = require('fs');
var path = require('path');

function addSources(basedir, map) {
  if (Array.isArray(map.sourcesContent))
    return;
  map.sourcesContent = [];
  map.sources.forEach(function(name, idx) {
    map.sourcesContent[idx] = fs.readFileSync(path.join(basedir, map.sourceRoot, name), 'utf8');
  });
}

function replaceMatchWith(match, newContent)
{
  var src = match.input;
  return src.slice(0, match.index) + newContent + src.slice(match.index + match[0].length);
}

module.exports = function embedSourcemap(name, src)
{
  var smMimeEncodedRx = /^[ \t]*\/\/[@|#][ \t]+sourceMappingURL=data:(?:application|text)\/json;base64,(.+)/m;
  var smCommentRx     = /^[ \t]*\/\/[@|#][ \t]+sourceMappingURL=(.*)/m;
  var comment, map;

  // already base64 mime encoded.
  // embed sources if necessary
  var match = src.match(smMimeEncodedRx);
  if (match)
  {
    map = convert.fromComment(match[0]).sourcemap;
    addSources(path.dirname(name), map);
    comment = convert.fromObject(map).toComment();
    return replaceMatchWith(match, comment);
  }

  // ref to a file. load, embed sources and convert to base64 mime encoded comment
  match = src.match(smCommentRx);
  if(match) {
    map = JSON.parse(fs.readFileSync(path.resolve(path.dirname(name), match[1]), 'utf8'));
    addSources(path.dirname(name), map);
    comment = convert.fromObject(map).toComment();
    return replaceMatchWith(match, comment);
  }
  return src;
};
