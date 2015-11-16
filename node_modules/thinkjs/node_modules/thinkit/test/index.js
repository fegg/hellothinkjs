
var fs = require('fs');
var should = require('should');
var assert = require('assert');
var path = require('path');

var obj = require('../index.js');
for(var name in obj){
  global[name] = obj[name];
}


describe('Class', function(){
  var A = Class({
    init: function(){
      this.value = 'A';
      this.data = {
        name: 'CLASS A'
      }
      return 'init';
    },
    fn: function(){},
    fn2: function(){
      return this.value;
    },
    fn4: function(){
      return this.value;
    },
    test: function(name){
      return name;
    },
    test1: function(name, value){
      return [name, value];
    }
  });

  var B = Class(A, {
    init: function(){
      this.super('init');
      this.value2 = 'B';
      this.data = {
        name: 'CLASS B'
      }
    },
    fn2: function(){
      var p = this.super("fn2");
      return p + this.value2;
    },
    fn3: function(){
      this.super("fn3");
      return this.value;
    },
    fn4: function(){
      return this.value;
    },
    fn6: function(){
      return this.super('fn5')
    }
  });

  var C = Class(B, {
    init: function(){
      this.super('init');
      this.value = 'C';
      this.data = {
        name: 'CLASS C'
      }
    },
    fn2: function(){
      var p = this.super("fn2");
      return p + this.value + this.value2;
    },
    fn5: function(){
      return this.super("fn4");
    }
  })

  var D = Class(A, {});

  var a = new A();
  var b = new B();
  var c = new C();
  var d = new D();
  var F = Class();
  var f = new F();

  it('a.value = "A"', function(){
    assert.equal(a.value, 'A');
  })
  it('isFunction(a.fn) = true', function(){
    assert.equal(isFunction(a.fn), true)
  })
  it('b.value = "A"', function(){
    assert.equal(b.value, 'A')
  })
  it('b.value2 = "B"', function(){
    assert.equal(b.value2, 'B');
  })
  it('b.fn = a.fn', function(){
    assert.equal(a.fn, b.fn)
  })
  it('c.value = "C"', function(){
    assert.equal(c.value, 'C')
  })
  it('c.value2 = "B"', function(){
    assert.equal(c.value2, "B");
  })
  it('c.fn = a.fn', function(){
    assert.equal(a.fn, c.fn)
  })
  it('a.fn2() = "A"', function(){
    assert.equal(a.fn2(), 'A');
  })
  it('b.fn2() = "AB"', function(){
    assert.equal(b.fn2(), 'AB');
  })
  it('c.fn2() = "CBCB"', function(){
    assert.equal(c.fn2(), 'CBCB')
  })
  it('a.data', function(){
    assert.equal(JSON.stringify(a.data), '{"name":"CLASS A"}')
  })
  it('d.value = "A"', function(){
    assert.equal(d.value, 'A');
  })
  it('b.fn3() = "A"', function(){
    assert.equal(b.fn3(), 'A')
  })
  it('c.fn5() = "C"', function(){
    assert.equal(c.fn5(), 'C');
  })
  it('b.fn6() = undefined', function(){
    assert.equal(b.fn6(), undefined)
  })
  it('b.super("test")', function(){
    assert.equal(b.super('test', 'welefen'), 'welefen')
  })
  it('b.super("test1")', function(){
    assert.deepEqual(b.super('test1', ['welefen', 'suredy']), ['welefen', 'suredy'])
  })
  it('new A', function(){
    var a = new A();
    assert.deepEqual(a.__initReturn, 'init')
  })
  it('f __initReturn', function(){
    assert.equal(f.__initReturn, undefined);
  })



  var C1 = Class({
    init: function(){
      this.name = 'C1';
      return 'C1';
    },
    getName: function(){
      return this.name;
    },
    getName1: function(){
      return this.super('getName');
    }
  })
  var C2 = Class(C1, {
    init: function(){
      var c = this.super('init');
      this.name = 'C2';
      return c + 'C2';
    },
    getName: function(){
      return this.super('getName') + this.name;
    },
    getName3: function(){
      return this.super('getName', [1, 2, 3, 4])
    }
  });
  var C3 = Class(C2, {
    init: function(){
      var c = this.super('init');
      this.name = 'C3';
      return c + 'C3';
    },
    getName: function(){
      return this.super('getName') + this.name;
    }
  });
  var C4 = Class(C3, {
    init: function(){
      var c = this.super('init');
      this.name = 'C4';
      return c + 'C4';
    },
    getName: function(){
      return this.super('getName') + this.name;
    }
  });
  var C5 = Class(C4, {
    init: function(){
      var c = this.super('init');
      return c + 'C5';
    },
    getName: function(){
      return this.name;
    },
    getName1: function(){
      return 'getName1';
    },
    getName2: function(){
      return this.super('getName1');
    }
  });
  it('deep inherits 3', function(){
    var instance = new C3();
    assert.equal(instance.__initReturn, 'C1C2C3');
  })
  it('deep inherits 4', function(){
    var instance = new C4();
    assert.equal(instance.__initReturn, 'C1C2C3C4');
  })
  it('deep inherits 4 twice', function(){
    var instance = new C4();
    assert.equal(instance.__initReturn, 'C1C2C3C4');
    var instance = new C4();
    assert.equal(instance.__initReturn, 'C1C2C3C4');
  })
  it('deep inherits 5', function(){
    var instance = new C5();
    assert.equal(instance.__initReturn, 'C1C2C3C4C5');
  })
  it('c4.getName', function(){
    var instance = new C4();
    var name = instance.getName();
    assert.equal(name, 'C4C4C4C4');
  })
  it('c5.getName', function(){
    var instance = new C5();
    var name = instance.getName();
    assert.equal(name, 'C4');
  })
  it('c1.getName1', function(){
    var instance = new C1();
    var name = instance.getName1();
    assert.equal(name, undefined)
  })
  it('c2.getName3', function(){
    var instance = new C2();
    var name = instance.getName3();
    assert.equal(name, 'C2')
  })
  it('class prop is arr', function(){
    var F = Class({
      init: function(){
        this.arr = [];
      },
      // arr: [],
      add: function(num){
        this.arr.push(num);
      }
    })
    var F1 = Class(F, {})
    var F2 = Class(F, {})
    var f1 = new F1();
    var f2 = new F2();
    f1.add(1);
    f2.add(2);
    assert.deepEqual(f1.arr, [1]);
    assert.deepEqual(f2.arr, [2]);
  })


  var D1 = Class({
    init: function(){
      return Promise.resolve(1);
    }
  })
  var D2 = Class(D1, {
    init: function(){
      return this.super('init').then(function(data){
        return data + 10;
      })
    }
  })
  var D3 = Class(D2, {
    init: function(){
      return this.super('init').then(function(data){
        return data + 100;
      })
    }
  })
  var D4 = Class(D3, {
    init: function(){
      return this.super('init').then(function(data){
        return data + 1000;
      })
    }
  })
  it('promise init', function(){
    var instance = new D4();
    return Promise.resolve(instance.__initReturn).then(function(data){
      assert.equal(data, 1111)
    })
  })


  var E1 = Class({
    init: function(){
      this.data = {
        name: 'welefen',
        value: {
          type: 'welefen',
          val: 'suredy'
        }
      } 
    }
  })
  var E2 = Class(E1, {
    init: function(){
      this.data = {
        name: 'suredy'
      }
    }
  })



  it('data name value', function(){
    var i1 = new E2();
    var i2 = new E2();
    i2.data.name = 'i2';
    assert.equal(i1.data.name, 'suredy');
    assert.equal(i1.value, undefined);
  })


  var CLS1 = Class({
    getName: function(){
      return arguments.length;
    }
  })
  var CLS2 = Class(CLS1, {
    getName: function(){
      return this.super('getName', arguments);
    }
  })

  it('super with arguments', function(){
    var instance = new CLS2();
    var length = instance.getName(1, 2, 3, 4);
    assert.equal(length, 4);
  })
})
describe('constructor', function(){
  it('not support constructor', function(){
    var Base = function(){
      this.name = 'welefen';
    }
    var cls = Class(Base, {
      getName: function(){
        return this.name;
      }
    })
    var instance = new cls();
    assert.equal(instance.getName(), undefined)
  })
})
describe('super', function(){
  it('super', function(){
    var A = Class({
      init: function(){
        this.name = 'A';
      },
      // name: 'A',
      getName: function(){
        return this.name;
      }
    })
    var B = Class(A, {
      init: function(){
        this.name = 'B';
      },
      // name: 'B',
      getName: function(){
        return this.super('getName') + this.name;
      }
    })
    var C = Class(B, {
      init: function(){
        this.name = 'C';
      },
      // name: 'C',
      getName: function(){
        return this.super('getName') + this.name;
      }
    })
    var D = Class(C, {
      init: function(){
        this.name = 'D';
      },
      // name: 'D',
      getName: function(){
        return this.super('getName') + this.name;
      }
    })
    var instance = new D();
    var name = instance.getName();
    assert.equal(name, 'DDDD');
    var name2 = instance.getName();
    assert.equal(name, 'DDDD');
  })
})


