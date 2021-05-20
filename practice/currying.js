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

let curry1 = (fn) => {
  let arg = [];
  return function () {
    if (arguments.length) {
      arg.push(...Array.prototype.slice.apply(arguments));
      return arguments.callee;
    } else {
      console.log(arg);
      return fn.call(this, ...arg);
    }
  };
};
function sum(a, b, c) {
  return a + b + c;
}
// let sumFn = curry1(sum);
// console.log(sumFn(1)(2)(3)());

// 知识点：
// curry(fn) fn的参数个数可以通过fn.length获取，
// curry(fn,...args)  // 初始化args 为一个空数组
const curry = (fn, ...args) => {
  // 函数的参数个数可以直接通过函数的.length属性来访问
  console.log(fn.length);
  console.log(args.length);
  // 这个判断很关键！！！ fn.length代表的是 传入的函数本来应该接受几个函数
  if (args.length >= fn.length) {
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    return fn(...args);
  } else {
    // 传入的参数小于原始函数fn的参数个数时
    // 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
    // return ([1]) => curry(fn)
    return (..._args) => curry(fn, ...args, ..._args);
  }
};

function add1(x, y, z) {
  return x + y + z;
}

add(1) = (..._args) => curry(fn, [1]);
add(1)(2) = (..._args) => curry(fn, [1, 2]);
add(1)(2)(3) = (..._args) => curry(fn, [1, 2, 3]);
//
const add = curry(add1);
// console.log(add(1, 2, 3)); // curry(add1)(1, 2, 3)
add(1)(2); // curry(add1)(1)(2)(3)
// console.log(add(1, 2)(3)); // curry(add1)(1, 2)(3)
// console.log(add(1)(2, 3)); // curry(add1)(1)(2, 3)
