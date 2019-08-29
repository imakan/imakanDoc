/**
 * 评测题目:
 * 编写一个简单的自定义事件处理器
 * 1. 具备 on 方法绑定事件
 *  2. 具备 off 方法解绑事件
 */

var EventEmitter = function () {
  this._events = {}
}
EventEmitter.prototype.getEvent = function (eventName) {
  return this._events[eventName] || []

}
EventEmitter.prototype.on = function (eventName, listener) {
  if (!eventName || !listener) return;
  this._events[eventName] = this._events[eventName] || []
  var listeners = this._events[eventName]
  var listenerWrap = typeof listener === 'object'
  listeners.push(listenerWrap ? listener : {
    listener: listener,
    once: false
  })
  //链式调用
  return this;
}

EventEmitter.prototype.emit = function (eventName, args) {
  if (!eventName) return;
  var listeners = this.getEvent(eventName)
  for (var i = 0, len = listeners.length; i < len; i++) {
    var listener = listeners[i]
    listener.listener.call(null, args || [])
    this.getEvent('*')[0].listener.call(null, args || [])
    if(listener.once){
      this.off(eventName)
    }
  }
  return this;
}

EventEmitter.prototype.off = function(eventName){
  if(!eventName) return false;
  var events = this._events
  for(var i in events){
    if( i == eventName){
      delete events[i]
      // console.log('解除' + eventName + ' 事件绑定')
      break;
    }
  }
  return this;
}
EventEmitter.prototype.once = function(eventName, listener){
  this.on(eventName,{
    listener:listener,
    once:true
  })
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