describe('extend', function(){
  var a = {};
  var b = {name: 1};
  var c = {name: 2, value: 'value'};
  var d = {name: {name: 1}, value: {value: 2}};
  var e = {name: [1, 2, 3]};
  it('a stringify1', function(){
    extend(a, b);
    assert.deepEqual(a, {"name":1});
  })
  it('a stringify2', function(){
    extend(a, c);
    assert.deepEqual(a, {"name":2,"value":"value"})
  })
  it('a stringify3', function(){
    extend(a, d);
    assert.deepEqual(a, {"name":{"name":1},"value":{"value":2}})
  })
  it('a.name.name is 1', function(){
    d.name.name = 2;
    assert.equal(a.name.name, 1);
  })
  // it('a.name.name is 2', function(){
  //   a = {};
  //   extend(false, a, d);
  //   d.name.name = 2;
  //   assert.equal(a.name.name, 2);
  // })
  it('a.name stringify', function(){
    a = {};
    extend(a, e);
    assert.deepEqual(a, {"name":[1,2,3]})
  })
  // it('a.name[0] is 3', function(){
  //   a = {};
  //   extend(false, a, e);
  //   e.name[0] = 3;
  //   assert.equal(a.name[0], 3);
  // })
  it('extend array', function(){
    var a = [];
    var b = [1, 2, 3];
    extend(a, b)
    assert.deepEqual(a, [1, 2, 3])
  })
  it('extend empty', function(){
    var a = extend();
    assert.deepEqual(a, {})
  })
  it('extend source empty', function(){
    var a = extend({}, false);
    assert.deepEqual(a, {})
  })
  it('extend array', function(){
    var a = extend({name: [1]}, {name: [1, 2, 3]});
    assert.deepEqual(a, {name: [1, 2, 3]})
  })
  it('extend array', function(){
    var a = extend({name: [1, 2, 3, 4, 5]}, {name: [6, 7]});
    assert.deepEqual(a, {name: [6, 7]})
  })
  it('extend obj', function(){
    var a = extend({name: {value: 'welefen'}}, {name: {value: 'suredy'}});
    assert.deepEqual(a, {name: {value: 'suredy'}})
  })
  it('extend obj with undefined', function(){
    var a = extend({}, {name: undefined, value: undefined});
    assert.deepEqual(a, {name: undefined, value: undefined});
  })
  it('extend array', function(){
    var a1 = [1, 2];
    var a2 = [];
    a2 = extend(a2, a1);
    a1.push(3)
    assert.deepEqual(a1, [1,2,3]);
    assert.deepEqual(a2, [1, 2]);
  })
})

