/**
 * 说一下bind,call,apply三个函数的认识，自己实现一下bind
 * 相同点：
 * 1、bind.call,apply都是可以改变js运行时的context指针
 * 2、都是定义在Function.prototype上面的方法
 * 3、都可以传入额外的参数，也就是传入多个参数
 * 4、三个方法的第一个参数都是指定context的上下文
 * 不同点：
 * 1、call和apply的参数形式不一样。call是多个参数，apply就只能有两个参数，第一个参数是context,第二个参数是array
 * 2、bind返回一个回调函数，而call和apply是立即执行函数
 */

// call 和 apply的实例

// 1、数组之间追加

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
Array.prototype.push.apply(arr1, arr2);

// 2、获取数组中的最大值和最小值
let arr3 = [1, 2, 3, 4, 5, 22, 44, 93, 432, 433, 0, 7, 8, 9, 10];
let value = Math.max.apply(Math, arr3);
let value2 = Math.min.apply(Math, arr3);

// 3、验证是否是数组
let arr4 = [1, 2, 3, 4, 5];
Object.prototype.toString.call(arr4) == "[object Array]";

// 类数组使用数组方法
// Array.prototype.slice.call(document.getElementsByTagName("*"))

//  定义一个log,可以传多个参数，代理console.log

// function log () {
//   console.log.apply(console,arguments)
// }

//  定义一个log,可以传多个参数，代理console.log,消息添加一个"(app)"的前辍

function log() {
  // 这地方有个知识点，在w3c介绍中，slice的第一个参数是必填的，但是我们在实际应用中是不必填的
  let arg = Array.prototype.slice(arguments);
  arg.unshift("[app]");
  console.log.apply(arg);
}
// log('makan')

// bind的应用场景，偏函数，就是给函数预设参数
// 当使用绑定函数来构造实例，注意：this会被忽略

function original(){
    this.maxN=18;
    return this.maxN;
  }
  var obj={
    minN:10,
    maxN:20
  }
  var newFunc=original.bind(obj);
  var instance=new newFunc();
  console.log(instance.maxN);


// 实现bind

Function.prototype.bind = function(context) {
  // 记录this
  let self = this;
  // 获取context之外的参数
  let args = Array.prototype.slice.apply(arguments, 1);
  // 创建一个空函数，为了继承来自于绑定函数是构造函数的
  let F = function() {};
  F.prototype = self.prototype
  bound = function() {
    // 获取调用回调函数时候的参数
    let innerArg = Array.prototype.slice.apply(arguments);
    let finalArgs = args.concat(innerArg);
    // 这里就是判断绑定函数是否是构造函数
    self.apply(this instanceof F ? this : context, finalArgs);
  };
  bound.prototype = new F()
  return bound;
};

// document.write  首先是初始化new Document()，调用document.write(),write内部调用了Document的方法，而我们赋值给别的对象 var altwrite = document.write, altwrite().这里面的this指向了window.



