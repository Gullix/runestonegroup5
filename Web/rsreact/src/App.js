
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WSocket from "./WSocket"
import RobotController from "./RobotController";

class App extends Component {

    constructor(props){
        super(props)
        this.WS = new WSocket();
    }
  render() {
    return (
        <RobotController ws={this.WS}/>
    );
  }
}

export default App;
