"use strict";
//申明函数
function add(a, b) {
    return a + b;
}
//函数表达式
var add1 = function (a, b) {
    return a + b;
};
var add2 = function (a, b) {
    // return ''
    return a + b;
};
//函数参数设置
//默认参数类似解构，附加参数类似接口
var getName = function (x, y) {
    if (x === void 0) { x = ''; }
    if (y == undefined) {
        y = 'Mr.';
    }
    return x + y;
};
getName();
//剩余参数
function fn3(x, y) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
}
//函数实现
function fn4(x, y) {
    if (typeof x == 'string' && typeof y == 'string') {
        return x + y;
    }
    else if (typeof x == 'number' && typeof y == 'number') {
        return x + y;
    }
    else {
        return 'args type should be equal';
    }
}
//16.类型断言 variable as type or <type>variable
function fun5(x) {
    return x.length || x.toString().length;
}
//当无法赋予对象新的属性时将对象断言未any
// window.a = '' //error
window.a = '';
window.a = '';
//将any断言为一个类型
function add3(a, b) {
    return a + b;
}
var numAdd = add3(1, 2);
var strAdd = add3('1', '2');
