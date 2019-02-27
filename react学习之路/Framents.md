# Fragments 
React中一个常见模式是为一个组件返回多个元素，Fragments可以让你聚合一个子元素列表，并且不再DOM中增加额外节点

`Framents`看起来像空的JSX标签：
```javascript
render(){
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  )
}
```
使用Fragments，我们就避免了无用的标签，比如：
```javascript
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}

class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

我们在render()的时候，输出结果

```html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```
这里就多出来一个<div></div>标签，所以我们使用`Fragments`

# 清晰地形式

另外一种使用片段的方式是使用React.Fragment组件，React.Fragment组件可以在React对象上使用，

**注意：<></>是<React.Fragment />的语法糖**

# 带key的Fragments

`<></>`语法不能接受键值或者属性

如果你需要一个带key的片段，你可以直接使用<React.Fragment />,一个使用场景是映射一个集合为一个片段数组，比如：

```javascript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

`key`是唯一可以传递给Fragment的属性。在将来，我们可能增加额外的属性支持，比如事件处理