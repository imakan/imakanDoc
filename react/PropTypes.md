# 使用PropTypes进行类型检查

**注意React.PropTypes自React V15.5起已经弃用，请使用prop-types库代替**

如果用了ts 就不用这个了

react内置了一部分类型检查功能。要检查组件的属性，你需要配置特殊的propTypes属性：
```JavaScript
import PropTypes from 'prop-types'
class Greeting extends React.Component {
  render () {
    return (
      <h1>Hello,{this.props.name}
    )
  }
}
Greeting.propTypes = {
  name:PropTypes.strig
}
```
PropTypes包含一整套验证器，可用于确保你接受的数据是有效的，在这个示例中，我们使用了PropTypes.string。当你给属性传递了无效值时，JavaScript控制台将会打印警告，出于性能原因，propTypes只在开发模式下进行检查

# 限制单个子代

使用PropTypes.element你可以只传递一个子代

```JavaScript
import PropTypes from 'prop-types'
class MyComponent extends React.Component {
  render() {
    const children = this.props.children
    return (
      <div>
        {children}
      </div>
    )
  }
}

MyComponent.propTypes = {
  children:PropTypes.element.isRequired
}

```

# 属性默认值

你可以通过配置defaultProps为props定义默认值

```JavaScript
class Greeting extends React.Component {
  render () {
    return (
      <h1>Hello,{this.props.name}</h1>
    )
  }
}
// 为属性指定默认值
Greeting.defaultProps = {
  name:'Stranger'
}
// 渲染"Hello,Strnger":
ReactDom.render (
  <Greeting />,
  document.getElementById('root')
)
```


