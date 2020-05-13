# Web Component

React和Web组件被用以解决不同的问题，Web组件为可重用组件提供了强大的封装能力，而React则是提供了保持DOM和数据同步的声明库，二者目标互补。作为开发者，你可以随意地在web组件里使用React，或者在React里使用Web组件，或者都有

# 在React中使用Web组件

```javascript
class HelloMessage extends React.Component {
  render(){
    return (
      <div>Hello <x-search>{this.props.name}</x-search>!</div>
    )
  }
}
```

