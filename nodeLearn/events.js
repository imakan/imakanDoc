/**
 * 大多数Node.js核心API都采用管用的异步事件驱动，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）
 * 例如：net.Server对象会在每次有新连接时触发事件：fs.ReadStream会在文件打开时触发事件；流对象会在数据可读时触发事件
 * 所有能触发事件的对象都是EventEmitter类的实例，这些对象开放了一个eventEmitter.on()函数，允许将一个或多个函数绑定到会被对象触发的命名事件上
 */

const EventEmitter = require('events')
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter()
myEmitter.on('event', (a, b) => {
  console.log(a, b, this)
})
myEmitter.emit('event', 'a', 'b')
myEmitter.once('once',() => {
  console.log('只触发一次')
})
myEmitter.emit('once')
myEmitter.emit('once')

const sym = Symbol('symbol');
myEmitter.on(sym, () => {console.log(myEmitter.eventNames())});

myEmitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = myEmitter.rawListeners('log');
const logFnWrapper = listeners[0];
logFnWrapper.listener()
console.log(logFnWrapper)
logFnWrapper();
myEmitter.on('log', () => console.log('log persistently'));
// console.log(logFnWrapper)

//  rawListener()在运行once注册的函数时，是不unbind  once 注册的函数的
//  也就是rawListener在运行once,once还存在


