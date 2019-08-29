// console.log(require("./a"));
// setTimeout(() => {
//   console.log(require.cache['a'])
//   let { a } = require("./a");
//   console.log(a);
// }, 2000);

function wait() {
  return new Promise(resolve => setTimeout(resolve, 10 * 1000));
}

async function main () {
  console.time();
  const x = await wait()  // Promise
  const y = await wait() // Promise
  const z = await wait() // Promise
  // await x;  // setTimeout(resolve, 10 * 1000)
  // await y;  // setTimeout(resolve, 10 * 1000)
  // await z;  // setTimeout(resolve, 10 * 1000)
  console.timeEnd();
}
// default  10 
main()

// 对module.exports的赋值必须立即完成，不能在任何回调中完成，所以我们在回调中完成的赋值都是不起作用的
