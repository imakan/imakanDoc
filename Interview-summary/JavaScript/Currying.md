# Currying

## 简单介绍

> 柯里化函数又叫做部分求值（因为柯里化函数可以在传参的时候，不返回函数运算结果，将参数储存起来，返回新函数，当参数为空时，才去求值，所以柯里化函数又名部分求值）。是把接受多个参数的函数变换成接受一个单一参数（最初的第一个参数）的函数，并且返回接受余下参数而且返回结果的新函数的技术；

```
表达式：f (x,y) = g x y;
```
柯里化和`bind`、`call`、`apply`有着千丝万缕的关系，也会用到闭包的功能

## 面试题库
柯里化（Currying）具有：延迟计算、参数复用、动态生成函数的作用。

### 延迟求值

```
var currying = (fn) => {
  const args = [];
  return function() {
    if(arguments.length === 0) return fn.apply(this,args);
    [].push.apply(args,arguments);
    return arguments.callee;
  }
}
const add = (...args) => args.reduce((a,b)=> a + b);
const sum = currying(add);
sum(1,2)(3)(5)
sum(5);
console.log(sum())
```

>> 当我们不使用currying的时候，不拆分arguments，而是只是实现一个简单功能的时候，比如`sum(1)(2)(3)() = 6` 这样的问题，可以使用递归进行实现,同时我们可以实现一个更难一点的问题，比如 `sum(1)(2)(3)` 这个问题，则需要考虑取值的结果，实际上考点一个是递归，一个是求值，也就是 `valueOf` 和 `toString`(求值后，返回的是函数的引用，所以要调用toString)

```
方法一：
const add = function(num){
  var sum = 0;
  sum += num;
  var timeFunc = function(nnum){
    if(arguments.length === 0){
      return sum;
    }else{
      sum += nnum
      return timeFunc;
    }
  }
  timeFunc.valueOf = function(){
    return sum;
  }
  timeFunc.toString = function(){
    return sum + '';
  }
  return timeFunc
}
```

```
方案二：
var add = function(num){
  var args = [];
  args.push(num)
  function addNum(){
    if(arguments.length === 0){
      return calulate;
    }else{
      [].push.apply(args,[].splice.call(arguments,0));
      return addNum;
    }
  }
  function calulate(){
    return args.reduce((a,b) => a + b);
    args = [];
  }
  addNum.valueOf = function(){
    return calulate();
  }
  addNum.toString = function(){
    return calulate() + '';
  }
  return addNum;
}

```

## 参数复用

```
const addEvent = (function(){
  if(window.addEventListener){
    return (ele,type,fn,capture) => {
      ele.addEventListener(type,(e)=> fn.call(elem,e).capture);
    }
  }else{
    return (elem,type,fn,capture) => {
      elem.attachEWvent('on'+type,(e) => fn.call(elem,e))
    }
  }
  
})
```

## 动态生成函数

> 当多次调用一个函数，并且传递的参数绝大多数都是相同的时候，那么该函数就是一个很好的柯里化候选，例如：
```
const obj = {name:'test'};
const foo(a,b){
  console.log(a + this.name + b)
}.bind(obj,'currying-');
foo('-function'); // currying-test-function
```
与 `call / apply`方法直接执行不同，bind方法将第一个参数设置为函数执行的上下文，其他参数依次传递给调用方法，（函数的主体本身不执行，可以看成延迟执行），并动态创建一个新的函数。这很符合柯里化的特征；动手实现下bind方法

```
Function.prototype.bind = function(context,...args){
  return (...rest) => this.call(context,...args,...rest)
}
```