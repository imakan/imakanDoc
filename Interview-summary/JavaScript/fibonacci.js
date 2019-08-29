//用记忆函数实现fibonacci数列

//函数记忆 是将函数执行结果存储起来 避免重复的执行
let count = 0;
let fibonacci = (function(){
  let mem = [0,1];
  let fib = function(n){
    let result = mem[n];
    if(typeof result !== 'number'){
      result = fib(n-1) + fib(n-2);
      mem[n] = result
    }
    return result;
  }
  return fib
})()
const val = fibonacci(10)
console.log(val)