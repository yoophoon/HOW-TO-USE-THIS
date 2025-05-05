/**
 * 8.1.1  属性的类型
 * ECMA-262使用内部特性来描述属性的特征。这些特性是由为Javascript实现引擎的规范定义的。
 * 开发者不能直接访问这些特性。规范使用两个中括号把特性名称括起来以标识为内部特性。
 * 如 [[Enumerable]]
 */

/**
 * 8.1.7  对象解构
 * 
 */
(() => {
  //在外层属性没有定义的情况下不能使用嵌套解构。
  let person = {
    job: {
      title: 'Software engineer'
    }
  };
  let personCopy = {};
  // foo 在源对象上是 undefined 
  // ({
  //   foo: {
  //     bar: personCopy.bar
  //   }
  // } = person);
  // TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'. 
  // job 在目标对象上是 undefined 
  ({
    job: {
      // title: personCopy.job.title
      title: personCopy //personCopy:'Software engineer'
    }
  } = person);
  // TypeError: Cannot set property 'title' of undefined
})
// ()

/**
 * 8.2.3  构造函数模式
 * 创建对象的方式：工厂模式、构造函数模式
 */
(()=>{
  //(1) 在内存中创建一个新对象。
  //(2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
  //(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
  //(4) 执行构造函数内部的代码（给新对象添加属性）。
  //(5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
      console.log(this.name);
    };
    //如果return的是原始值则new之后返回的是构造函数在内存中新建的对象
    //如果是引用值（对象）则new之后返回的是构造函数返回的引用值
    // return 1;
    // return new Number(1);
  }
  let person1 = new Person("Nicholas", 29, "Software Engineer");
  let person2 = new Person("Greg", 27, "Doctor");
  person1.sayName(); // Nicholas 
  person2.sayName(); // Greg 
})
// ()

;/**
 * 8.3.2  盗用构造函数
 *
 */
(() => {
  function SuperType() {
    this.colors = ["red", "blue", "green"];
  }
  function SubType() {
    // 继承 SuperType 
    SuperType.call(this);
  }
  let instance1 = new SubType();
  instance1.colors.push("black");
  console.log(instance1.colors); // "red,blue,green,black" 
  let instance2 = new SubType();
  console.log(instance2.colors); // "red,blue,green" 
  SubType.prototype.showColor=function(){
    console.log(this.colors.push('pink'))
  }

  console.log(instance1.showColor())
})
// ()