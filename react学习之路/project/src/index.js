import React from 'react'
import ReactDOM from 'react-dom'
import Greeting from './Greeting/Greeting'
import GHooks from './Greeting/GHooks'
import './index.css'

class Game extends React.Component {
  render () {
    const styleObj = {
      height:100
    }
    return (
      <React.Fragment>
        <GHooks></GHooks>
        <div style={styleObj}></div>
        <Greeting></Greeting>
      </React.Fragment>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