describe('isClass', function(){
  it('isClass(true)', function(){
    assert.equal(isClass(true), false);
  })
  it('isClass(Class())', function(){
    assert.equal(isClass(Class()), true);
  })
})

describe('isBoolean', function(){
  it('isBoolean(true) = true', function(){
    assert.equal(isBoolean(true), true);
  })
  it('isBoolean(false) = true', function(){
    assert.equal(isBoolean(false), true);
  })
  it('isBoolean(1) = false', function(){
    assert.equal(isBoolean(1), false);
  })
  it('isBoolean([]) = false', function(){
    assert.equal(isBoolean([]), false);
  })
  it('isBoolean(new Boolean(true)) = true', function(){
    assert.equal(isBoolean(new Boolean(true)), true);
  })
  it('isBoolean(new Boolean(false)) = true', function(){
    assert.equal(isBoolean(new Boolean(false)), true);
  })
  it('isBoolean({}) = false', function(){
    assert.equal(isBoolean({}), false);
  })
  it('isBoolean(undefined) = false', function(){
    assert.equal(isBoolean(), false);
  })
  it('isBoolean(null) = false', function(){
    assert.equal(isBoolean(null), false);
  })
})

describe('isNumber', function(){
  it('isNumber(1) = true', function(){
    assert.equal(isNumber(1), true);
  })
  it('isNumber(0) = true', function(){
    assert.equal(isNumber(0), true);
  })
  it('isNumber(1.1) = true', function(){
    assert.equal(isNumber(1.1), true);
  })
  it('isNumber(-1.1) = true', function(){
    assert.equal(isNumber(-1.1), true);
  })
  it('isNumber(0) = true', function(){
    assert.equal(isNumber(0), true);
  })
  it('isNumber(NaN) = true', function(){
    assert.equal(isNumber(NaN), true);
  })
  it('isNumber(Infinity) = true', function(){
    assert.equal(isNumber(Infinity), true);
  })
  it('isNumber(1.0E10) = true', function(){
    assert.equal(isNumber(1.0E10), true);
  })
  it('isNumber(1.0E-10) = true', function(){
    assert.equal(isNumber(1.0E-10), true);
  })
  it('isNumber("1") = false', function(){
    assert.equal(isNumber("1"), false);
  })
  it('isNumber({}) = false', function(){
    assert.equal(isNumber({}), false);
  })
  it('isNumber(Number("1")) = true', function(){
    assert.equal(isNumber(Number("1")), true);
  })
})

