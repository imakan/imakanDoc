# 概览

定义`React`组件可以以类或者函数的方式，定义为类的组件目前提供更多特征。继承`React.Component`

在`React.Component`子类中，必须定义唯一方法叫`render()`。其他的方法都是可选的。

**注意在`React Component`中，代码重用主要是通过组合而非通过继承**


#  组件生命周期

## 装载

这些方法会按照下列顺序，在组件实例被创建并插入`DOM`中被调用

+  constructor()
+  static getDerivedStateFromProps()
+  render()
+  componentDidMount()


## 更新

+ static getDerivedStateFromProps()
+ shouldComponentUpdate()
+ render()
+ getSnapshotBeforeUpdate()
+ componentDidUpdate()


## 卸载

当一个组件被从DOM中移除时，该方法被调用

+ componentWillUnmount()

## 错误处理

当任何一个子组件在渲染中，在一个会生命周期方法中，或者在构造函数中发生错误时，这些方法会被调用

+ `static getDerivedStateFromError()`

+ `componentDidCatch()`

## 其他`API`

每一个组件还提供了其他的`API`

+ `setState()`

+ `forceUpdate()`

### 类属性

+ `defaultProps`：默认属性

+ `displayName`： 类的显示名字

### 实例属性

+ `props`

+ `state`


# `API`详细介绍


## `render()`

```javascript
render()
```

该方法是类组件的唯一一个必须要实现的方法，其他方法都是可选的

`this.props`和`this.state`

在`render()`中，并返回以下类型之一：

+ `React元素`。通常是由`JSX`创建。比如 `<div />` `<MyComponent />`这类的

+ 数组和`fragments`。可以返回多个元素

+ `Portals`，让你渲染子组件到不同的DOM子树

+ 字符串和数字。被当做DOM中的文本节点

+ `boolean` 或者`null` 什么都不渲染（比如 return test && <Child />模式，其中`test`是布尔值）

`render()`函数应该是纯的，也就是说不应该不改变组件的状态，其每次调用都应该返回相同的结果

如果想要和浏览器交互，我们应该将任务放在`componentWillMount()`中或者其他的生命周期方法中， 一定要保持`render()`方法的纯净性

> 若`SCU`返回`false`,`render()`函数将不会被调用

## `constructor()`

```javascript
constructor(props)
```

**如果你不初始化状态，也不绑定方法，就不需要写`constructor()`**

react组件的`constructor`将会在其装载之前被调用。请注意在`constructor()`函数中调用`super(props)`

在`React`的`constructor`主要用途有两种：

+ 初始化状态，通过赋值给对象`this.state`

+ 绑定函数，通过`this.eventName.bind(this)`

> 在`constructor`中，你不能调用`setState()`,构造函数中我们只能初始化状态，通过赋值`this.state={counter:0}`,在类的其他方法中使用`this.setState()`来改变状态


注意：避免拷贝属性(props)到状态
```javascripr
constructor(props){
  super(props)
  this.state = {color:porps.color}
}
```

这里的问题：1，这里可以直接使用`this.props.color`来代替。2、这地方如果更新新属性`color`不会反映到状态中。这种模式适合于你想故意忽略属性更新。但是这种情况，你可以使用`initialColor`或者defaultColor`


##  `componentDidMount()`

`componentDidMount()`紧跟在组件装载后(被插入到DOM后)，立即被调用。要求的DOM节点初始化应该放在这里。如果我们想要在网络请求数据，我们应该在这里写ajax。

而且这个方法是建立订阅的地方。如果我们在这里订阅了。在`componentWillUnmount()`方法中取消订阅

在`componentDidMount()`中，不建议立即使用`this.setState()`，这里如果立即使用的话，我们的render会调用两次，虽然两次都是在浏览器刷新新屏幕前完成的，但是这会影响性能，这种情况下我们可以使用初始化状态来完成，但是有些情况我们是没办法避免的，比如模态框或者工具提示框


## `componentDidUpdate()`

```
componentDidUpdate(preProps,preState,snapshot)
```

`componentDidUpdate()`紧跟在更新发生后调用。对于初次渲染，不调用此方法

这个方法可以操作`DOM`，同时也可以通过前后属性的对比，判断我们是否请求接口的时机，比如

```javascript
componentDidUpdate(preProps,preState,snapshot){
  if(preProps.userId != this.props.userId){
    this.fetchDate(this.props.userId)
  }
}
```

**注意：如果我们实现了`getSnapshotBeforeUpdate()`，那么我们的`componentDidUpdate()`的第三个参数就是他的返回值，否则就是`undefined`**

如果`shouldComponentUpdate()`返回`false`,我们的`componentDidUpdate()`将不会被调用

## `componentWillUnmount()`
```javascript
componentWillUnmount()
```
`componentWillUnmount()`紧挨着在组件被卸载和销毁之前调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在`componentDidMount`环节创建的订阅。


## `shouldComponentUpdate()`

```javascript
shouldComponentUpdate(nextProps, nextState)
```

`shouldComponentUpdate()`以让React知道是否组件的输出不受当前状态或属性影响

**注意：当组件接收到新属性或者状态是，`SCU`在渲染前被调用，默认是`true`,该方法在初始化的时候 或者 调用了`froceUpdate()`时不会被调用**

> 这个方法主要是用于’性能优化‘，不要依赖它去阻止渲染，尽量使用组件继承`PureComponent`代替手写的`SCU`，`PureComponent`对属性和状态进行浅比较，因而降低你忽略必要更新的机会

`SCU`返回`false`不能阻止子组件当他们的状态改变时重新渲染

## `static getDerivedStateFromProps()`
```javascript
static getDerivedStateFromProps(nextProps,nextState)
```
**组件实例化**和**接受新属性**时将会调用`getDerivedStateFromProps()`，它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新状态

> 如果父组件导致了组件的重新渲染，那么即使没有属性没有更新，这一方法也会被调用，而且调用`this.setState()`通常不会触发`getDerivedStateFromProps()`

## getSnapshotBeforeUpdate()

`getSnapshotBeforeUpdate()`是在最新的渲染输出提交给`DOM`前立即调用。

```javascript
class ScrollingList extends React.Component {
  public listRef = React.createRef()
  getSnapshotBeforeUpdate(prevProps,prevState){
    if(prevProps.list.length < this.props.list.length){
      return this.listRef.current.srollHeight;
    }
    return null
  }
  componentDidUpdate(prveProps,prevState,snapshot){
    if(snapshot !== null){
      this.listRef.current.scrollTop += this.listRef.current.scrollHeight -snapshot;
    }
  }
  render() {
    return (
      <div ref={this.listRef}>{}</div> 
    )
  }
}

