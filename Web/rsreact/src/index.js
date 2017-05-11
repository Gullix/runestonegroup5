import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Design from './Design';
import InstructionWindow from './InstructionWindow';
import './index.css';



ReactDOM.render(
    <div>
        <Design />
        <App />
        <InstructionWindow />
    </div>,
    document.getElementById('root')
);


