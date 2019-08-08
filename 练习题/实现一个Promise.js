/**
 1、一个promise有三个状态 pendding,reject,resolve 
 2、有两个方法resolve,reject
 3、有一个then方法
 4、有一个all 方法
 5、race方法
 6、finally方法
 */
// function Promise(executor) {
//   // self上挂载当前状态
//   let self = this;
//   self.status = "pendding";
//   // this上挂载resolve的返回值
//   self.resolveArg = undefined;
//   // this上挂载reject的返回值
//   self.rejectArg = undefined;

//   self.resolveArr = [];
//   self.rejectArr = [];

//   let resolve = resoveValue => {
//     if (self.status === "pendding") {
//       // 赋值状态 赋值返回结果
//       self.status = "resolved";
//       self.resolveArg = resoveValue;
//       self.resolveArr.forEach(fn => {
//         fn(resoveValue);
//       });
//     }
//   };
//   let reject = rejectValue => {
//     if (self.status === "pendding") {
//       self.status = "rejected";
//       self.rejectArg = rejectValue;
//       console.log(self.rejectArr);
//       self.rejectArr.forEach(fn => {
//         fn(rejectValue);
//       });
//     }
//   };
//   try {
//     executor(resolve, reject);
//   } catch (e) {
//     reject(e);
//   }
// }
// // then上有两个参数，两个参数都是函数
// Promise.prototype.then = function(resolveFn, rejectFn) {
//   let self = this;

//   if (self.status === "resolved") {
//     console.log("状态变成：resolved");
//     // 如果状态是resolved，调用resolveFn方法，传入返回值
//     resolveFn(self.resolveArg);
//   }

//   if (self.status === "rejected") {
//     console.log("状态变成：rejected");
//     // 如果状态是resolved，调用resolveFn方法，传入返回值
//     rejectFn(self.rejectArg);
//   }

//   //
//   // 这地方的意思是：如果executor中有像setTimeout类似的定时任务，程序是不会马上执行resolve 或者reject的。
//   // 此时代码紧接着执行then方法，发现resolve方法以及reject方法都没机会得到执行，那么状态是初始化的值 pendding
//   // 那么self.resolveArr 和 self.rejectArr 存入then里面的两个参数对象
//   // 等到定时器结束，开始执行resolve或者reject方法后，把then里面的参数对象拿出来，开始执行
//   if (self.status === "pendding") {
//     console.log("状态延迟进来了：");
//     self.resolveArr.push(resolveFn);
//     self.rejectArr.push(rejectFn);
//   }

// };

// 需求 实现一个promise
// promise 有三个状态
// 有一个then方法，实现基本的方法
// then方法有两个参数
// Promise有个执行函数 executor
// 执行器有两个方法

function Promise(executor) {
  let self = this;
  this.resolveValue = "";
  this.rejectValue = "";
  // 定义Promise的状态 有三个状态 penning resolved rejected
  this.status = "penning";
  this.resolveArr = []
  this.rejectArr = []
  function resolve(resolveValue) {
    // 参数就是then方法中的返回值
    // 执行resolve将状态置为resolved
    if (self.status == "penning") {
      self.status = "resolved";
      self.resolveValue = resolveValue;
      self.resolveArr.forEach(fn => {
        fn(self.resolveValue)
      })
    }
  }
  function reject(rejectValue) {
    // 执行reject将状态置为rejected
    if (self.status == "penning") {
      self.status = "rejected";
      self.rejectValue = rejectValue;
      self.rejectArr.forEach(fn => {
        fn(self.rejectValue)
      })
    }
  }
  // 这个地方需要catch下，以防错误
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(resolveFn, rejectFn) {
  let self = this;
  // 如果promise中是异步的话，那怎么办，因为如果是异步的话，then先执行，然后在执行resolve 或者reject中的方法的话，就拿不到我们的值了
  // 所以要先判断当前的状态
  if(self.status === 'penning'){
    // 这个时候进来就一定是异步进来的
    // 讲then中的方法 存起来，等着异步来调用
    // 怎么存呢？ 用this对象存取
    self.resolveArr.push(resolveFn)
    self.rejectArr.push(rejectFn)

  }
  if (self.status == "resolved") {
    // 执行resolve状态的方法,但是需要把参数传进去
    resolveFn(self.resolveValue);
  }
  if (self.status == "rejected") {
    // 执行reject状态的方法，也需要吧参数传进去
    rejectFn(self.rejectValue);
  }
};

let p = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(100),2000)
  // resolve(100);
});

p.then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);
