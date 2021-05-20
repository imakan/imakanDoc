/**
 * 实现一个带并发限制的 promise 异步调度器
 * 题目：
 * JS 实现一个带并发限制的异步调度器 Scheduler，
 * 保证同时运行的任务最多有两个。完善下面的代码中的 Scheduler 类，使得一下程序能正确输出。
 * 实现思路：
 *  已知条件，
 * 提供了 timeout（sleep） 方法
 * 提供了类方法add 方法 传入一个定时器方法，返回一个promise方法，执行promise中的resolve
 * 调用addTask方法 传入时间戳和内容
 */
class Scheduler {
  private count: number;
  private queue: any[];
  public constructor() {
    this.count = 0;
    this.queue = [];
  }
  add(promiseCreator: () => Promise<unknown>) {
    let printFn: any;
    const execFn = () => {
      this.count++;
      promiseCreator().then(() => {
        this.count--;
        printFn();
        // 从队列中取出一个值 执行
        if (this.queue.length) {
          this.queue.shift()();
        }
      });
    };
    if (this.count < 2 && this.queue.length === 0) {
      // 数量小于2执行任务
      execFn();
    } else {
      // 否则存入队列
      this.queue.push(execFn);
    }
    return new Promise((resolve) => {
      printFn = resolve;
    });
  }
}

const scheduler = new Scheduler();

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
const addTask = (time: number, order: string) => {
  /**
   * add 传入一个fn () => Promise<unknown>,返回一个promise
   */
  scheduler.add(() => sleep(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms 时，2完成，输出2，任务3进队
// 800ms 时，3完成，输出3，任务4进队
// 1000ms 时，1完成，输出1
