import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Design from './Design';
import './index.css';

/*
Component structure 2017-05-17:
App
    WebSocket // Everything that has to be updated with the websocket
            InstructionOverview  // Here you give commands and list commands
                TabWindow        // Here you tab to change instructionwindow content
                    Tab          // A tab component
                    InstructionWindow  // Make a command for the robot
                TaskWindow           // List all the commands the robot will do
                    TaskItem         // Each task it lists

            RobotController   // Here you manually control the robot

 */



ReactDOM.render(
    <div>
        <Design />
        <App />

    </div>,
    document.getElementById('root')
);

//<InstructionWindow />
