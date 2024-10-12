/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ed2curve";
exports.ids = ["vendor-chunks/ed2curve"];
exports.modules = {

/***/ "(ssr)/./node_modules/ed2curve/ed2curve.js":
/*!*******************************************!*\
  !*** ./node_modules/ed2curve/ed2curve.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/*\n * ed2curve: convert Ed25519 signing key pair into Curve25519\n * key pair suitable for Diffie-Hellman key exchange.\n *\n * Written by Dmitry Chestnykh in 2014. Public domain.\n */\n/* jshint newcap: false */\n(function(root, f) {\n  'use strict';\n  if ( true && module.exports) module.exports = f(__webpack_require__(/*! tweetnacl */ \"(ssr)/./node_modules/tweetnacl/nacl-fast.js\"));\n  else root.ed2curve = f(root.nacl);\n}(this, function(nacl) {\n  'use strict';\n  if (!nacl) throw new Error('tweetnacl not loaded');\n\n  // -- Operations copied from TweetNaCl.js. --\n\n  var gf = function(init) {\n    var i, r = new Float64Array(16);\n    if (init) for (i = 0; i < init.length; i++) r[i] = init[i];\n    return r;\n  };\n\n  var gf0 = gf(),\n      gf1 = gf([1]),\n      D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),\n      I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);\n\n  function car25519(o) {\n    var c;\n    var i;\n    for (i = 0; i < 16; i++) {\n      o[i] += 65536;\n      c = Math.floor(o[i] / 65536);\n      o[(i+1)*(i<15?1:0)] += c - 1 + 37 * (c-1) * (i===15?1:0);\n      o[i] -= (c * 65536);\n    }\n  }\n\n  function sel25519(p, q, b) {\n    var t, c = ~(b-1);\n    for (var i = 0; i < 16; i++) {\n      t = c & (p[i] ^ q[i]);\n      p[i] ^= t;\n      q[i] ^= t;\n    }\n  }\n\n  function unpack25519(o, n) {\n    var i;\n    for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);\n    o[15] &= 0x7fff;\n  }\n\n  // addition\n  function A(o, a, b) {\n    var i;\n    for (i = 0; i < 16; i++) o[i] = (a[i] + b[i])|0;\n  }\n\n  // subtraction\n  function Z(o, a, b) {\n    var i;\n    for (i = 0; i < 16; i++) o[i] = (a[i] - b[i])|0;\n  }\n\n  // multiplication\n  function M(o, a, b) {\n    var i, j, t = new Float64Array(31);\n    for (i = 0; i < 31; i++) t[i] = 0;\n    for (i = 0; i < 16; i++) {\n      for (j = 0; j < 16; j++) {\n        t[i+j] += a[i] * b[j];\n      }\n    }\n    for (i = 0; i < 15; i++) {\n      t[i] += 38 * t[i+16];\n    }\n    for (i = 0; i < 16; i++) o[i] = t[i];\n    car25519(o);\n    car25519(o);\n  }\n\n  // squaring\n  function S(o, a) {\n    M(o, a, a);\n  }\n\n  // inversion\n  function inv25519(o, i) {\n    var c = gf();\n    var a;\n    for (a = 0; a < 16; a++) c[a] = i[a];\n    for (a = 253; a >= 0; a--) {\n      S(c, c);\n      if(a !== 2 && a !== 4) M(c, c, i);\n    }\n    for (a = 0; a < 16; a++) o[a] = c[a];\n  }\n\n  function pack25519(o, n) {\n    var i, j, b;\n    var m = gf(), t = gf();\n    for (i = 0; i < 16; i++) t[i] = n[i];\n    car25519(t);\n    car25519(t);\n    car25519(t);\n    for (j = 0; j < 2; j++) {\n      m[0] = t[0] - 0xffed;\n      for (i = 1; i < 15; i++) {\n        m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);\n        m[i-1] &= 0xffff;\n      }\n      m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);\n      b = (m[15]>>16) & 1;\n      m[14] &= 0xffff;\n      sel25519(t, m, 1-b);\n    }\n    for (i = 0; i < 16; i++) {\n      o[2*i] = t[i] & 0xff;\n      o[2*i+1] = t[i] >> 8;\n    }\n  }\n\n  function par25519(a) {\n    var d = new Uint8Array(32);\n    pack25519(d, a);\n    return d[0] & 1;\n  }\n\n  function vn(x, xi, y, yi, n) {\n    var i, d = 0;\n    for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];\n    return (1 & ((d - 1) >>> 8)) - 1;\n  }\n\n  function crypto_verify_32(x, xi, y, yi) {\n    return vn(x, xi, y, yi, 32);\n  }\n\n  function neq25519(a, b) {\n    var c = new Uint8Array(32), d = new Uint8Array(32);\n    pack25519(c, a);\n    pack25519(d, b);\n    return crypto_verify_32(c, 0, d, 0);\n  }\n\n  function pow2523(o, i) {\n    var c = gf();\n    var a;\n    for (a = 0; a < 16; a++) c[a] = i[a];\n    for (a = 250; a >= 0; a--) {\n      S(c, c);\n      if (a !== 1) M(c, c, i);\n    }\n    for (a = 0; a < 16; a++) o[a] = c[a];\n  }\n\n  function set25519(r, a) {\n    var i;\n    for (i = 0; i < 16; i++) r[i] = a[i] | 0;\n  }\n\n  function unpackneg(r, p) {\n    var t = gf(), chk = gf(), num = gf(),\n      den = gf(), den2 = gf(), den4 = gf(),\n      den6 = gf();\n\n    set25519(r[2], gf1);\n    unpack25519(r[1], p);\n    S(num, r[1]);\n    M(den, num, D);\n    Z(num, num, r[2]);\n    A(den, r[2], den);\n\n    S(den2, den);\n    S(den4, den2);\n    M(den6, den4, den2);\n    M(t, den6, num);\n    M(t, t, den);\n\n    pow2523(t, t);\n    M(t, t, num);\n    M(t, t, den);\n    M(t, t, den);\n    M(r[0], t, den);\n\n    S(chk, r[0]);\n    M(chk, chk, den);\n    if (neq25519(chk, num)) M(r[0], r[0], I);\n\n    S(chk, r[0]);\n    M(chk, chk, den);\n    if (neq25519(chk, num)) return -1;\n\n    if (par25519(r[0]) === (p[31] >> 7)) Z(r[0], gf0, r[0]);\n\n    M(r[3], r[0], r[1]);\n    return 0;\n  }\n\n  // ----\n\n  // Converts Ed25519 public key to Curve25519 public key.\n  // montgomeryX = (edwardsY + 1)*inverse(1 - edwardsY) mod p\n  function convertPublicKey(pk) {\n    var z = new Uint8Array(32),\n      q = [gf(), gf(), gf(), gf()],\n      a = gf(), b = gf();\n\n    if (unpackneg(q, pk)) return null; // reject invalid key\n\n    var y = q[1];\n\n    A(a, gf1, y);\n    Z(b, gf1, y);\n    inv25519(b, b);\n    M(a, a, b);\n\n    pack25519(z, a);\n    return z;\n  }\n\n  // Converts Ed25519 secret key to Curve25519 secret key.\n  function convertSecretKey(sk) {\n    var d = new Uint8Array(64), o = new Uint8Array(32), i;\n    nacl.lowlevel.crypto_hash(d, sk, 32);\n    d[0] &= 248;\n    d[31] &= 127;\n    d[31] |= 64;\n    for (i = 0; i < 32; i++) o[i] = d[i];\n    for (i = 0; i < 64; i++) d[i] = 0;\n    return o;\n  }\n\n  function convertKeyPair(edKeyPair) {\n    var publicKey = convertPublicKey(edKeyPair.publicKey);\n    if (!publicKey) return null;\n    return {\n      publicKey: publicKey,\n      secretKey: convertSecretKey(edKeyPair.secretKey)\n    };\n  }\n\n  return {\n    convertPublicKey: convertPublicKey,\n    convertSecretKey: convertSecretKey,\n    convertKeyPair: convertKeyPair,\n  };\n\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZWQyY3VydmUvZWQyY3VydmUuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUE2Qix1Q0FBdUMsbUJBQU8sQ0FBQyw4REFBVztBQUM3RjtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCLGdCQUFnQixRQUFRO0FBQ3hCLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1ib2lsZXJwbGF0ZS10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9lZDJjdXJ2ZS9lZDJjdXJ2ZS5qcz81NWRjIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBlZDJjdXJ2ZTogY29udmVydCBFZDI1NTE5IHNpZ25pbmcga2V5IHBhaXIgaW50byBDdXJ2ZTI1NTE5XG4gKiBrZXkgcGFpciBzdWl0YWJsZSBmb3IgRGlmZmllLUhlbGxtYW4ga2V5IGV4Y2hhbmdlLlxuICpcbiAqIFdyaXR0ZW4gYnkgRG1pdHJ5IENoZXN0bnlraCBpbiAyMDE0LiBQdWJsaWMgZG9tYWluLlxuICovXG4vKiBqc2hpbnQgbmV3Y2FwOiBmYWxzZSAqL1xuKGZ1bmN0aW9uKHJvb3QsIGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZihyZXF1aXJlKCd0d2VldG5hY2wnKSk7XG4gIGVsc2Ugcm9vdC5lZDJjdXJ2ZSA9IGYocm9vdC5uYWNsKTtcbn0odGhpcywgZnVuY3Rpb24obmFjbCkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICghbmFjbCkgdGhyb3cgbmV3IEVycm9yKCd0d2VldG5hY2wgbm90IGxvYWRlZCcpO1xuXG4gIC8vIC0tIE9wZXJhdGlvbnMgY29waWVkIGZyb20gVHdlZXROYUNsLmpzLiAtLVxuXG4gIHZhciBnZiA9IGZ1bmN0aW9uKGluaXQpIHtcbiAgICB2YXIgaSwgciA9IG5ldyBGbG9hdDY0QXJyYXkoMTYpO1xuICAgIGlmIChpbml0KSBmb3IgKGkgPSAwOyBpIDwgaW5pdC5sZW5ndGg7IGkrKykgcltpXSA9IGluaXRbaV07XG4gICAgcmV0dXJuIHI7XG4gIH07XG5cbiAgdmFyIGdmMCA9IGdmKCksXG4gICAgICBnZjEgPSBnZihbMV0pLFxuICAgICAgRCA9IGdmKFsweDc4YTMsIDB4MTM1OSwgMHg0ZGNhLCAweDc1ZWIsIDB4ZDhhYiwgMHg0MTQxLCAweDBhNGQsIDB4MDA3MCwgMHhlODk4LCAweDc3NzksIDB4NDA3OSwgMHg4Y2M3LCAweGZlNzMsIDB4MmI2ZiwgMHg2Y2VlLCAweDUyMDNdKSxcbiAgICAgIEkgPSBnZihbMHhhMGIwLCAweDRhMGUsIDB4MWIyNywgMHhjNGVlLCAweGU0NzgsIDB4YWQyZiwgMHgxODA2LCAweDJmNDMsIDB4ZDdhNywgMHgzZGZiLCAweDAwOTksIDB4MmI0ZCwgMHhkZjBiLCAweDRmYzEsIDB4MjQ4MCwgMHgyYjgzXSk7XG5cbiAgZnVuY3Rpb24gY2FyMjU1MTkobykge1xuICAgIHZhciBjO1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBvW2ldICs9IDY1NTM2O1xuICAgICAgYyA9IE1hdGguZmxvb3Iob1tpXSAvIDY1NTM2KTtcbiAgICAgIG9bKGkrMSkqKGk8MTU/MTowKV0gKz0gYyAtIDEgKyAzNyAqIChjLTEpICogKGk9PT0xNT8xOjApO1xuICAgICAgb1tpXSAtPSAoYyAqIDY1NTM2KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWwyNTUxOShwLCBxLCBiKSB7XG4gICAgdmFyIHQsIGMgPSB+KGItMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICB0ID0gYyAmIChwW2ldIF4gcVtpXSk7XG4gICAgICBwW2ldIF49IHQ7XG4gICAgICBxW2ldIF49IHQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5wYWNrMjU1MTkobywgbikge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSBvW2ldID0gblsyKmldICsgKG5bMippKzFdIDw8IDgpO1xuICAgIG9bMTVdICY9IDB4N2ZmZjtcbiAgfVxuXG4gIC8vIGFkZGl0aW9uXG4gIGZ1bmN0aW9uIEEobywgYSwgYikge1xuICAgIHZhciBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSBvW2ldID0gKGFbaV0gKyBiW2ldKXwwO1xuICB9XG5cbiAgLy8gc3VidHJhY3Rpb25cbiAgZnVuY3Rpb24gWihvLCBhLCBiKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIG9baV0gPSAoYVtpXSAtIGJbaV0pfDA7XG4gIH1cblxuICAvLyBtdWx0aXBsaWNhdGlvblxuICBmdW5jdGlvbiBNKG8sIGEsIGIpIHtcbiAgICB2YXIgaSwgaiwgdCA9IG5ldyBGbG9hdDY0QXJyYXkoMzEpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAzMTsgaSsrKSB0W2ldID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgZm9yIChqID0gMDsgaiA8IDE2OyBqKyspIHtcbiAgICAgICAgdFtpK2pdICs9IGFbaV0gKiBiW2pdO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgdFtpXSArPSAzOCAqIHRbaSsxNl07XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSBvW2ldID0gdFtpXTtcbiAgICBjYXIyNTUxOShvKTtcbiAgICBjYXIyNTUxOShvKTtcbiAgfVxuXG4gIC8vIHNxdWFyaW5nXG4gIGZ1bmN0aW9uIFMobywgYSkge1xuICAgIE0obywgYSwgYSk7XG4gIH1cblxuICAvLyBpbnZlcnNpb25cbiAgZnVuY3Rpb24gaW52MjU1MTkobywgaSkge1xuICAgIHZhciBjID0gZ2YoKTtcbiAgICB2YXIgYTtcbiAgICBmb3IgKGEgPSAwOyBhIDwgMTY7IGErKykgY1thXSA9IGlbYV07XG4gICAgZm9yIChhID0gMjUzOyBhID49IDA7IGEtLSkge1xuICAgICAgUyhjLCBjKTtcbiAgICAgIGlmKGEgIT09IDIgJiYgYSAhPT0gNCkgTShjLCBjLCBpKTtcbiAgICB9XG4gICAgZm9yIChhID0gMDsgYSA8IDE2OyBhKyspIG9bYV0gPSBjW2FdO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFjazI1NTE5KG8sIG4pIHtcbiAgICB2YXIgaSwgaiwgYjtcbiAgICB2YXIgbSA9IGdmKCksIHQgPSBnZigpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSB0W2ldID0gbltpXTtcbiAgICBjYXIyNTUxOSh0KTtcbiAgICBjYXIyNTUxOSh0KTtcbiAgICBjYXIyNTUxOSh0KTtcbiAgICBmb3IgKGogPSAwOyBqIDwgMjsgaisrKSB7XG4gICAgICBtWzBdID0gdFswXSAtIDB4ZmZlZDtcbiAgICAgIGZvciAoaSA9IDE7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIG1baV0gPSB0W2ldIC0gMHhmZmZmIC0gKChtW2ktMV0+PjE2KSAmIDEpO1xuICAgICAgICBtW2ktMV0gJj0gMHhmZmZmO1xuICAgICAgfVxuICAgICAgbVsxNV0gPSB0WzE1XSAtIDB4N2ZmZiAtICgobVsxNF0+PjE2KSAmIDEpO1xuICAgICAgYiA9IChtWzE1XT4+MTYpICYgMTtcbiAgICAgIG1bMTRdICY9IDB4ZmZmZjtcbiAgICAgIHNlbDI1NTE5KHQsIG0sIDEtYik7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBvWzIqaV0gPSB0W2ldICYgMHhmZjtcbiAgICAgIG9bMippKzFdID0gdFtpXSA+PiA4O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcjI1NTE5KGEpIHtcbiAgICB2YXIgZCA9IG5ldyBVaW50OEFycmF5KDMyKTtcbiAgICBwYWNrMjU1MTkoZCwgYSk7XG4gICAgcmV0dXJuIGRbMF0gJiAxO1xuICB9XG5cbiAgZnVuY3Rpb24gdm4oeCwgeGksIHksIHlpLCBuKSB7XG4gICAgdmFyIGksIGQgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIGQgfD0geFt4aSArIGldIF4geVt5aSArIGldO1xuICAgIHJldHVybiAoMSAmICgoZCAtIDEpID4+PiA4KSkgLSAxO1xuICB9XG5cbiAgZnVuY3Rpb24gY3J5cHRvX3ZlcmlmeV8zMih4LCB4aSwgeSwgeWkpIHtcbiAgICByZXR1cm4gdm4oeCwgeGksIHksIHlpLCAzMik7XG4gIH1cblxuICBmdW5jdGlvbiBuZXEyNTUxOShhLCBiKSB7XG4gICAgdmFyIGMgPSBuZXcgVWludDhBcnJheSgzMiksIGQgPSBuZXcgVWludDhBcnJheSgzMik7XG4gICAgcGFjazI1NTE5KGMsIGEpO1xuICAgIHBhY2syNTUxOShkLCBiKTtcbiAgICByZXR1cm4gY3J5cHRvX3ZlcmlmeV8zMihjLCAwLCBkLCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvdzI1MjMobywgaSkge1xuICAgIHZhciBjID0gZ2YoKTtcbiAgICB2YXIgYTtcbiAgICBmb3IgKGEgPSAwOyBhIDwgMTY7IGErKykgY1thXSA9IGlbYV07XG4gICAgZm9yIChhID0gMjUwOyBhID49IDA7IGEtLSkge1xuICAgICAgUyhjLCBjKTtcbiAgICAgIGlmIChhICE9PSAxKSBNKGMsIGMsIGkpO1xuICAgIH1cbiAgICBmb3IgKGEgPSAwOyBhIDwgMTY7IGErKykgb1thXSA9IGNbYV07XG4gIH1cblxuICBmdW5jdGlvbiBzZXQyNTUxOShyLCBhKSB7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHJbaV0gPSBhW2ldIHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVucGFja25lZyhyLCBwKSB7XG4gICAgdmFyIHQgPSBnZigpLCBjaGsgPSBnZigpLCBudW0gPSBnZigpLFxuICAgICAgZGVuID0gZ2YoKSwgZGVuMiA9IGdmKCksIGRlbjQgPSBnZigpLFxuICAgICAgZGVuNiA9IGdmKCk7XG5cbiAgICBzZXQyNTUxOShyWzJdLCBnZjEpO1xuICAgIHVucGFjazI1NTE5KHJbMV0sIHApO1xuICAgIFMobnVtLCByWzFdKTtcbiAgICBNKGRlbiwgbnVtLCBEKTtcbiAgICBaKG51bSwgbnVtLCByWzJdKTtcbiAgICBBKGRlbiwgclsyXSwgZGVuKTtcblxuICAgIFMoZGVuMiwgZGVuKTtcbiAgICBTKGRlbjQsIGRlbjIpO1xuICAgIE0oZGVuNiwgZGVuNCwgZGVuMik7XG4gICAgTSh0LCBkZW42LCBudW0pO1xuICAgIE0odCwgdCwgZGVuKTtcblxuICAgIHBvdzI1MjModCwgdCk7XG4gICAgTSh0LCB0LCBudW0pO1xuICAgIE0odCwgdCwgZGVuKTtcbiAgICBNKHQsIHQsIGRlbik7XG4gICAgTShyWzBdLCB0LCBkZW4pO1xuXG4gICAgUyhjaGssIHJbMF0pO1xuICAgIE0oY2hrLCBjaGssIGRlbik7XG4gICAgaWYgKG5lcTI1NTE5KGNoaywgbnVtKSkgTShyWzBdLCByWzBdLCBJKTtcblxuICAgIFMoY2hrLCByWzBdKTtcbiAgICBNKGNoaywgY2hrLCBkZW4pO1xuICAgIGlmIChuZXEyNTUxOShjaGssIG51bSkpIHJldHVybiAtMTtcblxuICAgIGlmIChwYXIyNTUxOShyWzBdKSA9PT0gKHBbMzFdID4+IDcpKSBaKHJbMF0sIGdmMCwgclswXSk7XG5cbiAgICBNKHJbM10sIHJbMF0sIHJbMV0pO1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgLy8gLS0tLVxuXG4gIC8vIENvbnZlcnRzIEVkMjU1MTkgcHVibGljIGtleSB0byBDdXJ2ZTI1NTE5IHB1YmxpYyBrZXkuXG4gIC8vIG1vbnRnb21lcnlYID0gKGVkd2FyZHNZICsgMSkqaW52ZXJzZSgxIC0gZWR3YXJkc1kpIG1vZCBwXG4gIGZ1bmN0aW9uIGNvbnZlcnRQdWJsaWNLZXkocGspIHtcbiAgICB2YXIgeiA9IG5ldyBVaW50OEFycmF5KDMyKSxcbiAgICAgIHEgPSBbZ2YoKSwgZ2YoKSwgZ2YoKSwgZ2YoKV0sXG4gICAgICBhID0gZ2YoKSwgYiA9IGdmKCk7XG5cbiAgICBpZiAodW5wYWNrbmVnKHEsIHBrKSkgcmV0dXJuIG51bGw7IC8vIHJlamVjdCBpbnZhbGlkIGtleVxuXG4gICAgdmFyIHkgPSBxWzFdO1xuXG4gICAgQShhLCBnZjEsIHkpO1xuICAgIFooYiwgZ2YxLCB5KTtcbiAgICBpbnYyNTUxOShiLCBiKTtcbiAgICBNKGEsIGEsIGIpO1xuXG4gICAgcGFjazI1NTE5KHosIGEpO1xuICAgIHJldHVybiB6O1xuICB9XG5cbiAgLy8gQ29udmVydHMgRWQyNTUxOSBzZWNyZXQga2V5IHRvIEN1cnZlMjU1MTkgc2VjcmV0IGtleS5cbiAgZnVuY3Rpb24gY29udmVydFNlY3JldEtleShzaykge1xuICAgIHZhciBkID0gbmV3IFVpbnQ4QXJyYXkoNjQpLCBvID0gbmV3IFVpbnQ4QXJyYXkoMzIpLCBpO1xuICAgIG5hY2wubG93bGV2ZWwuY3J5cHRvX2hhc2goZCwgc2ssIDMyKTtcbiAgICBkWzBdICY9IDI0ODtcbiAgICBkWzMxXSAmPSAxMjc7XG4gICAgZFszMV0gfD0gNjQ7XG4gICAgZm9yIChpID0gMDsgaSA8IDMyOyBpKyspIG9baV0gPSBkW2ldO1xuICAgIGZvciAoaSA9IDA7IGkgPCA2NDsgaSsrKSBkW2ldID0gMDtcbiAgICByZXR1cm4gbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRLZXlQYWlyKGVkS2V5UGFpcikge1xuICAgIHZhciBwdWJsaWNLZXkgPSBjb252ZXJ0UHVibGljS2V5KGVkS2V5UGFpci5wdWJsaWNLZXkpO1xuICAgIGlmICghcHVibGljS2V5KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgcHVibGljS2V5OiBwdWJsaWNLZXksXG4gICAgICBzZWNyZXRLZXk6IGNvbnZlcnRTZWNyZXRLZXkoZWRLZXlQYWlyLnNlY3JldEtleSlcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjb252ZXJ0UHVibGljS2V5OiBjb252ZXJ0UHVibGljS2V5LFxuICAgIGNvbnZlcnRTZWNyZXRLZXk6IGNvbnZlcnRTZWNyZXRLZXksXG4gICAgY29udmVydEtleVBhaXI6IGNvbnZlcnRLZXlQYWlyLFxuICB9O1xuXG59KSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ed2curve/ed2curve.js\n");

/***/ })

};
;