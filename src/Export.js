import React from 'react';
import PropTypes from 'prop-types';

function Export(props) {
    return (
        <div className="import">
            <button onClick={props.handleExportCloseClick}>Close</button>
            <textarea value={props.data} readOnly></textarea>
        </div>
    );
}

export default Export;