
function outer() { 
  inner(); 
 } 
 function inner() { 
  //TypeError
  //严格模式 callee和caller使用受限
  console.log(arguments.callee.caller); 
 } 
 outer();