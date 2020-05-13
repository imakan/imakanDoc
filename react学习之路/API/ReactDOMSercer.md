# 概述

`ReactDOMServer类可以让你在服务端渲染你的组件`

+ `renderToString`

+ `renderToStaticMarkup`

# API介绍

## `renderToString()`
```javascript
ReactDOMServer.renderTostring(element)
```

将一个React元素渲染为HTNL，服务端渲染用`React.hydrate()`

## `renderToStaticMarkup()`

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

创建一个不含有额外属性的html,如果只是生成简单的静态页面，这个很有用