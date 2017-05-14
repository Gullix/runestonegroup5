
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import WSocket from "./WSocket"
import RobotController from "./RobotController";
import InstructionOverview from "./InstructionOverview";



class App extends Component {

    constructor(props){
        super(props);
        this.WS = new WSocket();
    }

    render() {
        return (
            <div>
            <RobotController ws={this.WS}/>
                <InstructionOverview ws={this.WS}/>
            </div>

        );
    }
}


export default App;
