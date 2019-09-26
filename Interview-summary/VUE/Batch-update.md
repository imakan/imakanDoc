# Batch Update

1、Virtual Dom虽然减少了浏览器的性能损失，但是在VUE中，整体的diff/patch也是一个非常‘昂贵’的操作，怎么样在保证view的实时更新的情况下，我们怎么去减少diff/patch的次数呢。这时候Batch update（批量更新）就起到了作用


## 什么是Batch update

Batch update 是 批量更新。在MV*框架中，Batch update可以理解为同一时间端将model的修改批量更新到view的机制

Vue的Batch update是借助JavaScript的event loop

```es6
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```


vue实现批量更新主要用到了javascript的event loop,具体实现：当model被修改时，将一个watcher推入到，queue中,与此同时还会在异步队列中添加一个task来flush当前update queue，这样当前task的其他watcher会被推到同一个tasks，当前的task执行完后，异步队列的下一个task会立即执行，update queue会被flush



***vue是如何利用microTask来实现batch update***

答：利用了MutationObserve API和proimise如果环境不支持 fallback setTimeout