describe('isObject', function(){
  it('isObject({}) = true', function(){
    assert.equal(isObject({}), true)
  })
  it('isObject(new Object()) = true', function(){
    assert.equal(isObject(new Object()), true)
  })
  it('isObject("") = false', function(){
    assert.equal(isObject(""), false)
  })
  it('isObject([]) = false', function(){
    assert.equal(isObject([]), false)
  })
  it('isObject(new Buffer(11)) = false', function(){
    assert.equal(isObject(new Buffer(11)), false)
  })
})

describe('isArray', function(){
  it('isArray("") = false', function(){
    assert.equal(isArray(""), false);
  })
  it('isArray([]) = true', function(){
    assert.equal(isArray([]), true);
  })
})

describe('isString', function(){
  it('isString("") = true', function(){
    assert.equal(isString(""), true);
  })
  it('isString(new String("")) = true', function(){
    assert.equal(isString(new String("")), true);
  })
  it('isString({}) = false', function(){
    assert.equal(isString({}), false);
  })
})


describe('isFunction', function(){
  it('isFunction(function(){}) = true', function(){
    assert.equal(isFunction(function(){}), true);
  })
  it('isFunction(new Function()) = true', function(){
    assert.equal(isFunction(new Function("")), true)
  })
  it('isFunction(a) = true', function(){
    var a = function(){}
    assert.equal(isFunction(a), true);
  })
  it('isFunction(a) = true', function(){
    function a(){}
    assert.equal(isFunction(a), true);
  })
  it('isFunction({}) = false', function(){
    assert.equal(isFunction({}), false);
  })
})

