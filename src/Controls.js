import React from 'react';

function Controls(props) {
    return (
        <div className="controls">
            <h2>Controls</h2>
            <ul>
                <li><button onClick={props.handlePauseClick} disabled={props.paused}>Pause</button></li>
                <li><button onClick={props.handlePlayClick} disabled={!props.paused}>Play</button></li>
                <li><button onClick={props.handleClearClick}>Clear</button></li>
                <li><button onClick={props.handleImportClick}>Import</button></li>
                <li><button>Save</button></li>
                <li><input type="range" /></li>

            </ul>
        </div>
    );
}

export default Controls;