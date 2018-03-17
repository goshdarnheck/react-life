import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './Life';

ReactDOM.render(
    <Life
        size={70}
        zoom={20}
        speed={250}
        paused={true}
    />,
    document.getElementById('life')
);
