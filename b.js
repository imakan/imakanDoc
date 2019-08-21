console.log(require("./a"));
setTimeout(() => {
  console.log(require.cache['a'])
  let { a } = require("./a");
  console.log(a);
}, 2000);

// 对module.exports的赋值必须立即完成，不能在任何回调中完成，所以我们在回调中完成的赋值都是不起作用的