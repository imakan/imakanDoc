**在`react`中，所有的DOM特性和属性（包含事件处理函数）都应该是小驼峰命名法**


## 属性的不同

#### dangerouslySetInnerHTML 


```javascript
function createMarkup(){
  return {__html:'asdada'}
}
function myComponent (){
  return <div  dangerouslySetInnerHTML = {createMarkup}/>
}
```

## htmlFor
因为`for`是在`javascript`中的一个保留字，`React`元素使用`htmlFor`代替。

## onChange


## selected

## style

属性使用小驼峰命名法

```javascript
const divStyle = {
  color:'blue',
  backgroundImage: 'url(' + imgUrl + ')',
}
function IComponent(){
  return <div style={divStyle}></div>
}
```

注意：样式不能自动补全前缀，需要根据不同的浏览器，手动补全前缀`Webkit`、`ms`

> 供应商前缀除了`ms`，都应该以大写字母开头


## suppressContentEditableWarning


## value

设置`input`组件以及`texterea`组件的值，受控组件，非受控组件用`defaultValue`