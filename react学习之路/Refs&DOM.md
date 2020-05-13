Refs&DOM

Refs用于访问在render方法中创建的DOM节点或者react元素

在典型的React数据流中，Props是父组件与子组件交互的唯一方式，要修改子组件，你需要使用新的props重新渲染它，但是某些情况下你需要在典型数据流外强制修改子组件，要修改的子组件可以是React组件的实例，也可以是DOM元素，对于这两种情况，React提供了解决办法

# 何时使用Refs
1、处理焦点，文本选择或者媒体控制
2、触发强制动画
3、继承第三方DOM库

**如果可以通过声明式实现，则尽量避免使用refs**

例如，不要在`Dialog`组件上直接暴露`open()`和`close()`方法，最好直接传递`isOpen`属性

# 不要过度使用Refs
如果可以使用state更新组件，尽量避免是用Refs更新组件

> 创建Ref,React.createRef()，通过refs获取react元素，当构建组件时，refs通过被赋值给一个实例的属性。我们就可以在任意的地方
```javascript

// 1、this.refs.myRef.msg
// 2、元素中返回函数 ref = {(ele) => {this.myRef = ele}}
//3、this.ref.myRef.current

class MyComponent extends React.Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```

# 访问Refs
当一个ref属性被传递给一个render函数中的元素时，可以使用ref的`current`属性对节点的引用进行访问

```javascript
const node = this.myRef.current
```

ref的值取决于节点的类型：

+ 当ref属性被用于一个普通的HTML元素时，React.createRef()将接收底层的DOM元素作为他的current属性的值以创建ref

+ 当ref属于被用于一个自定义的组件时，ref对象将接收该组件已挂载的实例作为他的current

+ 不能在函数式组件上使用ref，因为他们没有实例

为DOM元素添加Ref


```javascript
class CustomTextInput extends React.Component {
  constructor (props){
    super(props)
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }
  focusTextInput(){
    this.textInput.current.focus()
  }
  render(){
    return (
      <div>
        <input  ref={this.textInput} type='text' />>
        <input type='button' value='点点点' onClick={this.focusTextInput} />
      </div>
    )
  }
}
```
React会在组件加载时将DOM元素传入current属性，组件卸载时，返回null,ref的更新是在componentDidMount和componentDidUpdate之前

# 为类组件添加Ref
如果我们想要包装上面的CustomTextInput，来模拟挂载之后立即被点击的话，我们可以使用ref来访问自定义输入，并手动调用他的focusTextInput 方法：

这里使用的是声明周期钩子函数`componentDidMount()`

```javascript
// 在自定义组件上面使用ref
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

# 不能在函数是组件上使用ref属性，因为函数式组件没有实例

这里的意思是：我们声明一个函数，里面返回jsx,我们在用classs申明一个组件，在render函数内，调用之前的那个函数，不能在这个函数上使用ref
比如：
```javascript
function MyFunctionalComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // 这将 *不会* 工作！
    return (
      <MyFunctionalComponent ref={this.textInput} />
    );
  }
}
```

ref以及state以及生命周期函数都是在class组件内才能用的， 必须要实例化，否则的话 你只能在函数内定义一个对象 指向空

# 转发Refs或者是传递Refs
对于父组件访问子组件，虽然我们可以向子组件添加ref,但是并不建议这样做，而且如果我们使用的是函数式组建的话，还无效。建议使用的ref传递，也就是ref转发


# 回调refs

想要页面中存在多个ref,需要多次声明React.createRefs()