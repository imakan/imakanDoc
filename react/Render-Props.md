# render props

`render props`是指一种在React组件之间使用一个值为函数的prop,然后在react组件间共享代码的简单技术

带有render prop的组件返回一个react元素的函数，并调用该函数，而不是实现紫的渲染逻辑

```javascript
<DataProvider render={(data) => (
  <h1>Hello{data.target}</h1>
)} />
```


应用场景：
1、现在有一个鼠标移动显示鼠标坐标点的组件
2、有一个猫的图片需要跟随鼠标的改变而变化，那是不是我们要把猫的组件写到鼠标组件内部，现在应用this.props.render(this.state)我们就可以使用render Props,
代码逻辑：
```javascript
class Mouse extends React.Component {
  construction(props){
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove (event){
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }
  render(){
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
       {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    )
  }
  
}
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} />
      </div>
    )
  }
}
```

**render props就是告诉子组件需要渲染什么东西。一个组件用来了解要渲染什么内容的函数 prop**



```javascript
function withMouse (Component){
  return class extends React.Component {
    render(){
      return (
        <Mouse render={mouse => (
          <Component {...this.props}  mouse={mouse}/>
        )}
        />
      )
    }
  }
}
```

不是render prop才叫Render-Props技术，只要让组件知道什么需要渲染的任何函数porp，都叫Render-Props技术，
比如还有 children props


**children props不需要将方法写到attribute中，可以直接放到元素内部**比如：
```javascript
<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>

// 等同于

<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```
建议：我们在`render=`后面可以定义一个 prop 作为实例方法，`render = {this.handleState}`而不是`render= {/**(data) => (节点) **/}`