describe('isDate', function(){
  it('isDate(new Date())', function(){
    assert.equal(isDate(new Date), true)
  })
  it('isDate(12121212) = false', function(){
    assert.equal(isDate(1212121), false)
  })
  it('isDate(Date.now()) = false', function(){
    assert.equal(isDate(Date.now()), false)
  })
})

describe('isRegExp', function(){
  it('isRegExp(/\w+/) = true', function(){
    assert.equal(isRegExp(/\w+/), true)
  })
  it('isRegExp(/\w+/g) = true', function(){
    assert.equal(isRegExp(/\w+/g), true)
  })
  it('isRegExp(/\w+/i) = true', function(){
    assert.equal(isRegExp(/\w+/i), true)
  })
  it('isRegExp(/\w+/m) = true', function(){
    assert.equal(isRegExp(/\w+/m), true)
  })
  it('isRegExp(/\w+/img) = true', function(){
    assert.equal(isRegExp(/\w+/img), true)
  })
  it('isRegExp(new RegExp("\w+")) = true', function(){
    assert.equal(isRegExp(new RegExp("\w+")), true)
  })
  it('isRegExp(new RegExp("\w+", "i")) = true', function(){
    assert.equal(isRegExp(new RegExp("\w+", "i")), true)
  })
})

describe('isError', function(){
  it('isError(new Error) = true', function(){
    assert.equal(isError(new Error), true);
  })
  it('isError(new URIError) = true', function(){
    assert.equal(isError(new URIError), true);
  })
})

describe('isEmpty', function(){
  it('isEmpty(0) = true', function(){
    assert.equal(isEmpty(0), true);
  })
  it('isEmpty(1) = false', function(){
    assert.equal(isEmpty(1), false);
  })
  it('isEmpty(false) = true', function(){
    assert.equal(isEmpty(false), true);
  })
  it('isEmpty(true) = false', function(){
    assert.equal(isEmpty(true), false);
  })
  it('isEmpty("") = true', function(){
    assert.equal(isEmpty(""), true)
  })
  it('isEmpty("0") = false', function(){
    assert.equal(isEmpty('0'), false);
  })
  it('isEmpty([]) = true', function(){
    assert.equal(isEmpty([]), true)
  })
  it('isEmpty({}) = true', function(){
    assert.equal(isEmpty({}), true);
  })
  it('isEmpty({name: 1}) = false', function(){
    assert.equal(isEmpty({name: 1}), false);
  })
  it('isEmpty(null) = true', function(){
    assert.equal(isEmpty(null), true)
  })
  it('isEmpty(undefined) = true', function(){
    assert.equal(isEmpty(undefined), true)
  })
  it('isEmpty(function(){}) = false', function(){
    assert.equal(isEmpty(function(){}), false)
  })
})


describe('clone', function(){
  it('clone false', function(){
    assert.equal(clone(false), false);
  })
  it('clone 1', function(){
    assert.equal(clone(1), 1);
  })
  it('clone array', function(){
    assert.deepEqual(clone([1,2,3]), [1,2,3]);
  })
  it('clone object', function(){
    assert.deepEqual(clone({name: 'welefen'}), {name: 'welefen'})
  })
})

describe('isFile', function(){
  it('isFile("test.a") = false', function(){
    assert.equal(isFile("test.a"), false)
  })
  it('isFile("test.a.txt") = true', function(){
    fs.writeFileSync('test.a.txt', "");
    assert.equal(isFile('test.a.txt'), true)
    fs.unlinkSync('test.a.txt');
  })
  it('isFile("test.a/") = false', function(){
    assert.equal(isFile('test.a/'), false);
  })
  it('isFile("test.b/") = true', function(){
    fs.mkdirSync('test.b/');
    assert.equal(isFile('test.b/'), false);
    fs.rmdirSync('test.b/');
  })
})

