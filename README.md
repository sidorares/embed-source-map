embed-source-map
================

Convert sourcemaps with external references to inlineable sourcemap

### Install
	$ npm install -g embed-source-map-src
	
### command line
  $ embed-sm src1.js src2.js src3.js
  
### command line example:

  $ embed-sm spine/lib/list.js
  
converts source-map in [list.js](https://github.com/spine/spine/blob/master/lib/list.js) from

```js

//... end of file:
/*
//@ sourceMappingURL=list.map
*/
```

to 

```js

//...
/*
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdX.......
*/
```
embeeding spine/lib/list.coffee source and encoding to mime/base64 url

### API:

```js
var embed = require('embed-source-map-src');
var src = require('fs').readFileSync('../spine/lib/list.js');
console.log(embed(src));
```
