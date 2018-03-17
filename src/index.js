import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './Life';

ReactDOM.render(
    <Life
        size={80}
        zoom={16}
        speed={250}
        paused={true}
    />,
    document.getElementById('life')
);
