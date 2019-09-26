# 事件循环

1、所有的同步任务都会有一个执行上下文，叫执行栈

2、除了执行栈以外，还有一个任务队列，所有的异步任务执行结果都会存在任务队列中

3、当主线程上所有的同步任务都执行玩，执行栈会遍历所有的任务队列，执行栈一次执行

4、主线程不断地重复上面的步骤


# `Microtasks`与`Macrotasks`

任务队列又包含 `Microtasks` 与 `Microtasks`

`Microtasks` 与 ` Microtasks` 的API包含

``` es6
`Microtasks`：promise、process.nextTick、Object.observer、MutationObserver
```

``` es6
`Macrotasks`：setTimeout、setImmediate、setInterval、Script整体代码、ui rendering、I/O
```