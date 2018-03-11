import React, { Component } from 'react';
import './App.css';

import Plane from './Plane';

class App extends Component {
    render() {
        return (
            <div>
                <Plane
                    size={10}
                    zoom={10}
                />
                <button>next</button>
            </div>
        );
    }
}

export default App;
