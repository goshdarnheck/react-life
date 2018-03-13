import React from 'react';
import PropTypes from 'prop-types';

import {
    CELL_EMPTY,
    CELL_ALIVE
} from './constants';

function Cell(props) {
    let style = {
        backgroundColor: props.state === CELL_ALIVE ? 'yellowgreen' : 'darkred',
        color: props.state ? 'white' : 'darkred',
        width: 1 * props.zoom,
        height: 1 * props.zoom,
        lineHeight: 1 * props.zoom + 'px',
        top: 0 + props.y * props.zoom,
        left: 0 + props.x * props.zoom,
    };

    return <div onClick={() => props.handleCellClick(props.x, props.y)} className="cell" data-x={props.x} data-y={props.y} style={style}>•</div>;
}

Cell.propTypes = {
    zoom: PropTypes.number.isRequired,
    handleCellClick: PropTypes.func.isRequired
};

export default Cell;