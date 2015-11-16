'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var toString = Object.prototype.toString;
var isArray = Array.isArray;
var isBuffer = Buffer.isBuffer;
var numberReg = /^((\-?\d*\.?\d*(?:e[+-]?\d*(?:\d?\.?|\.?\d?)\d*)?)|(0[0-7]+)|(0x[0-9a-f]+))$/i;

if (!global.Promise) {
  global.Promise = require('es6-promise').Promise;
}

//Promise defer
if (!Promise.defer) {
  Promise.defer = function () {
    var deferred = {};
    deferred.promise = new Promise(function (resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    return deferred;
  };
}

/**
 * check object is function
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

/**
 * create Class in javascript
 * @param {Function} superCtor [super constructor]
 * @param {Object} props     []
 */
function Class(superCtor, props) {
  var cls = function cls() {
    if (!(this instanceof cls)) {
      throw new Error('Class constructors cannot be invoked without \'new\'');
    }
    //extend prototype data to instance
    //avoid instance change data to pullte prototype
    cls.extend(cls.__props__, this);
    if (isFunction(this.init)) {
      this.__initReturn = this.init.apply(this, arguments);
    }
  };
  cls.__props__ = {};
  cls.extend = function (props, target) {
    target = target || cls.prototype;
    var name = undefined,
        value = undefined;
    for (name in props) {
      value = props[name];
      if (isArray(value)) {
        cls.__props__[name] = target[name] = extend([], value);
      } else if (isObject(value)) {
        cls.__props__[name] = target[name] = extend({}, value);
      } else {
        target[name] = value;
      }
    }
    return cls;
  };
  cls.inherits = function (superCtor) {
    cls.super_ = superCtor;
    //if superCtor.prototype is not enumerable
    if (Object.keys(superCtor.prototype).length === 0) {
      cls.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: cls,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    } else {
      extend(cls.prototype, superCtor.prototype);
    }
    return cls;
  };
  if (!isFunction(superCtor)) {
    props = superCtor;
  } else if (isFunction(superCtor)) {
    cls.inherits(superCtor);
  }
  if (props) {
    cls.extend(props);
  }
  /**
   * invoke super class method
   * @param  {String} name []
   * @param  {Mixed} data []
   * @return {Mixed}      []
   */
  cls.prototype['super'] = function (name, data) {
    if (!this[name]) {
      this.super_c = null;
      return;
    }
    var super_ = this.super_c ? this.super_c.super_ : this.constructor.super_;
    if (!super_ || !isFunction(super_.prototype[name])) {
      this.super_c = null;
      return;
    }
    while (this[name] === super_.prototype[name] && super_.super_) {
      super_ = super_.super_;
    }
    this.super_c = super_;
    if (!this.super_t) {
      this.super_t = 1;
    }
    if (!isArray(data) && !isArguments(data)) {
      data = arguments.length === 1 ? [] : [data];
    }
    var t = ++this.super_t,
        ret = undefined,
        method = super_.prototype[name];
    ret = method.apply(this, data);
    if (t === this.super_t) {
      this.super_c = null;
      this.super_t = 0;
    }
    return ret;
  };
  return cls;
}
/**
 * extend object
 * @return {Object} []
 */
var extend = function extend(target) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  target = target || {};
  var i = 0,
      length = args.length,
      options = undefined,
      name = undefined,
      src = undefined,
      copy = undefined;
  for (; i < length; i++) {
    options = args[i];
    if (!options) {
      continue;
    }
    for (name in options) {
      src = target[name];
      copy = options[name];
      if (src && src === copy) {
        continue;
      }
      if (isObject(copy)) {
        target[name] = extend(src && isObject(src) ? src : {}, copy);
      } else if (isArray(copy)) {
        target[name] = extend([], copy);
      } else {
        target[name] = copy;
      }
    }
  }
  return target;
};
/**
 * check object is class
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isClass = function isClass(obj) {
  return isFunction(obj) && isFunction(obj.inherits) && isFunction(obj.extend);
};
/**
 * check object is boolean
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isBoolean = function isBoolean(obj) {
  return toString.call(obj) === '[object Boolean]';
};
/**
 * check object is number
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isNumber = function isNumber(obj) {
  return toString.call(obj) === '[object Number]';
};
/**
 * is arguments
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
var isArguments = function isArguments(obj) {
  return toString.call(obj) === '[object Arguments]';
};
/**
 * check object is object
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isObject = function isObject(obj) {
  if (isBuffer(obj)) {
    return false;
  }
  return toString.call(obj) === '[object Object]';
};
/**
 * check object is string
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isString = function isString(obj) {
  return toString.call(obj) === '[object String]';
};
/**
 * clone data
 * @param  {Mixed} data []
 * @return {Mixed}      []
 */
var clone = function clone(data) {
  if (isObject(data)) {
    return extend({}, data);
  } else if (isArray(data)) {
    return extend([], data);
  }
  return data;
};
/**
 * check path is file
 * @param  {String}  p [filepath]
 * @return {Boolean}   []
 */
var isFile = function isFile(p) {
  if (!_fs2['default'].existsSync(p)) {
    return false;
  }
  return _fs2['default'].statSync(p).isFile();
};
/**
 * check path is directory
 * @param  {String}  p []
 * @return {Boolean}   []
 */
var isDir = function isDir(p) {
  if (!_fs2['default'].existsSync(p)) {
    return false;
  }
  return _fs2['default'].statSync(p).isDirectory();
};
/**
 * check object is number string
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isNumberString = function isNumberString(obj) {
  return numberReg.test(obj);
};
/**
 * check object is promise
 * @param  {Mixed}  obj []
 * @return {Boolean}     []
 */
var isPromise = function isPromise(obj) {
  return !!(obj && typeof obj.then === 'function' && typeof obj['catch'] === 'function');
};
/**
 * check path is writable
 * @param  {Mixed}  p []
 * @return {Boolean}   []
 */
var isWritable = function isWritable(p) {
  if (!_fs2['default'].existsSync(p)) {
    return false;
  }
  var stats = _fs2['default'].statSync(p);
  var mode = stats.mode;
  var uid = process.getuid ? process.getuid() : 0;
  var gid = process.getgid ? process.getgid() : 0;
  var owner = uid === stats.uid;
  var group = gid === stats.gid;
  return !!(owner && mode & parseInt('00200', 8) || group && mode & parseInt('00020', 8) || mode & parseInt('00002', 8));
};
/**
 * check object is mepty
 * @param  {[Mixed]}  obj []
 * @return {Boolean}     []
 */
var isEmpty = function isEmpty(obj) {
  if (isObject(obj)) {
    for (var key in obj) {
      return !key && !0;
    }
    return true;
  } else if (isArray(obj)) {
    return obj.length === 0;
  } else if (isString(obj)) {
    return obj.length === 0;
  } else if (isNumber(obj)) {
    return obj === 0;
  } else if (obj === null || obj === undefined) {
    return true;
  } else if (isBoolean(obj)) {
    return !obj;
  }
  return false;
};

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 */
var isGenerator = function isGenerator(obj) {
  return obj && 'function' === typeof obj.next && 'function' === typeof obj['throw'];
};

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 */
var isGeneratorFunction = function isGeneratorFunction(obj) {
  if (!obj) {
    return false;
  }
  var constructor = obj.constructor;
  if (!constructor) {
    return false;
  }
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) {
    return true;
  }
  return isGenerator(constructor.prototype);
};

