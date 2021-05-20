/**
 * 实现一个promise
 * promise 接受一个excutor ,excutor 有两个参数 resolve,reject
 * promise中状态有三个  PENDING ,FULFILLED,REJECTED
 *  声明value  纪录调用成功的值，
 *  声明reason 纪录调用失败的值
 *  内部还有一个then方法， 接受两个函数参数 一个是onFulfilledFn,一个是onRejectFn,判断状态调用不同的参数函数
 *
 * 有异步的情况，
 *  提供两个队列，一个是fulfilledArr 纪录（由于存在异步情况，比如setTimeout，会先调用then方法，所以在then方法中需要将OnFulFilledFn存起来，然后在resovel函数中调用）
 * 一个是rejectFnArr
 *
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  private status: string | undefined;
  private value: string | undefined;
  private reason: string | undefined;
  private rejectArr: any[];
  private fulfillArr: any[];
  public constructor(excutor: Function) {
    this.status = PENDING;
    const resolve = (value: string) => {
      if (this.status === FULFILLED) {
        this.status = FULFILLED;
        this.value = value;
        this.fulfillArr.forEach((fn) => fn());
      }
    };

    const reject = (reason: string) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.rejectArr.forEach((fn) => fn());
      }
    };
    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  public then(fulfillfn: Function, rejectfn: Function) {
    if (this.status === FULFILLED) {
      fulfillfn(this.value);
    }
    if (this.status === REJECTED) {
      rejectfn(this.reason);
    }
    if (this.status === PENDING) {
      this.fulfillArr.push(() => {
        fulfillfn(this.value);
      });
      this.rejectArr.push(() => {
        rejectfn(this.reason);
      });
    }
  }

  public all(value: any[]) {
    if (!Array.isArray(value)) {
      throw "传入数组";
    }
    return new Promise((resolve, reject) => {
      let resultArr = [];
      let orderIndex = 0;
      const processResultByKey = (value: any, num: number) => {
        resultArr[num] = value;
        if (resultArr.length === orderIndex++) {
          resolve(resultArr);
        }
      };
      value.forEach((promiseFn, index) => {
        if (typeof promiseFn === "function") {
          promiseFn().then(() => {
            processResultByKey(value, index);
          }, reject);
        } else {
          processResultByKey(value, index);
        }
      });
    });
  }
}
