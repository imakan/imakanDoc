/**
 * 1、实现一个防抖函数
 * 解释：什么是防抖，
 * 举个例子，小明的老婆要减肥，他们约定如果7天不吃零食，就给买个包，
 * 如果七天中吃了一次零食，就要重新计时
 * 代码实现：
 * 应用场景：适合远程提交，多次提交只算最后一次提交，比如单词联想
 * 这地方可以抛出单词字典的那道题
 */

let debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
};

/**
 * 2、实现一个节流函数
 * 解释：什么是节流函数。
 * 节流函数就是，单位时间内只触发一次，如果多次触发，也只执行一次
 * 代码实现：
 * 应用场景：
 * resize
 */
let throttle = (fn, delay) => {
  let flag = false;
  return (...args) => {
    if (flag) return false;
    flag = true;
    setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
};

/**
 * 深克隆
 * 简化版:
 * 缺点：
 * 对于value是：undefined的字段，自动删除，
 * 不能解析正则
 * 如果是时间的话，会变成字符串
 */
let deepclone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * 实现一个instanceOf
 */
a instanceof b;
let isntance_of = (L, R) => {
  let O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
};

/**
 * 模拟一个new
 * 首先新建一个新对象。将A的this执行这个新对象
 * 将A的原型链执行这个新对象上面
 * 执行Adeconstructor,
 * this执行返回constructor的对象，或者是this本身
 *
 */

let _new = function() {
  let obj = {};
  // 获取constructor
  let Constructor = [].shift.call(arguments);
  obj.__proto = Constructor.prototype;
  const ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret : obj;
};

/**
 * 实现类的继承
 * 1、在子对象中调用父对象 Parent.call(this,parent)
 * 2、子对象的prototype = object.create(Parent.prototypr)
 * 3、子对象的constructor 指向子对象本身 Child.prototype.contructor = Child
 */

