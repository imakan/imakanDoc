# React的核心思想

不管是React16之前还是现在的最新的(16.9)基本思想就是:React会在内存中生成一份Virtual DOM，当数据变化的时候，也就是setState的时候，在生成一份新的Virtual DOM，然后两个DOM树，进行diff，得到一份change，这个change我们叫patch，把patch入队列，最终批量更新这个队列到dom中。


# React16之前的不足

React在setState和render的时候分为两个阶段

## Reconciler阶段

React会自上向下递归遍历，生成一个Virtual DOM，在setState的时候生成一个新的Virtual DOM，然后diff两个dom，得到patch放入队列

## render阶段

调用宿主主机的API渲染


在Reconciler阶段的时候，JS会递归node节点，当节点比较大的时候，JS主程会一直被占用，得不到释放，这样的话在前端看来就有卡顿现象，为什么会出现卡顿现象呢，这里要将下60赫兹的情况

一帧要干6件事情

1、用户交互
2、js解析
3、帧开始，也就是窗口变化
4、requestAnimationFram
5、布局
6、绘制

# Fiber 

我理解他是一种数据结构，一个堆栈帧，原来那种方式是没办法去停止或者阻断js的执行的，所以，动画呀，用户交互呀会显得比较卡顿，他实现了自己的调度系统，在每个帧之前有空闲时间的时候 利用requestCallback(),创建了inWorkPrcess tree

## Fiber 如何工作的

+ ReactDOM.render() 和 setState的时候开始创建更新
+ 将创建的更新加入任务队列，等待掉队
+ requestIdleCallback空闲时间执行任务
+ 从根节点开始遍历Fiber Node，并且构建WorkProcess Tree
+ 生成EffectList 
+ 根据EffectList更新DOM
