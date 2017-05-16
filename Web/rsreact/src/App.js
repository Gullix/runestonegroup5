
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import WSocket from "./WSocket"




class App extends Component {

    constructor(props){
        super(props);
        this.WS = new WSocket();
    }

    render() {
        return (
            <div>
                <WSocket/>

            </div>

        );
    }
}


export default App;
