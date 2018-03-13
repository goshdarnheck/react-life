import React from 'react';

function Controls(props) {
    return (
        <div>
            <h2>Controls</h2>
            <ul>
                <li><button>Pause</button></li>
                <li><button>Play</button></li>
                <li><button>Clear</button></li>
                <li><button>Save</button></li>
            </ul>
        </div>
    );
}

export default Controls;