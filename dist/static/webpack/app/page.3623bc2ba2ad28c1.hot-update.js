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

/***/ "(app-pages-browser)/./src/view-functions/getUserStruct.ts":
/*!*********************************************!*\
  !*** ./src/view-functions/getUserStruct.ts ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _aptos_labs_ts_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aptos-labs/ts-sdk */ \"(app-pages-browser)/./node_modules/@aptos-labs/ts-sdk/dist/esm/index.mjs\");\n\nconst aptos = new _aptos_labs_ts_sdk__WEBPACK_IMPORTED_MODULE_0__.Aptos();\nconst getUserStruct = async (address)=>{\n    console.log(\"Inside getUserStruct\");\n    const user = aptos.view({\n        payload: {\n            function: \"0x2394ae8e69bd837ac1d946992646e303f5f6507e5cac3f65ee30528668a3d12d::DonaPayCore::createUser\",\n            typeArguments: [],\n            functionArguments: [\n                address\n            ]\n        }\n    });\n    return user;\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy92aWV3LWZ1bmN0aW9ucy9nZXRVc2VyU3RydWN0LnRzIiwibWFwcGluZ3MiOiI7O0FBQTJDO0FBRTNDLE1BQU1DLFFBQVEsSUFBSUQscURBQUtBO0FBRXZCLE1BQU1FLGdCQUFnQixPQUFPQztJQUMzQkMsUUFBUUMsR0FBRyxDQUFDO0lBQ1osTUFBTUMsT0FBT0wsTUFBTU0sSUFBSSxDQUFXO1FBQ2hDQyxTQUFTO1lBQ1BDLFVBQVU7WUFDVkMsZUFBZSxFQUFFO1lBQ2pCQyxtQkFBbUI7Z0JBQUNSO2FBQVE7UUFDOUI7SUFDRjtJQUVBLE9BQU9HO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3ZpZXctZnVuY3Rpb25zL2dldFVzZXJTdHJ1Y3QudHM/MmIxNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHRvcyB9IGZyb20gXCJAYXB0b3MtbGFicy90cy1zZGtcIjtcclxuXHJcbmNvbnN0IGFwdG9zID0gbmV3IEFwdG9zKCk7XHJcblxyXG5jb25zdCBnZXRVc2VyU3RydWN0ID0gYXN5bmMgKGFkZHJlc3M6IHN0cmluZykgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiSW5zaWRlIGdldFVzZXJTdHJ1Y3RcIik7XHJcbiAgY29uc3QgdXNlciA9IGFwdG9zLnZpZXc8W3N0cmluZ10+KHtcclxuICAgIHBheWxvYWQ6IHtcclxuICAgICAgZnVuY3Rpb246IFwiMHgyMzk0YWU4ZTY5YmQ4MzdhYzFkOTQ2OTkyNjQ2ZTMwM2Y1ZjY1MDdlNWNhYzNmNjVlZTMwNTI4NjY4YTNkMTJkOjpEb25hUGF5Q29yZTo6Y3JlYXRlVXNlclwiLFxyXG4gICAgICB0eXBlQXJndW1lbnRzOiBbXSxcclxuICAgICAgZnVuY3Rpb25Bcmd1bWVudHM6IFthZGRyZXNzXSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB1c2VyO1xyXG59O1xyXG4iXSwibmFtZXMiOlsiQXB0b3MiLCJhcHRvcyIsImdldFVzZXJTdHJ1Y3QiLCJhZGRyZXNzIiwiY29uc29sZSIsImxvZyIsInVzZXIiLCJ2aWV3IiwicGF5bG9hZCIsImZ1bmN0aW9uIiwidHlwZUFyZ3VtZW50cyIsImZ1bmN0aW9uQXJndW1lbnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/view-functions/getUserStruct.ts\n"));

/***/ })

});