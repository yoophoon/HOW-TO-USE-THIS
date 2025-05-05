/**
 * 11.2 Promise
 * Promise进度通知
 */

(() => {
  class TrackablePromise extends Promise {
    constructor(executor) {
      const notifyHandlers = [];
      super((resolve, reject) => {
        return executor(resolve, reject, (status) => {
          notifyHandlers.map((handler) => handler(status));
        });
      });
      this.notifyHandlers = notifyHandlers;
    }
    notify(notifyHandler) {
      this.notifyHandlers.push(notifyHandler);
      return this;
    }
  }
  let p = new TrackablePromise((resolve, reject, notify) => {
    function countdown(x) {
      if (x > 0) {
        notify(`${20 * x}% remaining`);
        setTimeout(() => countdown(x - 1), 1000);
      } else {
        resolve();
      }
    }
    countdown(5);
  });

  p.notify((x) => setTimeout(console.log, 0, 'progress:', x));
  p.notify((x) => setTimeout(console.log, 0, '!progress:', x));
  // 因为notify返回对象本身，所以上面语句与下面语句等价
  p .notify((x) => setTimeout(console.log, 0, 'progress:', x))
    .notify((x) => setTimeout(console.log, 0, '!progress:', x));
  p.then(() => setTimeout(console.log, 0, 'completed'));
})
// ()

;/**
 * 11.3.1 异步函数
 * 
 */
(()=>{
  async function foo(){
    console.log(1);
    //无法捕获
    //async本质还是Promise的语法糖，其链式操作都依赖函数的返回值
    //如果没有显示的返回值，则默认返回 Promise.resolve(undefined)
    //下面语句会导致 Uncaught (in promise): 3 
    Promise.reject(3);
    //下面语句则可正常进行链式调用
    // return Promise.reject(3)
    // await等待会抛出的同步操作，会返回拒绝的Promise
    // 单独的 Promise.reject()不会被异步函数捕获，而会抛出未捕获错误。
    // 不过，对拒绝的期约使用 await 则会释放（unwrap）错误值（将拒绝期约返回）
    // await Promise.reject(3)
  }

  //无法捕获
  foo().catch(console.log);
  console.log(2);
})
// ()

async function foo() { 
  console.log(await Promise.resolve('foo')); 
 } 
 async function bar() { 
  console.log(await 'bar'); 
 } 
 async function baz() { 
  console.log('baz'); 
 } 
 //实际输出应该关联异步函数的内部逻辑，
//  foo(); 
//  bar(); 
//  baz(); 
 
Promise.resolve()
  .then(() => {
    console.log(0);
    // return Promise.resolve(4);
    return 4
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  })