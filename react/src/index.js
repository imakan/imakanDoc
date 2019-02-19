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
function BoilingVerdict (props) {
  if (props.celsius >= 100) {
    return <p>水会烧开</p>;
  }
  return <p>水不会烧开</p>;
}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
function toCelsius (fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit (celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert (temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.state = {temperature: '', scale: 'c'};
  }
  handleCelsiusChange (temperature) {
    this.setState({ scale: 'c', temperature });
  }
  handleFahrenheitChange (temperature) {
    this.setState({ scale: 'f', temperature });
  }
  render () {
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit}   onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    )
  }
}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    // this.setState({ temperature: e.target.value });
    this.props.onTemperatureChange(e.target.value);
  }
  render () {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}


function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}


ReactDom.render(
  <div>
    <Clock />
    <Calculator />
    <SignUpDialog />
    <NumberList numbers={[1, 2, 3, 4, 5]} />
  </div>,
  document.getElementById('root')
)


// 组件名称必须以大写字母开头

// 例如<div />表示一个DOM标签，但是welcome表示一个组件，并且在使用该组件的时候你必须定义或者引入它

// 所有的props组件必须像春函数那样使用他们的props，也就是说 我们不能修改props的值，当然我们的应用界面是随时间动态变化的，我们使用state的新概念，
// state可以在不违反上述规则的情况下，根据情况下，更具用户操作，网络相应，或者其他动态变化，使组件动态的响应并改变组件的输出

// 每当Clock组件第一个加载到DOM中的时候，我们都想生成定时器，这在React中被称为挂载



