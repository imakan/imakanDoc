# 概述

我们的事件处理器将会接受SynctheticEvent的实例，和原生浏览器的事件是一样的

##  事件池

`SyntheticEvent`是被池化的，这意味着`SyntheticEvent`对象将会被重用。在调用事件回调之后，所有的属性将会被废弃，也就是我们不能用异步的方式访问事件

```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> 如果想以异步的方式访问事件的属性，你必须在事件回调中调用`event.persist()`方法。这样会在池中删除合成事件，并且允许用户代码保留对事件的引用