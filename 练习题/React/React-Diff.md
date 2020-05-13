有时候页面更新的时候，diff所花的时间比render所花的时间更长，所以我认为React或者其他的框架的意义是为了提高代码的可维护性，而不是提升性能

https://mp.weixin.qq.com/s/66MxfVmnUevj6VCe0xWG4Q

diff的目的是什么？ 

做diff的主要目的是为了复用节点

React从之前的树状改成现在的单链表数据结构，每一个节点都是Fiber node，而不是之前的dom节点

diff主要是构建workInprocess,得到effectList，然后更新这个patch


key和当前节点类型，决定是否复用节点，可以复用子节点和兄弟节点

