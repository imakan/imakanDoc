// const a = function () {};
// const b = a.bind(moudle);
// b();

Function.prototype.bind1 = function (context) {
  let self = this;
  let F = function () {};
  F.prototype = self.prototype;
  let outArgs = Array.prototype.slice.call(arguments, 1);
  bound = function () {
    let innerArg = Array.prototype.slice.call(arguments);
    let args = outArgs.concat(innerArg);
    self.apply(this instanceof F ? this : context, args);
  };
  bound.prototype = new F();
  return bound;
};

Function.prototype.bind = function () {
  let thatFun = this;
  let thatArg = Array.prototype.slice.call(arguments, 1);
  return function () {
    let innerArg = Array.prototype.slice.call(arguments);
    let arg = thatArg.concat(innerArg);
    thatArg.apply(thatFun, arg);
  };
};
