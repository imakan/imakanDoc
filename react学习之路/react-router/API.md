# `Props`

## children 

一个或者多个的`Route`或者`PlainRoute`。当history改变时，`<Router>`会匹配出`Route`的一个分支

## routes

children的别名


## history

Route监听的history对象，由history包提供

## stringifyQuery(queryObject)

一个用于把Link或者调用`transitionTo`函数的对象转化为`URL query`字符串的函数

## parseQueryString(queryString)

一个用于把query字符串转化成对象并传递给route组件props的函数。

## onError(error)

当路由匹配到时，也有可能会抛出错误，此时你就可以捕获和处理这些错误。通常，它们会来自那些异步的特性，

