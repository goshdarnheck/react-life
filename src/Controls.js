import React from 'react';

function Controls(props) {
    return (
        <div className="controls">
            <h2>Game Of Life</h2>
            <ul className="buttons">
                <li><button onClick={props.handlePauseClick} disabled={props.paused}>❚❚ Pause</button></li>
                <li><button onClick={props.handlePlayClick} disabled={!props.paused}>► Play</button></li>
                <li><button onClick={props.handleClearClick}>◼ Clear</button></li>
                <li><button disabled onClick={props.handleImportClick}>⟲ Import</button></li>
                <li><button disabled>⟳ Export</button></li>
                <li><button disabled>ℹ About</button></li>
            </ul>
            <ul className="stats">
                <li>Tick: {props.tick}</li>
                <li>Speed: {props.speed}ms</li>
            </ul>
        </div>
    );
}

export default Controls;