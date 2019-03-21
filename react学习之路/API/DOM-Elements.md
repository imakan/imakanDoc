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