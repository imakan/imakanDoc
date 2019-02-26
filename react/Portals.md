# Portals

应用场景：比如我们现在有一个弹出框，或者遮罩层，我们可以使用portal

Portals提供了一种很好的将子节点渲染到父组件以外的DOM节点的方式
```javascript
ReactDOM.createPortal(child,container)
```

> 第一个参数(child)是任何可渲染的React子元素，例如一个元素，字符串或者碎片，第二个参数（container）则是一个dom元素


# 用法

通常讲，当你从组件的render方法返回一个元素，该元素仅能装配DOM节点中离其最近的父元素
```javascript
render(){
  return (
    <div>
      {this.props.children}
    </div>
  )
}
```

然而，有时候将其插入到DOM节点的不同位置也是有用的

```javascript
render(){
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  )
}
```
对于portal的一个典型用例是当父组件有overflow:hidden或者z-index样式，但你需要子组件能够在视觉上“跳出(break out)”其容器


# 通过Portals进行实践冒泡

尽管protal可以被放置在DOM树的任何地方，但在其他方面其行为和普通的React子节点行为一直，无论其子节点是否是portal,上下文特性依然能够如之前一样正确。由于portal仍存在于React树中，而不用考虑其在DOM树中的位置。