describe('isDir', function(){
  var dir = "test.a";
  it('isDir("' + dir + '"") = false', function(){
    assert.equal(isDir(dir), false);
  })
  it('isDir("' + dir + '"") = true', function(){
    mkdir(dir);
    assert.equal(isDir(dir), true);
    fs.rmdirSync(dir);
  })
  it('isDir("' + dir + '"") = false', function(){
    fs.writeFileSync(dir, "");
    assert.equal(isDir(dir), false);
    fs.unlinkSync(dir);
  })
})

describe('isWritable', function(){
  it('isWritable("test/") = true', function(){
    assert.equal(isWritable('test/'), true)
  })
  it('isWritable("/usr/local/testxxx") = false', function(){
    assert.equal(isWritable('/usr/local/testxxx'), false)
  })
  it('isWritable("/usr/sbin/sshd") = false', function(){
    assert.equal(isWritable('/usr/sbin/sshd'), false)
  })
})

describe('isNumberString', function(){
  it('isNumberString(1) = true', function(){
    assert.equal(isNumberString(1), true)
  })
  it('isNumberString("1") = true', function(){
    assert.equal(isNumberString("1"), true)
  })
  it('isNumberString("1.5") = true', function(){
    assert.equal(isNumberString("1.5"), true)
  })
  it('isNumberString("-1.5") = true', function(){
    assert.equal(isNumberString("-1.5"), true)
  })
  it('isNumberString("0") = true', function(){
    assert.equal(isNumberString("0"), true)
  })
  it('isNumberString("1.0E10") = true', function(){
    assert.equal(isNumberString("1.0E10"), true)
  })
  it('isNumberString("1.0E-10") = true', function(){
    assert.equal(isNumberString("1.0E-10"), true)
  })
  it('isNumberString("1E-10") = true', function(){
    assert.equal(isNumberString("1E-10"), true)
  })
})



describe('md5', function(){
  it('md5() = "5e543256c480ac577d30f76f9120eb74"', function(){
    assert.equal(md5(), '5e543256c480ac577d30f76f9120eb74');
  })
  it('md5("welefen") = "d044be314c409f92c3ee66f1ed8d3753"', function(){
    assert.equal(md5('welefen'), 'd044be314c409f92c3ee66f1ed8d3753')
  })
})



describe('isPromise', function(){
  it('isPromise() = false', function(){
    assert.equal(isPromise(), false)
  })
  it('isPromise({}) = false', function(){
    assert.equal(isPromise({}), false);
  })
  it('isPromise(function(){}) = false', function(){
    assert.equal(isPromise(function(){}), false)
  })
  it('isPromise(getPromise()) = true', function(){
    assert.equal(isPromise(Promise.resolve()), true)
  })
  it('isPromise(getPromise("", true)) = true', function(){
    assert.equal(isPromise(Promise.reject('', true)), true)
  })
})



describe('getObject', function(){
  it('getObject()', function(){
    assert.equal(JSON.stringify(getObject()), '{}');
  })
  it('getObject("welefen", "suredy")', function(){
    var data = getObject('welefen', 'suredy');
    assert.equal(data.welefen, 'suredy')
    assert.equal(Object.keys(data).join(''), 'welefen')
  })
  it('getObject(["name", "value"], ["welefen", "1"])', function(){
    var data = getObject(['name', 'value'], ['welefen', '1']);
    assert.equal(data.name, 'welefen');
    assert.equal(data.value, '1');
    assert.equal(JSON.stringify(data), '{"name":"welefen","value":"1"}')
  })
  it('getObject(["name", "value"], ["welefen"])', function(){
    var data = getObject(['name', 'value'], ['welefen'])
    assert.equal(JSON.stringify(data), '{"name":"welefen"}');
    assert.equal(data.value, undefined)
  })
  it('getObject(["name"], ["welefen", 1])', function(){
    var data = getObject(['name'], ['welefen', 1]);
    assert.equal(JSON.stringify(data), '{"name":"welefen"}')
  })
})

