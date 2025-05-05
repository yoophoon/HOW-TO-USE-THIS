"use strict";
var num = 10;
num = 11;
function abc(a) {
}
abc('');
//类型声明 指定ts变量(参数,形参)的类型 ts编译器 自动检查
//类型声明给变量设置类型，使用变量只能赋予对应类型的值
//布尔类型
var flag = true;
//flag = 123
//number
var n = 10; //0b 二进制 0o 八进制 0x 十六进制
//n = false
//string
var str = '';
//undefined null
var u = undefined;
var nu = null;
//array
//指定所有元素的类型
var arr1 = [1, 2, 3];
//arr1[0] = ''
//使用泛型
var arr2 = [1, 2, 3];
//object 非原始类型
var obj = {};
// obj=123
// obj=''
// obj = null
// obj = undefined
obj = [];
obj = new String();
obj = String;
// any 任何类型
var a = 123;
a = true;
a = '';
a = {};
a = [];
var newArr = [1, '2', { 3: 3 }];
//newArr[0].split('')
//void
function fun1() {
    console.log(123);
}
console.log(fun1());
var v = undefined;
// v = null
//类型自动判断 
//申明变量且赋值时未指定类型
var number = 123;
// number = '123'
//申明变量但未复制
var va;
va = 123;
va = '';
va = [];
//联合类型
var united = 1;
united = '';
var nnnum = {
    big: '123',
    normal: 123,
    'sta': '123',
};
var newAAR = [1, '2', { 3: 3 }];
newAAR[1] = 2;
var fun2 = function (a, b) {
    return true;
};
var str1 = '';
// let str2: stringType = '4' //error
var str2 = '1';
