"use strict";
exports.__esModule = true;
var function_1 = require("fp-ts/function");
var foo = {
    bar: 'hello'
};
function_1.pipe(foo, function (_a) {
    var bar = _a.bar;
    return bar;
}); //?
