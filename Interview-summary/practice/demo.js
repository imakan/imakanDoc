//1*x + 2*y + 5*z = 11
//排序组合
var sort = function (money, arr) {
  for (var i = 0; i < arr.length; i++) {

  }
}

var makeChange = function (money, coins) {
  var change = [0, 0, 0]
  var rest = money;
  for (var i = coins.length; rest > 0 && i >= 0; i--) {
    if (coins[i] <= money) {
      change[i] = Math.floor(rest / coins[i]);
      rest = rest % coins[i];
    }
  }
  return change;
}
var con = function (coins, methods) {
  for (var i = 0; i < coins.length; i++) {
    if (methods[i] != 0) {
      console.log('需要' + methods[i] + "张" + coins[i] + "元.");
    }
  }
}
var money = 11;
var coins = [1, 3, 5];
var methods = makeChange(money, coins);
// con(coins, methods);


var arr = [9, 9, 4, 7, 6, 7, 5, 1]
/**
 * 数组分成两份。一份为有序数组，一份为待插入数组 
 * 每次取出待插入数组中的第一个元素，放到有序数组中，对比有序数组中的值，比这个大就放到后面，比他小就放到前面
 */
var insertSort = function (arr) {
  var temp = '';
  var j = 0;
  for (var i = 1; i < arr.length; i++) {
    temp = arr[i] //取出待插入数组中的第一个数            3 
    j = i - 1; //有序数组中的最后一个值                   0 
    while (j >= 0 && temp < arr[j]) { //             3 < 9      
      arr[j + 1] = arr[j] //        arr[1】 = arr[0] 有序数组往后移动一位  
      j--;
    }
    arr[j + 1] = temp //将元素插入到合适的位置
  }
  return arr;
}
// console.log(insertSort(arr))




/**
 * 
实现LazyMan,可以按照以下方式调用
LazyMan('Hank')输出:
Hi!This is Hnk!

LazyMan("Hank").sleep(10).eat('dinner')输出

LazyMan('Hank')输出:
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 */

 //事件列表
var taskList = [];
//订阅模式，将函数存入数组
var subscribe = function(){
  var params = {};
  let arg = [].slice.apply(arguments)
  params.funName = arg[0]
  params.args = arg[1]
  if(params.funName == '_sleepFirst'){
    taskList.unshift(params)
  }else{
    taskList.push(params)
  }
  return taskList;
}
//发布模式publish
var publish = function(){
  if(taskList.length == 0) return false;
  var option = taskList.shift();
  var funName = option.funName;
  var arg = option.args;
  switch(funName){
    case "_LazyMan":_LazyMan.call(null,arg || []);break;
    case "_eat":_eat.call(null,arg || []);break;
    case "_sleep":_sleep.call(null,arg || []);break;;
    case "_sleepFirst":_sleepFirst.call(null,arg || []);break;
    default:break;
  }

}
class __LazyMan{
  eat(str){
    subscribe('_eat',str)
    return this;
  }
  sleep(time){
    subscribe('_sleep',time)
    return this;
  }
  sleepFirst(time){
    subscribe('_sleepFirst',time)
    return this;
  }

}
function LazyManLog(str){
  console.log(str)
}
function _LazyMan(str){
  LazyManLog('Hi This is '+ str +' !')
  publish();
}
function _eat(str){
  LazyManLog('Eat '+ str +' ~')
  publish();
}

function _sleep(time){
  setTimeout(function(){
    LazyManLog('Wake up after '+time)
    publish();
  },time*1000)
}
function _sleepFirst(time){
  setTimeout(function(){
    LazyManLog('Wake up after '+time)
    publish();
  },time*1000)
}

var LazyMan = function(str){
  subscribe('_LazyMan',str)
  setTimeout(function(){
    publish()
  },0)
  return new __LazyMan()
}

// LazyMan("Hank").eat("dinner")
// LazyMan("Hank").sleep(10).eat('dinner');
// Hi!This is Hnk!
// //等待10秒..
// Wake up after 10
// Eat dinner~
LazyMan("Hank").sleepFirst(5).eat("supper")