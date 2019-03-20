# ReactDOM

## `render()`

```javascript
ReactDOM.render(element,container [,callback])
// 将React元素渲染为DOM元素，返回这个组件的一个引用，但是对于无状态的组件返回null
```

如果这个container也是一个react元素之前渲染的，此时将会为其执行一次更新，并且只会按需改变DOM，以反射最新的React元素

当首次调用`ReactDOM.render()`，我们所有的`DOM`元素都会被替换掉，之后的调用会使得React的DOM差分算法进行高效的更新

在将来的版本中  在服务端渲染 不要使用`ReactDOM.render()`请使用`ReactDOM.hydrate`

## unmountComponentAtNode()

```javascript
ReactDOM.unmountComponentAtNode(container)
//从DOM元素中移除已挂载的React组件，清除他的事件处理和state
```


## findDOMNode()

此函数是在组件已经挂载到DOM中的时候，函数会返回对应的浏览器中生成的DOM元素。不建议使用此函数，用`createRef()`代替

## createPortal
创建一个portal,portal提供了一种将子级呈现到DOM组件层次
