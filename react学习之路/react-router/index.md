# Switch

`<Switch>`是唯一的是因为它仅仅只会渲染一个路径，如果不使用的话，每个路由都会被匹配到

`<Switch>会匹配到第一个匹配到的，不会往下继续匹配`

## exact(精确)

如果不写`exact`,`<Switch>`只会匹配到第一个`/`,不会继续往下走。如果写了这个，所以我们在 `<Route path="/" render={() => (<div>页面1</div>)}> `，只有`URL`和`path`精准对比`Route`才会渲染

# 跳转前确认

## 生命钩子 `routerWillLeave`

如果我们使用ES6类，你可以借助`react-mixin`包将`Lifecycle` `mixin`添加到组件中，
如果你想在一个深层嵌套的组件中使用`routerWillLeave`钩子，只需要在`route`组件中引入`RouteContext`mixin，这样就会把`route`方到context中