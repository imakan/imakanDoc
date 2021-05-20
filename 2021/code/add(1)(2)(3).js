// 实现add(1)(2)(3)
// 审题  这道题是执行了三次

const add = (a, b, c) => {
  console.log(a + b + c);
  return a + b + c;
};

const curry = (fn, ...args) => {
  // fn.length 获取的是fn的参数长度 判断fn的原函数如果和传入的柯里化函数参数一致 执行原函数
  if (fn.length <= args.length) {
    return fn(...args);
  } else {
    return (...innerArg) => curry(fn, ...args, ...innerArg);
  }
};

const sumFn = curry(add);

sumFn(1)(2)(3);
