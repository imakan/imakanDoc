
 ```es6
 //实现一个防抖动函数  debounce
/**
 * 
 * @param {*} fn 
 * @param {*} time 
 */
let throttle = function (fn, time) {
  var time = '',
    firstFlag = true;
  return function () {
    var args = arguments;
    if (firstFlag) {
      firstFlag = false;
      fn.apply(this, args)
    }
    if (time) return false;
    time = setTimeout(function () {
      clearTimeout(time)
      time = null;
      fn.apply(this, args)
    }, time)
  }
}
window.onresize = throttle(function () {
  console.log(111)
}, 500)

 ```