// 实现bind

// let a = some.bind()
// a()
Function.prototype.bind = function (context) {
  let self = this;
  let arg = arguments;
  let outerArg = Array.prototype.slice.apply(arg, 1);
  let F = function () {};
  F.prototype = self.prototype;
  bound = function () {
    let innerArg = Array.prototype.slice.apply(arguments);
    let finalArg = outerArg.concat(innerArg);
    this.apply(this instanceof Function ? this : context, finalArg);
  };
  bound.prototype = F.prototype;
  return bound;
};
