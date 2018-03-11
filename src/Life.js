import React, { Component } from 'react';
import './Life.css';

import Plane from './Plane';

class Life extends Component {
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

export default Life;
