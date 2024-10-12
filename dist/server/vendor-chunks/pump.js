/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/pump";
exports.ids = ["vendor-chunks/pump"];
exports.modules = {

/***/ "(ssr)/./node_modules/pump/index.js":
/*!************************************!*\
  !*** ./node_modules/pump/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var once = __webpack_require__(/*! once */ \"(ssr)/./node_modules/once/once.js\")\nvar eos = __webpack_require__(/*! end-of-stream */ \"(ssr)/./node_modules/end-of-stream/index.js\")\nvar fs\n\ntry {\n  fs = __webpack_require__(/*! fs */ \"fs\") // we only need fs to get the ReadStream and WriteStream prototypes\n} catch (e) {}\n\nvar noop = function () {}\nvar ancient = /^v?\\.0/.test(process.version)\n\nvar isFn = function (fn) {\n  return typeof fn === 'function'\n}\n\nvar isFS = function (stream) {\n  if (!ancient) return false // newer node version do not need to care about fs is a special way\n  if (!fs) return false // browser\n  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)\n}\n\nvar isRequest = function (stream) {\n  return stream.setHeader && isFn(stream.abort)\n}\n\nvar destroyer = function (stream, reading, writing, callback) {\n  callback = once(callback)\n\n  var closed = false\n  stream.on('close', function () {\n    closed = true\n  })\n\n  eos(stream, {readable: reading, writable: writing}, function (err) {\n    if (err) return callback(err)\n    closed = true\n    callback()\n  })\n\n  var destroyed = false\n  return function (err) {\n    if (closed) return\n    if (destroyed) return\n    destroyed = true\n\n    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks\n    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want\n\n    if (isFn(stream.destroy)) return stream.destroy()\n\n    callback(err || new Error('stream was destroyed'))\n  }\n}\n\nvar call = function (fn) {\n  fn()\n}\n\nvar pipe = function (from, to) {\n  return from.pipe(to)\n}\n\nvar pump = function () {\n  var streams = Array.prototype.slice.call(arguments)\n  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop\n\n  if (Array.isArray(streams[0])) streams = streams[0]\n  if (streams.length < 2) throw new Error('pump requires two streams per minimum')\n\n  var error\n  var destroys = streams.map(function (stream, i) {\n    var reading = i < streams.length - 1\n    var writing = i > 0\n    return destroyer(stream, reading, writing, function (err) {\n      if (!error) error = err\n      if (err) destroys.forEach(call)\n      if (reading) return\n      destroys.forEach(call)\n      callback(error)\n    })\n  })\n\n  return streams.reduce(pipe)\n}\n\nmodule.exports = pump\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHVtcC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSxXQUFXLG1CQUFPLENBQUMsK0NBQU07QUFDekIsVUFBVSxtQkFBTyxDQUFDLGtFQUFlO0FBQ2pDOztBQUVBO0FBQ0EsT0FBTyxtQkFBTyxDQUFDLGNBQUk7QUFDbkIsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dGpzLWJvaWxlcnBsYXRlLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3B1bXAvaW5kZXguanM/Y2VlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgb25jZSA9IHJlcXVpcmUoJ29uY2UnKVxudmFyIGVvcyA9IHJlcXVpcmUoJ2VuZC1vZi1zdHJlYW0nKVxudmFyIGZzXG5cbnRyeSB7XG4gIGZzID0gcmVxdWlyZSgnZnMnKSAvLyB3ZSBvbmx5IG5lZWQgZnMgdG8gZ2V0IHRoZSBSZWFkU3RyZWFtIGFuZCBXcml0ZVN0cmVhbSBwcm90b3R5cGVzXG59IGNhdGNoIChlKSB7fVxuXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG52YXIgYW5jaWVudCA9IC9edj9cXC4wLy50ZXN0KHByb2Nlc3MudmVyc2lvbilcblxudmFyIGlzRm4gPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG52YXIgaXNGUyA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgaWYgKCFhbmNpZW50KSByZXR1cm4gZmFsc2UgLy8gbmV3ZXIgbm9kZSB2ZXJzaW9uIGRvIG5vdCBuZWVkIHRvIGNhcmUgYWJvdXQgZnMgaXMgYSBzcGVjaWFsIHdheVxuICBpZiAoIWZzKSByZXR1cm4gZmFsc2UgLy8gYnJvd3NlclxuICByZXR1cm4gKHN0cmVhbSBpbnN0YW5jZW9mIChmcy5SZWFkU3RyZWFtIHx8IG5vb3ApIHx8IHN0cmVhbSBpbnN0YW5jZW9mIChmcy5Xcml0ZVN0cmVhbSB8fCBub29wKSkgJiYgaXNGbihzdHJlYW0uY2xvc2UpXG59XG5cbnZhciBpc1JlcXVlc3QgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW0uc2V0SGVhZGVyICYmIGlzRm4oc3RyZWFtLmFib3J0KVxufVxuXG52YXIgZGVzdHJveWVyID0gZnVuY3Rpb24gKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrKVxuXG4gIHZhciBjbG9zZWQgPSBmYWxzZVxuICBzdHJlYW0ub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGNsb3NlZCA9IHRydWVcbiAgfSlcblxuICBlb3Moc3RyZWFtLCB7cmVhZGFibGU6IHJlYWRpbmcsIHdyaXRhYmxlOiB3cml0aW5nfSwgZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgY2xvc2VkID0gdHJ1ZVxuICAgIGNhbGxiYWNrKClcbiAgfSlcblxuICB2YXIgZGVzdHJveWVkID0gZmFsc2VcbiAgcmV0dXJuIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoY2xvc2VkKSByZXR1cm5cbiAgICBpZiAoZGVzdHJveWVkKSByZXR1cm5cbiAgICBkZXN0cm95ZWQgPSB0cnVlXG5cbiAgICBpZiAoaXNGUyhzdHJlYW0pKSByZXR1cm4gc3RyZWFtLmNsb3NlKG5vb3ApIC8vIHVzZSBjbG9zZSBmb3IgZnMgc3RyZWFtcyB0byBhdm9pZCBmZCBsZWFrc1xuICAgIGlmIChpc1JlcXVlc3Qoc3RyZWFtKSkgcmV0dXJuIHN0cmVhbS5hYm9ydCgpIC8vIHJlcXVlc3QuZGVzdHJveSBqdXN0IGRvIC5lbmQgLSAuYWJvcnQgaXMgd2hhdCB3ZSB3YW50XG5cbiAgICBpZiAoaXNGbihzdHJlYW0uZGVzdHJveSkpIHJldHVybiBzdHJlYW0uZGVzdHJveSgpXG5cbiAgICBjYWxsYmFjayhlcnIgfHwgbmV3IEVycm9yKCdzdHJlYW0gd2FzIGRlc3Ryb3llZCcpKVxuICB9XG59XG5cbnZhciBjYWxsID0gZnVuY3Rpb24gKGZuKSB7XG4gIGZuKClcbn1cblxudmFyIHBpcGUgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgcmV0dXJuIGZyb20ucGlwZSh0bylcbn1cblxudmFyIHB1bXAgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdHJlYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICB2YXIgY2FsbGJhY2sgPSBpc0ZuKHN0cmVhbXNbc3RyZWFtcy5sZW5ndGggLSAxXSB8fCBub29wKSAmJiBzdHJlYW1zLnBvcCgpIHx8IG5vb3BcblxuICBpZiAoQXJyYXkuaXNBcnJheShzdHJlYW1zWzBdKSkgc3RyZWFtcyA9IHN0cmVhbXNbMF1cbiAgaWYgKHN0cmVhbXMubGVuZ3RoIDwgMikgdGhyb3cgbmV3IEVycm9yKCdwdW1wIHJlcXVpcmVzIHR3byBzdHJlYW1zIHBlciBtaW5pbXVtJylcblxuICB2YXIgZXJyb3JcbiAgdmFyIGRlc3Ryb3lzID0gc3RyZWFtcy5tYXAoZnVuY3Rpb24gKHN0cmVhbSwgaSkge1xuICAgIHZhciByZWFkaW5nID0gaSA8IHN0cmVhbXMubGVuZ3RoIC0gMVxuICAgIHZhciB3cml0aW5nID0gaSA+IDBcbiAgICByZXR1cm4gZGVzdHJveWVyKHN0cmVhbSwgcmVhZGluZywgd3JpdGluZywgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKCFlcnJvcikgZXJyb3IgPSBlcnJcbiAgICAgIGlmIChlcnIpIGRlc3Ryb3lzLmZvckVhY2goY2FsbClcbiAgICAgIGlmIChyZWFkaW5nKSByZXR1cm5cbiAgICAgIGRlc3Ryb3lzLmZvckVhY2goY2FsbClcbiAgICAgIGNhbGxiYWNrKGVycm9yKVxuICAgIH0pXG4gIH0pXG5cbiAgcmV0dXJuIHN0cmVhbXMucmVkdWNlKHBpcGUpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHVtcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/pump/index.js\n");

/***/ })

};
;