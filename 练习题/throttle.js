let throttle = (fn, t) => {
  let timeid;
  return function() {
    let now = new Date();
    if (last && now - last < t) {
      timeid = setTimeout(() => {
        fn.call(this, ...arguments);
      }, t);
    } else {
      last = now;
      fn.call(this, ...arguments);
    }
  };
};

Function.prototype.bind = context => {
  let outArg = Array.prototype.slice.apply(arguments, 1);
  let self = this;
  let F = function() {};
  F.prototype = self.prototype;
  bound = function() {
    let innerArg = Array.prototype.slice.apply(arguments);
    let arg = innerArg.concat(outArg);
    self.apply(this instanceof F ? this : context, arg);
  };
  return bound;
};
