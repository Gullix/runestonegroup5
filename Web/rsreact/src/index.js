import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Design from './Design';
import './index.css';
import InstructionOverview from "./InstructionOverview";



ReactDOM.render(
    <div>
        <Design />
        <App />
        <InstructionOverview/>
    </div>,
    document.getElementById('root')
);

//<InstructionWindow />
