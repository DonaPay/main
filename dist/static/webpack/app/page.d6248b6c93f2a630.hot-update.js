"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MODULE_ADDRESS: function() { return /* binding */ MODULE_ADDRESS; },\n/* harmony export */   NETWORK: function() { return /* binding */ NETWORK; }\n/* harmony export */ });\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-pages-browser)/./node_modules/next/dist/build/polyfills/process.js\");\nvar _process_env_NEXT_PUBLIC_APP_NETWORK;\nconst NETWORK = (_process_env_NEXT_PUBLIC_APP_NETWORK = process.env.NEXT_PUBLIC_APP_NETWORK) !== null && _process_env_NEXT_PUBLIC_APP_NETWORK !== void 0 ? _process_env_NEXT_PUBLIC_APP_NETWORK : \"testnet\";\nconst MODULE_ADDRESS = process.env.NEXT_PUBLIC_MODULE_ADDRESS;\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb25zdGFudHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBRWlDQTtBQUExQixNQUFNQyxVQUFtQixDQUFDRCx1Q0FBQUEsT0FBT0EsQ0FBQ0UsR0FBRyxDQUFDQyx1QkFBdUIsY0FBbkNILGtEQUFBQSx1Q0FBbUQsVUFBVTtBQUN2RixNQUFNSSxpQkFBaUJKLE9BQU9BLENBQUNFLEdBQUcsQ0FBQ0csMEJBQTBCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbnN0YW50cy50cz8zN2ZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV0d29yayB9IGZyb20gXCJAYXB0b3MtbGFicy93YWxsZXQtYWRhcHRlci1yZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5FVFdPUks6IE5ldHdvcmsgPSAocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBQX05FVFdPUksgYXMgTmV0d29yaykgPz8gXCJ0ZXN0bmV0XCI7XHJcbmV4cG9ydCBjb25zdCBNT0RVTEVfQUREUkVTUyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX01PRFVMRV9BRERSRVNTO1xyXG4iXSwibmFtZXMiOlsicHJvY2VzcyIsIk5FVFdPUksiLCJlbnYiLCJORVhUX1BVQkxJQ19BUFBfTkVUV09SSyIsIk1PRFVMRV9BRERSRVNTIiwiTkVYVF9QVUJMSUNfTU9EVUxFX0FERFJFU1MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/constants.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/utils/aptosClient.ts":
/*!**********************************!*\
  !*** ./src/utils/aptosClient.ts ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   aptosClient: function() { return /* binding */ aptosClient; }\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/constants */ \"(app-pages-browser)/./src/constants.ts\");\n/* harmony import */ var _aptos_labs_ts_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aptos-labs/ts-sdk */ \"(app-pages-browser)/./node_modules/@aptos-labs/ts-sdk/dist/esm/index.mjs\");\n\n\nconst aptos = new _aptos_labs_ts_sdk__WEBPACK_IMPORTED_MODULE_1__.Aptos(new _aptos_labs_ts_sdk__WEBPACK_IMPORTED_MODULE_1__.AptosConfig({\n    network: _constants__WEBPACK_IMPORTED_MODULE_0__.NETWORK\n}));\n// Reuse same Aptos instance to utilize cookie based sticky routing\nfunction aptosClient() {\n    return aptos;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9hcHRvc0NsaWVudC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBc0M7QUFDa0I7QUFFeEQsTUFBTUcsUUFBUSxJQUFJRixxREFBS0EsQ0FBQyxJQUFJQywyREFBV0EsQ0FBQztJQUFFRSxTQUFTSiwrQ0FBT0E7QUFBQztBQUUzRCxtRUFBbUU7QUFDNUQsU0FBU0s7SUFDZCxPQUFPRjtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9hcHRvc0NsaWVudC50cz85YTQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5FVFdPUksgfSBmcm9tIFwiQC9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgQXB0b3MsIEFwdG9zQ29uZmlnIH0gZnJvbSBcIkBhcHRvcy1sYWJzL3RzLXNka1wiO1xyXG5cclxuY29uc3QgYXB0b3MgPSBuZXcgQXB0b3MobmV3IEFwdG9zQ29uZmlnKHsgbmV0d29yazogTkVUV09SSyB9KSk7XHJcblxyXG4vLyBSZXVzZSBzYW1lIEFwdG9zIGluc3RhbmNlIHRvIHV0aWxpemUgY29va2llIGJhc2VkIHN0aWNreSByb3V0aW5nXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHRvc0NsaWVudCgpIHtcclxuICByZXR1cm4gYXB0b3M7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5FVFdPUksiLCJBcHRvcyIsIkFwdG9zQ29uZmlnIiwiYXB0b3MiLCJuZXR3b3JrIiwiYXB0b3NDbGllbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/aptosClient.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/view-functions/getUserStruct.ts":
