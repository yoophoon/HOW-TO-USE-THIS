
/**
 * 9.1.1  创建代理
 * 
 */
(()=>{
  const target={
    id:'target',
  };
  
  const handler={};
  //id属性会访问同一个值
  const proxy=new Proxy(target,handler)
  console.log(target.id,proxy.id);
  //给目标属性赋值会反映在两个对象上，因为两个对象访问的是同一个值
  target.id='foo';
  console.log(target.id,proxy.id);
  //给代理属性赋值会反映在两个对象上，因为赋值会转移到目标对象
  proxy.id='bar';
  console.log(target.id,proxy.id)

  //代理对象没有prototype属性，不能使用instanceof操作符
  // console.log(target instanceof Proxy,proxy instanceof Proxy)  //TypeError
})
()