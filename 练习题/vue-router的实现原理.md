# 问：vue-router中的两种实现

+ 1、利用URL中的hash("#")
+ 2、利用History interface 在html5中的新增的方法

在vue中是通过mode这一参数控制路由的实现模式的


+ hash虽然在URL中，但是不会包括在HTTP请求中，他是用来指导浏览器动作的，对服务端完全无用的，因此，改变hash不会重新加载页面额
+ 可以为hash的改变添加监听事件，’hashchange‘事件
+ 每一次改变hash（window.lcoation.hash），都会在浏览器的访问历史中增加一个记录
  

主要是调用hashHistory.push,然后调用transitionTo方法，然后调用pushHash(fullPath),然后pushHash中在赋值给window.location.hash

那刚更新视图是怎么实现的呢，其实是transitionTo这个方法，里面调用了updateRout方法，这个方法里面执行了app._route = route

总结一下

```javascript
$router.push -> HashHistoryPush -> History.transitionTo -> Hisory.updateRoute ->  app._route = router  -> vm.$render
```

# Hashhistory.repalace和push

replace和push不一样，不是往栈顶新增一条记录，而是替换掉当前的路由

如果是直接在浏览器中输入hash值的话，其实是vue的一个方法吧，setUpListener()里面调用的是window.addEventListener('hashChange'),然后动态replace掉当前的地址

history 和hash的不同

1、history 可以设置与当前url同源的任意URL，而hash只能改变#后面的值
2、pushstate设置与当前url相同是，会在栈顶中新增一条，而hash如果是相同的改变，不会有任何变化
3、pushstate可以通过stateObject添加任意类型的数据到记录中，而hash只能存字符串
4、pushstate可以存额外的title

如果是加载文件系统怎么办

1、要采用hash模式，为什么 
因为history模式获取path是分割window.location.pathname，所以在切割的时候，切割不到/
而hash的话，我记得是在#强行插入后面强行插入/ replaceHash()