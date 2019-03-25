import React from 'react'
import Row from './Row'
import {ThemeContext} from './context'

export default class Greeting extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      name:'wang',
      otherName:'wu',
      width:window.innerWidth
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOtherNameChange = this.handleOtherNameChange.bind(this)
    this.handleWidth = this.handleWidth.bind(this)
  }
  handleOtherNameChange(e){
    this.setState({
      otherName:e.target.value
    })
  }
  handleNameChange (e) {
    this.setState({
      name:e.target.value
    })
  }
  handleWidth(e){
    this.setState({
      width:window.innerWidth
    })
  }
  componentDidUpdate() {
    document.title =  this.state.name + ' ' + this.state.otherName
  }
  componentDidMount(){
    document.title =  this.state.name + ' ' + this.state.otherName
    window.addEventListener('resize',this.handleWidth)
  }
  componentWillUnmount(){
    window.removeEventListener('resize',this.handleWidth)
  }

  render() {
    return (
      <section>
        <Row label='name'>
        <input
          value={this.state.name}
          onChange = {this.handleNameChange}
        />
        </Row>


        <Row label='otherName'>
        <input
          value={this.state.otherName}
          onChange = {this.handleOtherNameChange}
        />
        </Row>


         <Row label='width'>
          {this.state.width}
        </Row>
      </section>
    )
  }
}