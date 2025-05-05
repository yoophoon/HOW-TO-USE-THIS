let num = 10
num = 11
function abc(a: string) {

}
abc('')
//类型声明 指定ts变量(参数,形参)的类型 ts编译器 自动检查
//类型声明给变量设置类型，使用变量只能赋予对应类型的值

//布尔类型
let flag: boolean = true
//flag = 123

//number
let n: number = 10  //0b 二进制 0o 八进制 0x 十六进制
//n = false

//string
let str: string = ''

//undefined null
let u: undefined = undefined
let nu: null = null

//array
//指定所有元素的类型
let arr1: number[] = [1, 2, 3]
//arr1[0] = ''
//使用泛型
let arr2: Array<number> = [1, 2, 3]

//object 非原始类型
let obj: object = {}
// obj=123
// obj=''
// obj = null
// obj = undefined
obj = []
obj = new String()
obj = String

// any 任何类型
let a: any = 123
a = true
a = ''
a = {}
a = []
let newArr: any[] = [1, '2', { 3: 3 }]
//newArr[0].split('')

//void
function fun1(): void {
    console.log(123)
}
console.log(fun1());
let v: void = undefined
// v = null

//类型自动判断 
//申明变量且赋值时未指定类型
let number = 123
// number = '123'
//申明变量但未复制
let va
va = 123
va = ''
va = []

//联合类型
let united: number | string = 1
united = ''

//接口 有点像c的结构体
//:定义的属性类型必须存在
//?:定义的属性类型可以动态判断
//[propName:type]:type 任意属性
//readonly只读
interface num {
    readonly big: string,
    normal: number,
    [propNmae: string | number]: string | number,
}
let nnnum: num = {
    big: '123',
    normal: 123,
    'sta': '123',
}

//数组类型 实用性不高
interface newArray {
    [index: number]: number | string | object
}

let newAAR: newArray = [1, '2', { 3: 3 }]
newAAR[1] = 2
//函数类型 适用于函数表达式
interface funT {
    (a: string, b: string): boolean
}

let fun2: funT = function (a: string, b: string): boolean {
    return true
}

//类型别名 多用于联合类型
type s = string | number | boolean
let str1: s = ''
//字符串字面量类型 类似于枚举
type stringType = '1' | '2' | '3'
// let str2: stringType = '4' //error
let str2: stringType = '1'
