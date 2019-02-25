jsx
用大括号 括起来 这样可以防止分号自动插入
本身是一中表达式，可以使用js的所有表达式，编译后辈转化为普通的js对象
这就意味着，我们其实可以在if或者for语句里使用jsx，将它赋值给变量，返回也行
你可以使用引号来定义以字符串为值的属性
const element = <div tableIndex='0'></div>
如果jsx标签是闭合式的，那么你需要在结尾处用</> 就好像是xml或者html，
因为jsx的特性更接近js而不是html,.suoyi react DoM

属性名是用驼峰 驼峰 驼峰  驼峰class变成className，而tabIndex 

babel 转移器会把jsx转换成一个名为React.createElement()方法调用


const element = (

)

react元素是什么：

我们在写jsx的时候 babel转义器会把jsx内部调用React.createElement()，生成react的元素 ，比如 const element = {
  type:'h1',
  props:{
    className:'sa',
    children:'asdad'
  }
}

元素是构成react应用的最小单位，元素是用来描述你在屏幕上看到的内容

ReactDom.reader(),两个参数，第一个是自定义元素，第二个是根dom节点

React元素都是immutable不可变的，当元素被创建之后，你是无法改变其内容或者属性的，如果不写任何东西，想要改变更新界面，只能是创建一个新的元素，然后传入到reactDom.render中


react Dom首先会比较元素内容先后的不同，diff算法，，而在渲染过程中只会更新改变了的部分


<!-- state声明周期图 -->

开始

静态默认属性初始化
静态原型链初始化

构造函数初始化
super() this.state = {}

componentWillMount()
render()
componentDidMount()
组件运行时

如果父组件更新--render()  props改变 -- componentWillReceiveProps() 

state改变---性能优化点 shouldComponentUpdate() --return false 组件卸载 componentWillUnmount()
                                             -- return true componentWillUpdate()--render()--componentDidUpdate()


我们需要为Clock组件添加“状态(state)”
状态与属性十分相似，但是状态是私有的，完全受控于当前组件


类组件应该始终使用props调用基础构造函数，父组件应该始终是用props调用子组件的内容


正确是用state
不要直接使用更行状态  比如 this.state.xx = 'xx' 应该使用setState(),构造函数是唯一能够初始化this.state的地方


状态更新可能是异步的，
react可以将多个setState()调用合并成一个调用来提高性能，
因为this.props和this.state可能是异步更行的，你不应该直接使用 this.state.counter的值作为参数，
这种情况 使用的是this.setState(() => {}) setState接受的是一个函数  而不是对象


状态更新合并，当你调用setState()时，React将你提供的对象合并到当前状态，建议更新状态的时候   合并更新  不建议单独更新
数据自顶向下流动
父组件或者子组件都不知道某个组件是有状态的还是无状态的，并且他们不应该关心某组件是被定义为一个函数 还是一个类，这就是为什么状态通常被称为局部或者封装。

组件可以选择将其状态作为属性 传递给其他子组件


这通常被称为自顶向下或者单项数据流，任何状态始终由某些特性组件所有，并且从该状态导出的任何数据或者ui只能影响树中的下方组件


# 事件处理

1、React的事件绑定属性的命名采用的驼峰式写法，而不是小写。onClick
2、如果采用jsx的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(dom元素的写法)


注意：在react中不能使用返回return false的方式阻止默认行为，必须你明确的使用preventDefault。


必须要写preventDefault()  不能return false

绑定this this.hanldClick.bind(this),如果是在dom中调用this.handleClick,

注意一定要使用箭头函数，如果不使用箭头函数的话 在dom中调用this.handle  在handle中的this是undefined,这里的箭头函数是  
onClick = { (e) => this.handle(e) } 箭头函数是在dom中使用
或者 属性初始化器语法
this.handleClick.bind(this,id)

handleClick = () => {

}


如果这个回调作为一个属性值传入低阶组件是 ，就会造成额外的重新渲染，所以使用下面的方法
1、建议使用属性初始化器语法 也就是 handleClick = （） => {} 
2、使用bind 



# 条件渲染

阻止组件渲染，在极少数情况下，你可能希望隐藏组件，即使她被其他组件渲染，让render方法返回null而不是他的渲染结果即可实现
组件的render方法返回null并不会影响该组件声明周期方法的回调，例如 componentWillUpdate和componentDidUpdate依然可以被调用


key作为独一无二的字符串，key要放在循环的上面


# 表单

HTML表单元素与React中的其他DOM元素有所不同，因为表单元素生来就保留一些内部状态

## 受控组件

# 状态提升

状态分享是通过将state数据提升至需要这些数据的组件最近的父组件来完成的，这就是所谓的状态提升

# 组合vs继承
react具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码，使用组合 我使用组合 使用组合

使用props.children属性将子元素直接传递到输出

jsx标签内的任何内容都可以将通过children属性传入到次组件，想到与vue的wslot

# React理念
在我们的理念中，React最初的目的是使用JavaScript创建大型的，快速相应的网络应用
第一步：把UI划分出组件层级

但你如何知道那一部分应该成为一个组件，想想在编写代码时 你在什么情况下需要新建一个函数或者对象，思考方式是一样的。例如单一的功能原则，在理想状况下，一个组件应该只做一件事情，如果这个组件功能不断丰富，他应该被分成更小的组件


组件应该只更新自己的状态，组件应该只该更自己的状态，只更新自己的状态

代码是用来读的，这比写更重要，并且非常容易阅读这个模块化的，思路清晰的代码，当你构建大型组件库的时候，你会开始欣赏react的思路清晰化和模块性，并且随着代码的复用，你的代码量会开始减少