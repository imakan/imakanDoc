const throttle = (fn, time) => {
  let oldTime = Date.now();
  return function () {
    let currentTime = Date.now();
    if (currentTime - oldTime > time) {
      fn.apply(this, arguments);
      oldTime = currentTime;
    }
  };
};
