'use strict';var _inherits = require('babel-runtime/helpers/inherits')['default'];var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];exports.__esModule = true;var _baseJs = require(

'./base.js');var _baseJs2 = _interopRequireDefault(_baseJs);var _default = (function (_Base) {_inherits(_default, _Base);function _default() {_classCallCheck(this, _default);_Base.apply(this, arguments);}


  /**
   * index action
   * @return {Promise} []
   */_default.prototype.
  indexAction = function indexAction() {var 


    foodModel, 
    foodList;return _regeneratorRuntime.async(function indexAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:foodModel = this.model('food');context$2$0.next = 3;return _regeneratorRuntime.awrap(foodModel.getFoodList(1));case 3:foodList = context$2$0.sent;

          this.assign({ 
            foodList: foodList });return context$2$0.abrupt('return', 


          this.display('good'));case 6:case 'end':return context$2$0.stop();}}, null, this);};_default.prototype.

  moreAction = function moreAction() {var 
    param, 
    currentPage, 

    foodModel, 
    foodList;return _regeneratorRuntime.async(function moreAction$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:param = this.post();currentPage = param.page || 1;foodModel = this.model('food');context$2$0.next = 5;return _regeneratorRuntime.awrap(foodModel.getFoodList(currentPage));case 5:foodList = context$2$0.sent;

          console.log(foodList);return context$2$0.abrupt('return', 

          this.success(foodList));case 8:case 'end':return context$2$0.stop();}}, null, this);};return _default;})(_baseJs2['default']);exports['default'] = _default;module.exports = exports['default']; //auto render template file index_index.html