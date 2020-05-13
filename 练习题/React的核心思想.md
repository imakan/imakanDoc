在内存中构建一份虚拟DOM,然后数据变化的时候，setState,得到一颗新树，然后使用diff算法，对比两个node,得到变化的部分，我们称为patch,将这些patch放入队列，等到合适的时间，mutatioObserver的时候。批量更新这些dom

react虚拟dom的reconciler阶段

reconciler阶段：官方解释就是，react会自上向下遍历数据，在内存中生成一个Virtual dom，然后通过diff算法，将变化的patch到队列，等到更新，

stack reconcliler 和现在的 fiber reconciler.
stack reconciler 的一个特点就是，因为实在内存中进行遍历循环的，所以一旦开始就没办法停止，将一直占用主线程的时间，那么用户交互 动画任务都没办法及时处理。

为什么卡顿 这里要说明一下，我们日常的浏览器是60赫兹的，也就是一秒钟刷新60次，平均到每一帧的时间是 1000/60的话就是 一帧需要16ms


当有更新任务的时候，不会马上去做Diff操作的，会把当前的更新放入到一个队列中，然然后交给调度系统去处理。调度系统会根据当前的进程使用情况去处理这次updateer，为了实现这个特定使用了requestIdelCallback


# fiber 如何工作的

1、ReactDOM.render() 和setstate的时候开始更新
2、将创建的patch 放入到队列中，等待调度系统调度
3、使用requestidleCallback在空闲时间去执行任务
4、从根节点开始遍历fiber node,并且构建wokeInprogressTree
5、生成effectList
6、根据effectList 去更新dom