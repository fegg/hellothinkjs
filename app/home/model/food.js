'use strict';
/**
 * model
 */var _inherits = require('babel-runtime/helpers/inherits')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];exports.__esModule = true;var _default = (function (_think$model$base) {_inherits(_default, _think$model$base);function _default() {_classCallCheck(this, _default);_think$model$base.apply(this, arguments);}_default.prototype.

    getFoodList = function getFoodList(currentPage) {
        return this.getFoodListByPage(currentPage, 10);};_default.prototype.

    getFoodListByPage = function getFoodListByPage(currentPage, everyPage) {
        return this.page(currentPage, everyPage).select();};return _default;})(think.model.base);exports['default'] = _default;module.exports = exports['default'];