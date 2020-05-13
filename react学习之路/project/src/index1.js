import React from 'react'
import ReactDom from 'react-dom'

// function Welcome (props) {
//   return <h1>Hello,{props.name}</h1>
// }

// function App () {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   )
// }
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  // 当组件输出到DOM后会执行componentDidMount钩子，这是一个建立逻辑的时候
  componentDidMount () {
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  tick () {
    this.setState({
      date: new Date()
    })
  }
  // 组件卸载是，书写逻辑
  componentWillUnmount () {
    clearInterval(this.timerID);
  }
  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
class NumberList extends React.Component {
  render () {
    const numbers = this.props.numbers
    const listItems = numbers.map(number => {
      return <li key={number.toString()}>{number}</li>
    })
    return (
      <ul>{listItems}</ul>
    )
  }

}

ReactDom.render(
  <div>
    <Clock />
    <NumberList numbers={[1,2,3,4,5]}/>
  </div>,
  document.getElementById('root')
)


// 组件名称必须以大写字母开头

// 例如<div />表示一个DOM标签，但是welcome表示一个组件，并且在使用该组件的时候你必须定义或者引入它

// 所有的props组件必须像春函数那样使用他们的props，也就是说 我们不能修改props的值，当然我们的应用界面是随时间动态变化的，我们使用state的新概念，
// state可以在不违反上述规则的情况下，根据情况下，更具用户操作，网络相应，或者其他动态变化，使组件动态的响应并改变组件的输出

// 每当Clock组件第一个加载到DOM中的时候，我们都想生成定时器，这在React中被称为挂载



