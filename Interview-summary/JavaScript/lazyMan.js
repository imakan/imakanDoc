//运用发布订阅模式--又称观察者模式
let taskList = []; // 任务队列
/**
 * 订阅模式
 * 参数类型设置为json,funName:方法名字，args:传入参数
 */
let subscribe = function () {
  if (arguments.length == 0) throw new Error("subscribe参数为空");
  let params = {};
  let arg = [].slice.apply(arguments)
  params.funName = arg[0]
  params.args = arg.slice(1);
  if (params.funName == 'in_sleepFirst') {
    taskList.unshift(params)
  } else {
    taskList.push(params)
  }
}
/**
 * 发布模式
 * publish
 */
let publish = function () {
  if(taskList.length == 0) return false;
  let option = taskList.shift()
  let funName = option.funName;
  let args = option.args;
  switch(funName){
    case 'in_lazyMan':in_lazyMan.apply(null,args); break;
    case 'in_sleep':in_sleep.apply(null,args); break;
    case 'in_eat':in_eat.apply(null,args); break;
    case 'in_sleepFirst':in_sleepFirst.apply(null,args); break;
    default:break;
  }
}

/**
 * LazyMan类
 * 链式调用---return this
 */
class _LazyMan {
  eat(str) {
    subscribe('in_eat',str);
    return this
  }
  sleep(time){
    subscribe('in_sleep',time);
    return this
  }
  sleepFirst(time){
    subscribe('in_sleepFirst',time);
    return this
  }
}
/**
 * 打印函数
 */
function LazyManLog(str){
  console.log(str)
}

/**
 * 具体的执行函数
 */
function in_lazyMan(str){
  LazyManLog("Hi! This is " + str + '!');
  publish();
}
function in_eat(str){
  LazyManLog("Eat " + str +" ~")
  publish();
}
function in_sleep(time){
  setTimeout(()=> {
    LazyManLog("Wake up after " + time);
    publish();
  },time*1000)
}
function in_sleepFirst(time){
  setTimeout(()=> {
    LazyManLog("Wake up after " + time);
    publish();
  },time*1000)
}

let LazyMan = function(str){
  subscribe('in_lazyMan',str);
  //调用macrotasks
  setTimeout(function(){
    publish();
  },0)
  return new _LazyMan();
}
LazyMan("Hank").sleepFirst(5).eat("supper")
console.log(taskList)