/*!*********************************************!*\
  !*** ./src/view-functions/getUserStruct.ts ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getUserStruct: function() { return /* binding */ getUserStruct; }\n/* harmony export */ });\n/* harmony import */ var _utils_aptosClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/aptosClient */ \"(app-pages-browser)/./src/utils/aptosClient.ts\");\n\n// const aptos = new Aptos();\nconst getUserStruct = async (address)=>{\n    const user = await (0,_utils_aptosClient__WEBPACK_IMPORTED_MODULE_0__.aptosClient)().view({\n        payload: {\n            function: \"0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::getUser\",\n            typeArguments: [],\n            functionArguments: [\n                address\n            ]\n        }\n    });\n    console.log(user);\n    return user;\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy92aWV3LWZ1bmN0aW9ucy9nZXRVc2VyU3RydWN0LnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQ2tEO0FBQ2xELDZCQUE2QjtBQUV0QixNQUFNQyxnQkFBZ0IsT0FBT0M7SUFDbEMsTUFBTUMsT0FBTyxNQUFNSCwrREFBV0EsR0FBR0ksSUFBSSxDQUFXO1FBQzlDQyxTQUFTO1lBQ1BDLFVBQVU7WUFDVkMsZUFBZSxFQUFFO1lBQ2pCQyxtQkFBbUI7Z0JBQUNOO2FBQVE7UUFDOUI7SUFDRjtJQUNBTyxRQUFRQyxHQUFHLENBQUNQO0lBRVosT0FBT0E7QUFDVCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy92aWV3LWZ1bmN0aW9ucy9nZXRVc2VyU3RydWN0LnRzPzJiMTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXB0b3MsIEFwdG9zQ29uZmlnLCBOZXR3b3JrIH0gZnJvbSBcIkBhcHRvcy1sYWJzL3RzLXNka1wiO1xyXG5pbXBvcnQgeyBhcHRvc0NsaWVudCB9IGZyb20gXCJAL3V0aWxzL2FwdG9zQ2xpZW50XCI7XHJcbi8vIGNvbnN0IGFwdG9zID0gbmV3IEFwdG9zKCk7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VXNlclN0cnVjdCA9IGFzeW5jIChhZGRyZXNzOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCB1c2VyID0gYXdhaXQgYXB0b3NDbGllbnQoKS52aWV3PFtzdHJpbmddPih7XHJcbiAgICBwYXlsb2FkOiB7XHJcbiAgICAgIGZ1bmN0aW9uOiBcIjB4MjM5NGFlOGU2OWJkODM3YWMxZDk0Njk5MjY0NmUzMDNmNWY2NTA3ZTVjYWMzZjY1ZWUzMDUyODY2OGEzZDEyZDo6RG9uYVBheUNvcmU6OmdldFVzZXJcIixcclxuICAgICAgdHlwZUFyZ3VtZW50czogW10sXHJcbiAgICAgIGZ1bmN0aW9uQXJndW1lbnRzOiBbYWRkcmVzc10sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xyXG5cclxuICByZXR1cm4gdXNlcjtcclxufTtcclxuIl0sIm5hbWVzIjpbImFwdG9zQ2xpZW50IiwiZ2V0VXNlclN0cnVjdCIsImFkZHJlc3MiLCJ1c2VyIiwidmlldyIsInBheWxvYWQiLCJmdW5jdGlvbiIsInR5cGVBcmd1bWVudHMiLCJmdW5jdGlvbkFyZ3VtZW50cyIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/view-functions/getUserStruct.ts\n"));

/***/ })

});