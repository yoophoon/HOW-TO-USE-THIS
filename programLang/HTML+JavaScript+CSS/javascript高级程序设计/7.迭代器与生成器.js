/**
 * 7.2.1  可迭代协议
 * 迭代器（iterator）可迭代协议（iterable）
 */
(()=>{
  let num=1;
  let obj={};
  //number和对象字面量不存在默认迭代器工厂函数
  console.log(num[Symbol.iterator]);  //undefined
  console.log(obj[Symbol.iterator]);  //undefined

  let str='abc';
  let arr=['a','b','c'];
  let map=new Map().set('a',1).set('b',2).set('c',3);
  let set=new Set().add('a').add('b').add('c');
  //具备迭代器工厂函数
  console.log(str[Symbol.iterator]);  //[Function: [Symbol.iterator]]
  console.log(arr[Symbol.iterator]);  //[Function: values]
  console.log(map[Symbol.iterator]);  //[Function: entries]
  console.log(set[Symbol.iterator]);  //[Function: values]
  //调用迭代器工厂函数会返回一个迭代器
  console.log(str[Symbol.iterator]());
  console.log(arr[Symbol.iterator]());
  console.log(map[Symbol.iterator]());
  console.log(set[Symbol.iterator]());
})
// ()

;/**
 * 7.2.2  迭代器协议
 * 
 */
(()=>{
  //每个迭代器都表示可迭代对象的一次性有序遍历。
  //不同迭代器的实例相互之间没有联系，只会独立地遍历可迭代对象
  let arr=['foo','bar'];
  let iter1=arr[Symbol.iterator]();
  let iter2=arr[Symbol.iterator]();
  console.log(iter1.next());  //{ value: 'foo', done: false }
  console.log(iter2.next());  //{ value: 'foo', done: false }
  console.log(iter2.next());  //{ value: 'bar', done: false }
  console.log(iter1.next());  //{ value: 'bar', done: false }

  //迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录遍历可迭代对象的力成
  //如果可迭代对象在迭代期间被修改了，迭代器也会反映相应的变化
  let cur=['foo','baz'];
  const iter=cur[Symbol.iterator]();  //{ value: 'foo', done: false }
  console.log(iter.next());
  //插入新值
  cur.splice(1,0,'bar');
  console.log(iter.next()); //{ value: 'bar', done: false }
  console.log(iter.next()); //{ value: 'baz', done: false }
  console.log(iter.next()); //{ value: undefined, done: true }

  //这个类实现了可迭代接口（Iterable）
  //调用默认的迭代器工厂函数会返回一个实现迭代器接口（Iterator）的迭代器对象
  class Foo{
    [Symbol.iterator](){
      return {
        next(){
          return {done:false,value:'foo'}
        }
      }
    }
  }

  let f= new Foo();
  //实现了迭代器接口的对象
  console.log(f[Symbol.iterator]());  //{ next: [Function: next] }

  //Array类型实现了可迭代接口（Iterable）
  //调用Array类型的默认迭代器工厂函数会返回一个ArrayIterator
  let a=new Array();
  //原生迭代器
  console.log(a[Symbol.iterator]());  //Object [Array Iterator] {}
})
// ()

;/**
 * 7.2.4  提前终止迭代器
 * 
 */
(()=>{
  //内置语言结构在发现还有更多值可以迭代，但不会消费这些值时，会自动调用return方法
  class Counter{
    constructor(limit){
      this.limit=limit;
    }
    [Symbol.iterator](){
      let count=1,
          limit=this.limit;
      return {
        next(){
          if(count<=limit){
            return {done:false,value:count++};
          }else{
            return {done:true};
          }
        },
        return(){
          console.log('Exiting early');
          return {done:true};
        }
      };
    }
  }
  let counter1=new Counter(5);
  for(let i of counter1){
    if(i>2){
      break;
    }
    console.log(i);
  }

  //先调用迭代器的return函数
  let counter2=new Counter(5);
  try{
    for(let i of counter2){
      if(i>2){
        throw 'err'
      }
      console.log(i);
    }
  }catch(e){console.log(e)}

  let counter3=new Counter(5);
  let [da,db]=counter3;

  //如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代
  //比如，数组的迭代器就是不能关闭的
  let a=[1,2,3,4,5];
  let iter=a[Symbol.iterator]();
  for(let i of iter){
    console.log(i);
    if(i>2){
      break
    }
  }
  console.log('leave and back again!')
  for(let i of iter){
    console.log(i);
  }

  //迭代器提前关闭时会调用return函数，但调用return函数并不会强制关闭迭代器
  let arrA=[1,2,3,4,5];
  let iterA=arrA[Symbol.iterator]();

  iterA.return=function(){
    console.log('Exiting early');
    return {done:true};
  };

  for(let i of iterA){
    console.log(i);
    if(i>2){
      break
    }
  }
  // console.log('leave and back again!')
  for(let i of iterA){
    console.log(i);
  }
})
// ()

;/**
 * 7.3  生成器
 */
(()=>{
  //yield关键字同时用于输入和输出
  function* generatorFn(){
    console.log(yield 'baz');
    console.log(yield);
    return (yield);
  }
  let generatorObj=generatorFn();
  //next传值仅供生成器函数内部使用
  console.log(generatorObj.next('1'));
  console.log(generatorObj.next('2'));  //{ value: 'foo', done: false }
  console.log(generatorObj.next('3'));  //{ value: 'bar', done: true }
  console.log(generatorObj.next('4'));  //生成器迭代完之后就不会处理next的传参了
})
// ()