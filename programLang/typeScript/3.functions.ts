//申明函数
function add(a: number, b: number): number {
    return a + b
}
//函数表达式
let add1 = function (a: number, b: number): number {
    return a + b
}
let add2: (a: number, b: number) => number = function (a, b) {
    // return ''
    return a + b
}

//函数参数设置
//默认参数类似解构，附加参数类似接口
let getName = function (x: string = '', y?: string): string {
    if (y == undefined) {
        y = 'Mr.'
    }
    return x + y
}
getName()
//剩余参数
function fn3(x: string, y: string, ...args: number[]) {

}

//函数重载申明
function fn4(x: string, y: string): string
function fn4(x: number, y: number): number
//函数实现
function fn4(x: string | number, y: string | number): string | number {
    if (typeof x == 'string' && typeof y == 'string') {
        return x + y
    } else if (typeof x == 'number' && typeof y == 'number') {
        return x + y
    } else {
        return 'args type should be equal'
    }
}

//16.类型断言 variable as type or <type>variable
function fun5(x: string | number): number {
    return (x as string).length || (<number>x).toString().length
}
//当无法赋予对象新的属性时将对象断言未any
// window.a = '' //error
(window as any).a = '';
(<any>window).a = ''
//将any断言为一个类型
function add3(a: any, b: any): any {
    return a + b
}
let numAdd = add3(1, 2) as number
let strAdd = add3('1', '2') as string