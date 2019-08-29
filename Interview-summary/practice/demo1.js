var arr = [9, 3, 4, 2, 6, 7, 5, 1]
//冒泡排序
var bubble = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr;
}
// var _arr = bubble(arr)


//选择排序，选择出来最小的替换
var selete = function (arr) {
  var min, temp;
  for (var i = 0; i < arr.length; i++) {
    min = i;
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    temp = arr[i];
    arr[i] = arr[min]
    arr[min] = temp
  }
  return arr
}
// var _arr = selete(arr)

//快速排序，用的是分治思想，递归，和二分查找一个思路，只不过二分查找是有序的数组
var quick = function (arr) {
  if (arr.length < 2) {
    return arr;
  }
  var left = [];
  var right = [];
  var mid = arr.splice(Math.floor(arr.length / 2), 1)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > mid) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quick(right).concat(mid).concat(quick(left))
}
// var _arr = quick(arr)


//插入排序。将数组分成两个，一个为有序数组，一个为待插入数组
var insert = function (arr) {
  var temp = j = 0;
  for (var i = 1; i < arr.length; i++) {
    temp = arr[i]
    j = i - 1;
    while (j >= 0 && temp < arr[j]) {
      arr[j + 1] = arr[j]
      j--;
    }
    arr[j + 1] = temp
  }
  return arr;

}
// var _arr = insert(arr)
// console.log(_arr)

//二分查找法，首先是有序数组

var binarySearch = function (arr, des, start, end) {
  var start = start || 0;
  var end = end || arr.length
  var mid = Math.floor((start + end) / 2)
  if (start == end) {
    return -1
  }
  if (arr[mid] == des) return mid
  if (des > arr[mid]) {
    return binarySearch(arr, des, mid + 1, end)
  } else {
    return binarySearch(arr, des, 0, mid - 1)
  }
}
var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87];
// var mid = binarySearch(arr,4);
// console.log(mid)


//实现一个lazyman
/**
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 */

/**
 * 1、链式调用
 * 2、任务队列
 * 3、发布订阅模式
 * 3、1 传入funName 以及其他的参数
 */
var tasklist = []
var subscribe = function () { //订阅
  var params = [];
  params.funcName = arguments[0];
  params.args = arguments[1];
  if (params.funcName == 'in_sleepFirst') { //入如果是sleepFirst,往数组前推入元素
    tasklist.unshift(params)
  } else {
    tasklist.push(params)
  }
}
var publish = function () { //发布
  if (!tasklist.length) return false;
  var current = tasklist.shift()
  var funcName = current.funcName;
  var args = current.args;
  switch (funcName) {
    case 'in_LazyMan':in_LazyMan.call(null,args);break;
    case 'in_eat':in_eat.call(null,args);break;
    case 'in_sleep':in_sleep.call(null,args);break;
    case 'in_sleepFirst':in_sleepFirst.call(null,args);break;
    default:break;
  }
}
class _LazyMan {
  eat(str) {
    subscribe('in_eat', str)
    return this;
  }
  sleep(time) {
    subscribe('in_sleep', time)
    return this;
  }
  sleepFirst(time) {
    subscribe('in_sleepFirst', time)
    return this;
  }
}

function LazyManLog(str) {
  console.log(str)
}
function in_LazyMan(str){
  LazyManLog('Hi This is '+ str +'!');
  publish()
}
function in_eat(str) {
  LazyManLog('Eat ' + str + '~')
  publish()
}

function in_sleep(time) {
  setTimeout(function(){
    LazyManLog('Wake up after '+time);
    publish();
  },time*1000)
}

function in_sleepFirst(time) {
  setTimeout(function(){
    LazyManLog('Wake up after '+time);
    publish();
  },time*1000)
}

var LazyMan = function(str){ //暴露接口
  subscribe('in_LazyMan',str)
  setTimeout(function(){
    publish()
  },0)
  return new _LazyMan()
}

// LazyMan('“Hank”').sleep(1).eat('“dinner”')
// LazyMan('“Hank”').sleepFirst(5).eat('“supper”')
// LazyMan('“Hank”').eat('“dinner”').eat('“supper”')
// LazyMan('Hank')

//实现二叉树的遍历使用的bfs深度优化 用递归和非递归的算法
var tree = {
  name : '中国',
  children : [
    {
      name : '北京',
      children : [
        {
          name : '朝阳群众'
        },
        {
          name : '海淀区'
        },
                {
          name : '昌平区'
        }
      ]
    },
    {
      name : '浙江省',
      children : [
        {
          name : '杭州市',
          code : 0571,
        },
        {
          name : '嘉兴市'
        },
        {
          name : '绍兴市'
        },
        {
          name : '宁波市'
        }
      ]
    }
  ]
};
//递归
function bfs(tree,name ){
  var stack = [tree];
  if(tree.name == name){
    console.log(tree)
  }else{
    tree.children && tree.children.forEach(node => {
      return bfs(node,name)
    });
  }
}
//使用非递归的方式
function _bfs(tree,name){
  var stact = [tree];
  while(stact.length){
    var current =  stact.pop();
    if(current.name == name){
      return current;
    }else{
      current.children && current.children.forEach(node => {
        stact.push(node)
      });
    }
  }

}

var node = _bfs(tree,'杭州市');
console.log(node)

//实现一个自定义事件订阅发布系统
/**
 * 评测题目:
 * 编写一个简单的自定义事件处理器
 * 1. 具备 on 方法绑定事件
 *  2. 具备 off 方法解绑事件
 */

var EventEmitter = function(){
  this._events = {}
}
EventEmitter.prototype.getEvent = function(eventName){
  return this._events[eventName] || [];
}
EventEmitter.prototype.on = function(eventName,listener){ //事件订阅模式
  if(!eventName || !listener) return false;
  var listeners = this._events[eventName] = this._events[eventName] || [];
  var listenerWrap = typeof listener === 'object';
  listeners.push(listenerWrap?listener:{
    listener:listener,
    once:false
  });
  return this 
}

EventEmitter.prototype.off = function(eventName){
  var event = this._events
  for(var i in event){
    if(eventName == i){
      delete event[i]
    }
  }
  return this;
}
EventEmitter.prototype.once = function(eventName,listener){
  this.on(eventName,{
    listener:listener,
    once:true
  })
  return this;
}
EventEmitter.prototype.emit = function(eventName,args){
  var listener = this.getEvent(eventName);
  for(var i =0;i<listener.length;i++){
    listener[i].listener.call(null,args)
    this.getEvent('*')[0].listener.call(null)
    if(listener[i].once){
      this.off(eventName)
    }
  }
  return this;
  
}

var emitter = new EventEmitter();
emitter.on('foo', function (e) {
  console.log('listening foo event 1', e);
}).on('foo', function (e) {
  console.log('listening foo event 2', e);
}).once('abc',function(e){
  console.log('执行一次once事件', e)
}).on('*', function (e) {
  console.log('listening all events');
});

// emitter.off('foo')
emitter.emit('foo', {
  name: '1'
}).emit('abc',{
  name: '2'
}).emit('abc',{
  name: '3'
})


// 实现throttle和debounce (必会)
// 实现节流函数

var throttle = function(fn,count){
  var first = true;
  var time;
  return function(){
    var self = this;
    var arg = arguments;
    if(first){
      first = false;
      fn.apply(self,arg)
    }
    if(time) return false;
    time = setTimeout(function(){
      clearTimeout(time);
      time = null;
      fn.call(self,arg)
    },count*1000 || 800)
  }
}

