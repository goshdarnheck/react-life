import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './Life';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Life
        size={30}
        zoom={20}
        speed={250}
        paused={true}
    />,
    document.getElementById('life')
);
// registerServiceWorker();
