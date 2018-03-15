import React from 'react';

function Controls(props) {
    return (
        <div>
            <h2>Controls</h2>
            <ul>
                <li><button onClick={props.handlePauseClick} disabled={props.paused}>Pause</button></li>
                <li><button onClick={props.handlePlayClick} disabled={!props.paused}>Play</button></li>
                <li><button>Clear</button></li>
                <li><button>Save</button></li>
            </ul>
        </div>
    );
}

export default Controls;