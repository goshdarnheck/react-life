import React from 'react';
import PropTypes from 'prop-types';

function Export(props) {
    return (
        <div className="export">
            <div className="export-content">
                <button onClick={props.handleExportCloseClick}>Close</button>
                <ul>
                    <li><textarea value={props.data} readOnly></textarea></li>
                    <li><button onClick={props.handleExportCloseClick}>Copy to Clipboard</button></li>
                </ul>
            </div>
        </div>
    );
}

export default Export;