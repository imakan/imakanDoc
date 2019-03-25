import React from 'react'

export default class  Row  extends React.Component{
  render () {
    return (
      <React.Fragment>
        <div>{this.props.label}</div>
        <label name ={this.props.name}>
         {this.props.children}
        </label>
      </React.Fragment>
    )
  }
}