`es6`:import React from 'react'
`es5`:var React = require('react')

# Component
React组件可以让你把UI分割为独立，可复用的片段，并将每一段视为相互独立的部分，React组件可以通过继承`React.Component`或者`React.PureComponent`

# Transforming Elements

`React`提供了几个API用于操作元素

+ `cloneElement()`

+ `isValidElement()`

+ `React.Children`


# Fragments

`React.Fragments`是`<></>`的语法糖，可以添加key refs等属性

# Refs

+ `React.createRef`

+ `React.forwardRef`

#  详细介绍

## `React.Component`

`React.Component是React组件的基类`


## `React.PureComponent`

`React.Component`和`React.PureComponent`的区别：`React.PureComponent`实现了`shouldComponentUpdate(SCU)`的，采用对属性和状态的浅比较的方式。

**注意：如果React组件的render()函数在给定相同的`props`和`state`下渲染为相同的结果，在某些场景下你可以使用`React.PureComponent`来提升性能**

> `React.PureComponent`的`SCU`只会对对象进行浅对比，如果对象包含复杂的数据结构，他可能会因深层的数据而产生漏报判断，仅当你知道拥有的是简单的属性和状态，才去继承`PureComponent`，或者在你知道深层的数据结构已经发生改变时，你主动调用`forceUpdate()`。或者考虑使用不可改变对象来促进嵌套数据的快速对比。而且`React.PureComponent`的`SCU`不会区域更新子组件的属性，一定要确保子组件是纯组件。


## `React.memo`

`React.memo`是一个`HOC`(高阶组件)。它和`React.PureComponent`一样，但是他是函数式组件


## `createElement()`

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```
创建并返回`React`元素，第一个参数，可以是一个标签、字符串、函数或者类，或者是一个`React.Fragment`，`React.DOM`提供了`DOM`组件的`React.createElement()`的便捷包装。举个例子`React.DOM.a(...)`是`React.createElement('a',...)`的一个便捷包装。


## `cloneElement()`

```javascript
React.cloneElement(
  element,
  [props],
  [...children]
)
```

克隆并返回一个新的React元素（React Element）,请使用第一个参数作为起点。生成的元素将拥有原始元素的props与新props的浅合并。新的子级会替换现有的子级


## `isValidElement()`

```javascript
React.isValidElement(object)
```
验证对象是否是一个React元素，返回true或者false


## `React.Children`

`React.Children`提供了处理`this.props.children`这个不透明数据结构的工具，是一个数组

```javascript
React.Children.map(children, function[(thisArg)])  // 遍历
React.Children.forEach(children, function[(thisArg)]) // 遍历
React.Children.count(children)  // 计算组件总数
React.Children.only(children) // 验证children只有唯一一个孩子并返回 否则抛出错误
React.Children.toArray(children)
```

## `React.Fragment`

`React.Fragment` 可以让一个组件返回多个元素，而不创造一个额外的DOM元素

```javascript
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```


## `React.createRef`


## `React.forwardRef`

创建一个React组件， 该组件的ref可以向它下面的任意一个子组件传递ref

## `React.lazy`

```javascript
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

## `React.Suspense`

组件未显示时，显示延迟加载

```javascript
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
```