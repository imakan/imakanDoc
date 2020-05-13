/**
 * 实现一个EventEmeitter
 * 发布订阅模式
 */

class EventEmeitter {
  constructor() {
    this._events = this._events || new Map();
    this._maxListeners = this._maxListeners || 10;
  }
}
// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler = this._events.get(type);
  if (args.length > 0) {
    handler.appley(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};


