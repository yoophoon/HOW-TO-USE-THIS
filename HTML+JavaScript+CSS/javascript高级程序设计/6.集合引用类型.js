/**
 * 6.5.4  使用弱映射
 * weakmap创建私有变量
 */
(()=>{
  console.log('--------------------------创建私有变量---------------------------')
  const wm = new WeakMap();
  class User {
    constructor(id) {
      this.idProperty = Symbol('id');
      this.setId(id)
    }

    setPrivate(property, value) {
      const privateMembers = wm.get(this) || {};
      privateMembers[property] = value;
      wm.set(this, privateMembers);
    }

    getPrivate(property) {
      return wm.get(this)[property];
    }

    setId(id) {
      this.setPrivate(this.idProperty, id);
    }

    getId() {
      return this.getPrivate(this.idProperty)
    }
  }

  const user = new User(123);
  console.log(user.getId());  //123
  user.setId(456);
  console.log(user.getId());  //456

  //外界仍可以访问
  console.log(wm.get(user)[user.idProperty]); //456

  //采用闭包隔绝weakmap
  const closureUser = (() => {
    const wm = new WeakMap();
    class User {
      constructor(id) {
        this.idProperty = Symbol('id');
        this.setId(id)
      }

      setPrivate(property, value) {
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
      }

      getPrivate(property) {
        return wm.get(this)[property];
      }

      setId(id) {
        this.setPrivate(this.idProperty, id);
      }

      getId() {
        return this.getPrivate(this.idProperty)
      }
    }
    return User
  })()

  const closureUserI = new closureUser(123)
  console.log(closureUserI.getId());  //123
})
// ()

;/**
 * 6.6.2  顺序与迭代
 * set的顺序与迭代
 */
(()=>{
  console.log('-----------------------set的顺序与迭代---------------------------')
  const s=new Set(['val1','val2','val3']);
  //集合实例提供一个迭代器（Iterator），能以插入顺序生成集合内容。
  //通过values()方法及其别名方法keys()（或者Symbol.iterator属性，它引用values())取得这个迭代器
  console.log(s.values(),s.values===s[Symbol.iterator]);
  console.log(s.keys(),s.keys===s[Symbol.iterator]);

  for (const value of s.values()){
    console.log(value)
  }

  //直接对集合实例使用扩展操作，把集合转换为数组
  console.log([...s])

  //集合的entries()方法返回一个迭代器，可以按照插入顺序产生包括两个元素的数组，这两个元素是集合中每个值得重复出现
  for (const pair of s.entries()){
    console.log(pair)
  }
})
// ()