```
这里为了支持**异步渲染**，在`getSnapshotBeforeUpdate`中读取`scrollHeight`而不是在`componentWillUpdate`，这点很重要。由于异步渲染，在"渲染"期间(`componentnWillUpdate`和`render()`)和”提交“时期（如`getSnapshotBeforeUpdate`和`componentDidUpdate`）间可能会延迟，如果一个用户在这期间做了像改变浏览器尺寸的事情，从`componentWillUpdate`中读出的`scrollHeight`的值将会是滞后的.


这里说的**异步渲染**:react从16.3开始开始全面转向异步渲染，但是有三个API在异步渲染的时候会造成一些问题
+ `ComponentWillMount`

+ `ComponentWillUpdate`

+ `ComponentWillReceiveProps`
这三个API在将来的版本中可以能会废弃，目前已经加上了`unsafe_`前缀。尽量避免。


## 错误边界

错误边界是一种react组件，能够捕捉在他们的子组件树中任意地方的js错误，记录这些错误，并且显示一个退路UI，组件定义其中的一个方法`componentDidCatch`和`static getDerivedStateFromError()`，这个组件就变成了错误边界

> 错误边界只能用于捕捉在树中低于它的组件，一个错误边界不能捕捉自己内部的错误

## static getDerivedStateFromError()

```javascript
static getDerivedStateFromError()
```
用法：在后代的某个组件发生了错误之后，这个生命周期钩子被调用

其方法接受一个参数，这个参数是被抛出的错误，并且应该返回一个值去更新状态

```javascript
class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = {hasError:false}
  }
  static getDerivedStateFromError(error){
    return {hasError:true}
  }
  render(){
    if(this.state.hasError){
      return <h1>Something went Wrong</h1>
    }
    return this.prop.children;
  }
}
```
## componentDidCatch()
这个钩子函数是子组件抛出有个错误后，被调用，而且允许副作用，也就是可以用来记录错误日志，此钩子函数接收两个参数（err,info)

+ `error`：被抛出的错误

+ `info`:包含有componentStack


```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

## 即将要废弃的生命周期钩子函数


+ `unsafe_componentWillMount()`: 请用`constructor`代替

+ `unsafe_componentWillUpdate()`：请用`static getDerivedStateFromProps()`

+ `unsafe_componentWillReceiveProps()`:请用`static getDerivedStateFromProps()`代替


## 其他API

生命周期方法（React会自动帮我们调用它）

+ setState()：推荐使用 `this.setState((state,prop) => {return counter:state.quantity+1})`

+ forceUpdate()：默认情况下，我们的组件更新取决于state的变化，如果我们想要react强制重新渲染，可以使用`forceUpdate()`
调用forceUpdate()将会导致组件的`render()`方法被调用，忽略本组件的`SCU`，但是会调用子组件所有的生命周期钩子


## 类属性

+ `defaultProps`，为类组件本省定义一些默认的属性

```javascript
demoComponent.defaultProps = {
  color:'blue'
}
```

+ `displayName`：这个主要用在调试阶段


## 实例属性

+ `props`:这个组件中调用者所定义的属性

**`this.props.children`是一个特别的属性，通常在`JSX`中使用**

+ `state`：状态，用于更新组件

**如果一个状态不用于渲染或者数据流，就没必要放在状态中**

记住，永远不要直接改变this.state的值