describe('mkdir', function(){
  it('mkdir 1 grade path', function(done){
    var dir = __dirname + '/fasdfasdf/';
    mkdir(dir);
    assert.equal(isDir(dir), true);
    rmdir(dir).then(function(){
      done();
    }).catch(function(err){
      console.log(err);
      done();
    })
  });
  it('mkdir 2 grade path', function(done){
    var dir = __dirname + '/ww123123123123/wwwwww/';
    mkdir(dir);
    assert.equal(isDir(dir), true);
    rmdir(path.dirname(dir)).then(function(){
      done();
    }).catch(function(err){
      console.log(err);
      done();
    })
  })
})


describe('rmdir', function(){
  it('rmdir not exist', function(done){
    var dir = __dirname + '/wfasdfasdfasdf/';
    rmdir(dir).then(function(){
      done();
    })
  });
  it('readdir error', function(done){
    var dir = __dirname + '/werwerwerwer/';
    var fn = fs.readdir;
    fs.readdir = function(p, callback){
      callback && callback(new Error('path error'));
    }
    mkdir(dir);
    rmdir(dir).catch(function(err){
      assert.equal(err.message, 'path error');
      fs.readdir = fn;
      rmdir(dir).then(function(){
        done();
      })
    })
  });
  it('rmdir error', function(done){
    var dir = __dirname + '/fawerwer/';
    var fn = fs.rmdir;
    fs.rmdir = function(p, callback){
      callback && callback(new Error('path error'));
    }
    mkdir(dir);
    rmdir(dir).catch(function(err){
      assert.equal(err.message, 'path error');
      fs.rmdir = fn;
      rmdir(dir).then(function(){
        done();
      })
    })
  });
  it('unlink error', function(done){
    var dir = __dirname + '/fawerfasdfasdfwer/';
    var fn = fs.unlink;
    fs.unlink = function(p, callback){
      callback && callback(new Error('unlink error'));
    }
    mkdir(dir);
    fs.writeFileSync(dir + 'a.txt', 'welefen')
    rmdir(dir).catch(function(err){
      assert.equal(err.message, 'unlink error');
      fs.unlink = fn;
      rmdir(dir).then(function(){
        done();
      })
    })
  });
})


describe('chmod', function(){
  it('path not exist', function(){
    chmod(__dirname + '/fasdfasdfasdf.txt');
  });
})

describe('isBuffer', function(){
  it('isBuffer', function(){
    assert.equal(isBuffer(new Buffer(10)), true)
  });
  it('isBuffer', function(){
    assert.equal(isBuffer(''), false)
  });
})

describe('arrToObj', function(){
  var data = [{
    name: 'welefen',
    value: 1
  }, {
    name: 'suredy',
    value: 2
  }]
  it('arrToObj("name")', function(){
    var res = arrToObj(data, 'name');
    assert.equal(JSON.stringify(res), '{"welefen":{"name":"welefen","value":1},"suredy":{"name":"suredy","value":2}}')
  })
  it('arrToObj("name", "value")', function(){
    var res = arrToObj(data, 'name', 'value');
    assert.equal(JSON.stringify(res), '{"welefen":1,"suredy":2}')
  })
  it('arrToObj("name", null)', function(){
    var res = arrToObj(data, 'name', null);
    assert.equal(JSON.stringify(res), '["welefen","suredy"]')
  })
  it('arrToObj("value", null)', function(){
    var res = arrToObj(data, 'value', null);
    assert.equal(JSON.stringify(res), '[1,2]')
  })
})

describe('getFiles', function(){
  it('getFiles', function(){
    var files = getFiles(__dirname + '/'); 
    assert.deepEqual(files.indexOf('index.js') > -1, true);
  })
  it('getFiles empty', function(){
    var files = getFiles(__dirname + '/dddd/'); 
    assert.deepEqual(files, []);
  })
})

describe('objValues', function(){
  it('objValues', function(){
    var value = objValues({name: '111'}); 
    assert.deepEqual(value, ['111']);
  })
  it('objValues, data empty', function(){
    var value = objValues({}); 
    assert.deepEqual(value, []);
  })
})