/**
先解释下什么是柯里化函数
柯里化函数就是参数单一化，返回一个接收单一或者多个参数的函数
比如:
function sum (a,b,c) {
  return a + b + c
}
那currying后，我们可以这么调用 
let sum = currying(fn) 
sum(a)(b)(c)()或者sum(a,b)(c) 
 */

//  他这种做法是判断 原来的函数的参数对比
// let curry = (fn,...args) => {
//   args.length < fn.length ? (...arguments) => curry(fn,...args,...arguments) : fn(...args)
// };

let curry = (fn) => {
  let arg = []
  return function () {
    if(arguments.length){
      arg.push(...Array.prototype.slice.apply(arguments))
      return arguments.callee
    }else{
      console.log(arg)
      return fn.call(this,...arg)
    }
  }
}
function sum (a,b,c) {
  return a + b + c
}
let sumFn = curry(sum)
console.log(sumFn(1)(2)(3)())