"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/decompress-response";
exports.ids = ["vendor-chunks/decompress-response"];
exports.modules = {

/***/ "(ssr)/./node_modules/decompress-response/index.js":
/*!***************************************************!*\
  !*** ./node_modules/decompress-response/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst {Transform, PassThrough} = __webpack_require__(/*! stream */ \"stream\");\nconst zlib = __webpack_require__(/*! zlib */ \"zlib\");\nconst mimicResponse = __webpack_require__(/*! mimic-response */ \"(ssr)/./node_modules/decompress-response/node_modules/mimic-response/index.js\");\n\nmodule.exports = response => {\n\tconst contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();\n\n\tif (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {\n\t\treturn response;\n\t}\n\n\t// TODO: Remove this when targeting Node.js 12.\n\tconst isBrotli = contentEncoding === 'br';\n\tif (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {\n\t\tresponse.destroy(new Error('Brotli is not supported on Node.js < 12'));\n\t\treturn response;\n\t}\n\n\tlet isEmpty = true;\n\n\tconst checker = new Transform({\n\t\ttransform(data, _encoding, callback) {\n\t\t\tisEmpty = false;\n\n\t\t\tcallback(null, data);\n\t\t},\n\n\t\tflush(callback) {\n\t\t\tcallback();\n\t\t}\n\t});\n\n\tconst finalStream = new PassThrough({\n\t\tautoDestroy: false,\n\t\tdestroy(error, callback) {\n\t\t\tresponse.destroy();\n\n\t\t\tcallback(error);\n\t\t}\n\t});\n\n\tconst decompressStream = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();\n\n\tdecompressStream.once('error', error => {\n\t\tif (isEmpty && !response.readable) {\n\t\t\tfinalStream.end();\n\t\t\treturn;\n\t\t}\n\n\t\tfinalStream.destroy(error);\n\t});\n\n\tmimicResponse(response, finalStream);\n\tresponse.pipe(checker).pipe(decompressStream).pipe(finalStream);\n\n\treturn finalStream;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVjb21wcmVzcy1yZXNwb25zZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLE9BQU8sd0JBQXdCLEVBQUUsbUJBQU8sQ0FBQyxzQkFBUTtBQUNqRCxhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0Isc0JBQXNCLG1CQUFPLENBQUMscUdBQWdCOztBQUU5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1ib2lsZXJwbGF0ZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9kZWNvbXByZXNzLXJlc3BvbnNlL2luZGV4LmpzP2UzZDYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge1RyYW5zZm9ybSwgUGFzc1Rocm91Z2h9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCB6bGliID0gcmVxdWlyZSgnemxpYicpO1xuY29uc3QgbWltaWNSZXNwb25zZSA9IHJlcXVpcmUoJ21pbWljLXJlc3BvbnNlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzcG9uc2UgPT4ge1xuXHRjb25zdCBjb250ZW50RW5jb2RpbmcgPSAocmVzcG9uc2UuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuXG5cdGlmICghWydnemlwJywgJ2RlZmxhdGUnLCAnYnInXS5pbmNsdWRlcyhjb250ZW50RW5jb2RpbmcpKSB7XG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0Ly8gVE9ETzogUmVtb3ZlIHRoaXMgd2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxMi5cblx0Y29uc3QgaXNCcm90bGkgPSBjb250ZW50RW5jb2RpbmcgPT09ICdicic7XG5cdGlmIChpc0Jyb3RsaSAmJiB0eXBlb2YgemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmVzcG9uc2UuZGVzdHJveShuZXcgRXJyb3IoJ0Jyb3RsaSBpcyBub3Qgc3VwcG9ydGVkIG9uIE5vZGUuanMgPCAxMicpKTtcblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRsZXQgaXNFbXB0eSA9IHRydWU7XG5cblx0Y29uc3QgY2hlY2tlciA9IG5ldyBUcmFuc2Zvcm0oe1xuXHRcdHRyYW5zZm9ybShkYXRhLCBfZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG5cdFx0XHRpc0VtcHR5ID0gZmFsc2U7XG5cblx0XHRcdGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuXHRcdH0sXG5cblx0XHRmbHVzaChjYWxsYmFjaykge1xuXHRcdFx0Y2FsbGJhY2soKTtcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IGZpbmFsU3RyZWFtID0gbmV3IFBhc3NUaHJvdWdoKHtcblx0XHRhdXRvRGVzdHJveTogZmFsc2UsXG5cdFx0ZGVzdHJveShlcnJvciwgY2FsbGJhY2spIHtcblx0XHRcdHJlc3BvbnNlLmRlc3Ryb3koKTtcblxuXHRcdFx0Y2FsbGJhY2soZXJyb3IpO1xuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgZGVjb21wcmVzc1N0cmVhbSA9IGlzQnJvdGxpID8gemxpYi5jcmVhdGVCcm90bGlEZWNvbXByZXNzKCkgOiB6bGliLmNyZWF0ZVVuemlwKCk7XG5cblx0ZGVjb21wcmVzc1N0cmVhbS5vbmNlKCdlcnJvcicsIGVycm9yID0+IHtcblx0XHRpZiAoaXNFbXB0eSAmJiAhcmVzcG9uc2UucmVhZGFibGUpIHtcblx0XHRcdGZpbmFsU3RyZWFtLmVuZCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZpbmFsU3RyZWFtLmRlc3Ryb3koZXJyb3IpO1xuXHR9KTtcblxuXHRtaW1pY1Jlc3BvbnNlKHJlc3BvbnNlLCBmaW5hbFN0cmVhbSk7XG5cdHJlc3BvbnNlLnBpcGUoY2hlY2tlcikucGlwZShkZWNvbXByZXNzU3RyZWFtKS5waXBlKGZpbmFsU3RyZWFtKTtcblxuXHRyZXR1cm4gZmluYWxTdHJlYW07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/decompress-response/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/decompress-response/node_modules/mimic-response/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/decompress-response/node_modules/mimic-response/index.js ***!
  \*******************************************************************************/
/***/ ((module) => {

eval("\n\n// We define these manually to ensure they're always copied\n// even if they would move up the prototype chain\n// https://nodejs.org/api/http.html#http_class_http_incomingmessage\nconst knownProperties = [\n\t'aborted',\n\t'complete',\n\t'headers',\n\t'httpVersion',\n\t'httpVersionMinor',\n\t'httpVersionMajor',\n\t'method',\n\t'rawHeaders',\n\t'rawTrailers',\n\t'setTimeout',\n\t'socket',\n\t'statusCode',\n\t'statusMessage',\n\t'trailers',\n\t'url'\n];\n\nmodule.exports = (fromStream, toStream) => {\n\tif (toStream._readableState.autoDestroy) {\n\t\tthrow new Error('The second stream must have the `autoDestroy` option set to `false`');\n\t}\n\n\tconst fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));\n\n\tconst properties = {};\n\n\tfor (const property of fromProperties) {\n\t\t// Don't overwrite existing properties.\n\t\tif (property in toStream) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tproperties[property] = {\n\t\t\tget() {\n\t\t\t\tconst value = fromStream[property];\n\t\t\t\tconst isFunction = typeof value === 'function';\n\n\t\t\t\treturn isFunction ? value.bind(fromStream) : value;\n\t\t\t},\n\t\t\tset(value) {\n\t\t\t\tfromStream[property] = value;\n\t\t\t},\n\t\t\tenumerable: true,\n\t\t\tconfigurable: false\n\t\t};\n\t}\n\n\tObject.defineProperties(toStream, properties);\n\n\tfromStream.once('aborted', () => {\n\t\ttoStream.destroy();\n\n\t\ttoStream.emit('aborted');\n\t});\n\n\tfromStream.once('close', () => {\n\t\tif (fromStream.complete) {\n\t\t\tif (toStream.readable) {\n\t\t\t\ttoStream.once('end', () => {\n\t\t\t\t\ttoStream.emit('close');\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\ttoStream.emit('close');\n\t\t\t}\n\t\t} else {\n\t\t\ttoStream.emit('close');\n\t\t}\n\t});\n\n\treturn toStream;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVjb21wcmVzcy1yZXNwb25zZS9ub2RlX21vZHVsZXMvbWltaWMtcmVzcG9uc2UvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWJvaWxlcnBsYXRlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2RlY29tcHJlc3MtcmVzcG9uc2Uvbm9kZV9tb2R1bGVzL21pbWljLXJlc3BvbnNlL2luZGV4LmpzP2Y2YmIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBXZSBkZWZpbmUgdGhlc2UgbWFudWFsbHkgdG8gZW5zdXJlIHRoZXkncmUgYWx3YXlzIGNvcGllZFxuLy8gZXZlbiBpZiB0aGV5IHdvdWxkIG1vdmUgdXAgdGhlIHByb3RvdHlwZSBjaGFpblxuLy8gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9jbGFzc19odHRwX2luY29taW5nbWVzc2FnZVxuY29uc3Qga25vd25Qcm9wZXJ0aWVzID0gW1xuXHQnYWJvcnRlZCcsXG5cdCdjb21wbGV0ZScsXG5cdCdoZWFkZXJzJyxcblx0J2h0dHBWZXJzaW9uJyxcblx0J2h0dHBWZXJzaW9uTWlub3InLFxuXHQnaHR0cFZlcnNpb25NYWpvcicsXG5cdCdtZXRob2QnLFxuXHQncmF3SGVhZGVycycsXG5cdCdyYXdUcmFpbGVycycsXG5cdCdzZXRUaW1lb3V0Jyxcblx0J3NvY2tldCcsXG5cdCdzdGF0dXNDb2RlJyxcblx0J3N0YXR1c01lc3NhZ2UnLFxuXHQndHJhaWxlcnMnLFxuXHQndXJsJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnJvbVN0cmVhbSwgdG9TdHJlYW0pID0+IHtcblx0aWYgKHRvU3RyZWFtLl9yZWFkYWJsZVN0YXRlLmF1dG9EZXN0cm95KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgc2Vjb25kIHN0cmVhbSBtdXN0IGhhdmUgdGhlIGBhdXRvRGVzdHJveWAgb3B0aW9uIHNldCB0byBgZmFsc2VgJyk7XG5cdH1cblxuXHRjb25zdCBmcm9tUHJvcGVydGllcyA9IG5ldyBTZXQoT2JqZWN0LmtleXMoZnJvbVN0cmVhbSkuY29uY2F0KGtub3duUHJvcGVydGllcykpO1xuXG5cdGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcblxuXHRmb3IgKGNvbnN0IHByb3BlcnR5IG9mIGZyb21Qcm9wZXJ0aWVzKSB7XG5cdFx0Ly8gRG9uJ3Qgb3ZlcndyaXRlIGV4aXN0aW5nIHByb3BlcnRpZXMuXG5cdFx0aWYgKHByb3BlcnR5IGluIHRvU3RyZWFtKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRwcm9wZXJ0aWVzW3Byb3BlcnR5XSA9IHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBmcm9tU3RyZWFtW3Byb3BlcnR5XTtcblx0XHRcdFx0Y29uc3QgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcblxuXHRcdFx0XHRyZXR1cm4gaXNGdW5jdGlvbiA/IHZhbHVlLmJpbmQoZnJvbVN0cmVhbSkgOiB2YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXQodmFsdWUpIHtcblx0XHRcdFx0ZnJvbVN0cmVhbVtwcm9wZXJ0eV0gPSB2YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZVxuXHRcdH07XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0b1N0cmVhbSwgcHJvcGVydGllcyk7XG5cblx0ZnJvbVN0cmVhbS5vbmNlKCdhYm9ydGVkJywgKCkgPT4ge1xuXHRcdHRvU3RyZWFtLmRlc3Ryb3koKTtcblxuXHRcdHRvU3RyZWFtLmVtaXQoJ2Fib3J0ZWQnKTtcblx0fSk7XG5cblx0ZnJvbVN0cmVhbS5vbmNlKCdjbG9zZScsICgpID0+IHtcblx0XHRpZiAoZnJvbVN0cmVhbS5jb21wbGV0ZSkge1xuXHRcdFx0aWYgKHRvU3RyZWFtLnJlYWRhYmxlKSB7XG5cdFx0XHRcdHRvU3RyZWFtLm9uY2UoJ2VuZCcsICgpID0+IHtcblx0XHRcdFx0XHR0b1N0cmVhbS5lbWl0KCdjbG9zZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRvU3RyZWFtLmVtaXQoJ2Nsb3NlJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvU3RyZWFtLmVtaXQoJ2Nsb3NlJyk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gdG9TdHJlYW07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/decompress-response/node_modules/mimic-response/index.js\n");

/***/ })

};
;