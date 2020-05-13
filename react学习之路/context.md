# Context

> context通过组件数提供了一个传递数据的方法，从而避免了在每一个层级手动传递props属性

在一个典型的React应用中，数据是通过props属性由上向下（由父及子）的进行传递的，但是这个对于某些类型的属性而言是机器繁琐的，（例如：地区偏好，UI主题），这是应用程序中许多组件都所需要的，Context提供了一种在组件之间共享此类值的方式，而不必通过组件树的每个层级显式地传递props

# 何时使用Context

context设计目的是为了共享那些被认为对于一个组件数而言是“全局”的数据，例如当前认证的用户，主题或者首选语言，例如

```javascript
const ThemeContext = React.createContext('light')
function ThemeButton(props){
  return (
    <ThemeContext.Consumer>
    {theme => <Button {...props} theme = {theme} />}
    </ThemeContext.Consumer>
  );
};

// syntaxhighlighter
// 中间组件

function Toolbar () {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}
class App extends React.Component {
  render(){
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

```
> 注意： 不要仅仅为了避免在几个层级下的组件传递props而使用context,它是被用于多个层级的多个组件需要访问相同数据的情景


# API

`React.createContext`

```javascript
const {Provider,Consumer} = React.createContext(defaultValue)
```
createContext提供了两个对象，一个是Provider,另外一个是Consumer。创建一对{Provider,Consumer}。当React渲染Context组件Consumer时，它将从组件数的上层最接近的Provider拿数据，读取当前的context的值。换句话说，createContext提供的两个对象，Provider提供数据，而最近的Consumer是获取最近的Provider上的Context数据

# Provider

```javascript
<Provider value={/** some value **/ } ></Provider>
```
React组件允许Consumers订阅context的改变。
接收一个value属性传递给Provider的后代Consumers。一个Provider可以联系到多个Consumers。Providers可以被嵌套以覆盖组件树内更深层次的值

# Consumer
```javascript
<Consumer>
{value => {} }
</Consumer>
```

Consumer是一个可以订阅Context变化的React组件。每当Provider的值发生变化的，作为Provider后代的所有Consumer都会重新渲染，从Provider到其后代的Consumers传播不受`shouldComponentUpdate()`方法的约束

# 父子耦合

经常需要从组件树中某个深度嵌套的组件中更新context。在这种情况下，可以通过context向下传递一个函数，以允许Consumer更新context

# 作用于多个上下文

为了保持context快速进行二次渲染，React需要使每一个Consumer在组件树中成为一个单独的节点

```javascript
// 主题上下文，默认light
const ThemeContext = React.createContext('light')
// 登陆用户上下文
const UserContext = React.createContext()

// 一个依赖于两个上下文的中间组件
function Toolbar(props){
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {
            user => (
              <ProfilePage user={user} theme={theme} />
          )}
        </serContext.Consumer>
      )}
    </hemeContext.Consumer>
  )
}
class App extends React.Component {
  render(){
    const {signedInUser,theme} = this.props;
    // App组件提供上下文的初始值
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={signedInUser}>
        <Toolbar />
      </UserContext.Provider>
    </ThemeContext.Provider>
  }
}
```


# 在声明周期方法中访问Context

在声明周期方法中访问Context是一种相对常见的用例，而不是将上下文添加到每个生命周期方法中，只需要将他作为一个props传递，然后想通常使用props一样使用它。例如：

```javascript
class Button extends React.Component {
  componentDidMount(){
    // ThemeContext value is this.props.theme
  }
  componentDidUpdate(prevProps, prevState){
    // Previous ThemeContext value is prevPorps.theme
    // New ThemeContext value is this.props.theme
  }
  render(){
    const {theme, children} = this.props
    return (
      <button classname={theme?'dark':'light'}>
      {children}
      </button>
    )
  }
}

// 将context作为props传递
export default props => (
  <ThemeContext.Consumer>
    {theme => (<Button {...props} theme={theme} />)}
  </ThemeContext.Consumer>
)
```

> 注意：在Provider提供给Consumer数据是，将value的值，提升自state中