/**
 * make dir recursive
 * @param  {String} p    [path]
 * @param  {mode} mode [path mode]
 * @return {}      []
 */
var mkdir = function mkdir(p, mode) {
  mode = mode || '0777';
  if (_fs2['default'].existsSync(p)) {
    chmod(p, mode);
    return true;
  }
  var pp = _path2['default'].dirname(p);
  if (_fs2['default'].existsSync(pp)) {
    _fs2['default'].mkdirSync(p, mode);
  } else {
    mkdir(pp, mode);
    mkdir(p, mode);
  }
  return true;
};
/**
 * remove dir aync
 * @param  {String} p       [path]
 * @param  {Bollean} reserve []
 * @return {Promise}         []
 */
var rmdir = function rmdir(p, reserve) {
  if (!isDir(p)) {
    return Promise.resolve();
  }
  var deferred = Promise.defer();
  _fs2['default'].readdir(p, function (err, files) {
    if (err) {
      return deferred.reject(err);
    }
    var promises = files.map(function (item) {
      var filepath = _path2['default'].normalize(p + '/' + item);
      if (isDir(filepath)) {
        return rmdir(filepath, false);
      } else {
        var _ret = (function () {
          var deferred = Promise.defer();
          _fs2['default'].unlink(filepath, function (err) {
            return err ? deferred.reject(err) : deferred.resolve();
          });
          return {
            v: deferred.promise
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
    });
    var promise = files.length === 0 ? Promise.resolve() : Promise.all(promises);
    return promise.then(function () {
      if (!reserve) {
        var _ret2 = (function () {
          var deferred = Promise.defer();
          _fs2['default'].rmdir(p, function (err) {
            return err ? deferred.reject(err) : deferred.resolve();
          });
          return {
            v: deferred.promise
          };
        })();

        if (typeof _ret2 === 'object') return _ret2.v;
      }
    }).then(function () {
      deferred.resolve();
    })['catch'](function (err) {
      deferred.reject(err);
    });
  });
  return deferred.promise;
};
/**
 * get files in path
 * @param  {} dir    []
 * @param  {} prefix []
 * @return {}        []
 */
var getFiles = function getFiles(dir, prefix) {
  dir = _path2['default'].normalize(dir);
  if (!_fs2['default'].existsSync(dir)) {
    return [];
  }
  prefix = prefix || '';
  var files = _fs2['default'].readdirSync(dir);
  var result = [];
  files.forEach(function (item) {
    var stat = _fs2['default'].statSync(dir + '/' + item);
    if (stat.isFile()) {
      result.push(prefix + item);
    } else if (stat.isDirectory()) {
      result = result.concat(getFiles(_path2['default'].normalize(dir + '/' + item), _path2['default'].normalize(prefix + item + '/')));
    }
  });
  return result;
};
/**
 * change path mode
 * @param  {String} p    [path]
 * @param  {String} mode [path mode]
 * @return {Boolean}      []
 */
var chmod = function chmod(p, mode) {
  mode = mode || '0777';
  if (!_fs2['default'].existsSync(p)) {
    return true;
  }
  return _fs2['default'].chmodSync(p, mode);
};
/**
 * get content md5
 * @param  {String} str [content]
 * @return {String}     [content md5]
 */
var md5 = function md5(str) {
  var instance = _crypto2['default'].createHash('md5');
  instance.update(str + '');
  return instance.digest('hex');
};
/**
 * get object by key & value
 * @param  {String} key   []
 * @param  {Mixed} value []
 * @return {Object}       []
 */
var getObject = function getObject(key, value) {
  var obj = {};
  if (!isArray(key)) {
    obj[key] = value;
    return obj;
  }
  key.forEach(function (item, i) {
    obj[item] = value[i];
  });
  return obj;
};
/**
 * transform array to object
 * @param  {Arrat} arr      []
 * @param  {String} key      []
 * @param  {String} valueKey []
 * @return {Mixed}          []
 */
var arrToObj = function arrToObj(arr, key, valueKey) {
  var result = {},
      arrResult = [];
  var i = 0,
      length = arr.length,
      item = undefined,
      keyValue = undefined;
  for (; i < length; i++) {
    item = arr[i];
    keyValue = item[key];
    if (valueKey === null) {
      arrResult.push(keyValue);
    } else if (valueKey) {
      result[keyValue] = item[valueKey];
    } else {
      result[keyValue] = item;
    }
  }
  return valueKey === null ? arrResult : result;
};
/**
 * get object values
 * @param  {Object} obj []
 * @return {Array}     []
 */
var objValues = function objValues(obj) {
  var values = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
};

exports['default'] = {
  Class: Class,
  extend: extend,
  isClass: isClass,
  isBoolean: isBoolean,
  isNumber: isNumber,
  isObject: isObject,
  isString: isString,
  isArray: isArray,
  isFunction: isFunction,
  isDate: _util2['default'].isDate,
  isRegExp: _util2['default'].isRegExp,
  isError: _util2['default'].isError,
  isIP: _net2['default'].isIP,
  isIP4: _net2['default'].isIP4,
  isIP6: _net2['default'].isIP6,
  isFile: isFile,
  isDir: isDir,
  isNumberString: isNumberString,
  isPromise: isPromise,
  isWritable: isWritable,
  isBuffer: isBuffer,
  isEmpty: isEmpty,
  isGenerator: isGenerator,
  isGeneratorFunction: isGeneratorFunction,
  clone: clone,
  mkdir: mkdir,
  rmdir: rmdir,
  md5: md5,
  chmod: chmod,
  getObject: getObject,
  arrToObj: arrToObj,
  getFiles: getFiles,
  objValues: objValues
};
module.exports = exports['default'];