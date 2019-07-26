/**

 */

/**
 1、一个promise有三个状态 pendding,reject,resolve 
 2、有两个方法resolve,reject
 3、有一个then方法
 4、有一个all 方法
 5、race方法
 6、finally方法
 */
function Promise(executor) {
  // self上挂载当前状态
  let self = this;
  self.status = "pendding";
  // this上挂载resolve的返回值
  self.resolveArg = undefined;
  // this上挂载reject的返回值
  self.rejectArg = undefined;

  self.resolveArr = []
  self.rejectArr = []

  let resolve = resoveValue => {
    if(self.status === 'pendding'){
      // 赋值状态 赋值返回结果
      self.status = "resolved";
      self.resolveArg = resoveValue;
      self.resolveArr.forEach((fn) => {
        fn(resoveValue)
      })
    }
  };
  let reject = rejectValue => {
    if(self.status === 'pendding'){
      self.status = "rejected";
      self.rejectArg = rejectValue;
      console.log(self.rejectArr)
      self.rejectArr.forEach((fn) => {
        fn(rejectValue)
      })
    }
  };
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
// then上有两个参数，两个参数都是函数
Promise.prototype.then = function(resolveFn, rejectFn) {
  let self = this;
  if (self.status === "resolved") {
    console.log('状态变成：resolved')
    // 如果状态是resolved，调用resolveFn方法，传入返回值
    resolveFn(self.resolveArg);
  }

  if (self.status === "rejected") {
    console.log('状态变成：rejected')
    // 如果状态是resolved，调用resolveFn方法，传入返回值
    rejectFn(self.rejectArg);
  }
  // 如果状态是pennding，
  // 这地方的意思是：如果executor中有像setTimeout类似的定时任务，程序是不会马上执行resolve的。
  // 需要等的话，上面的两个判断就进不去，也就是此时的状态只能是pendding
  // 不会立刻执行executor,那么self.resolveArr 和 self.rejectArr 就要存入对象
  // 而且不能把这个方法放到上面
  if(self.status === "pendding"){
    console.log('状态延迟进来了：')
    self.resolveArr.push(resolveFn)
    self.rejectArr.push(rejectFn)
  }
};

let p = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(100),2000)
  reject(100)
});

p.then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);
