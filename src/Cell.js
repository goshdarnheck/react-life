import React from 'react';
import PropTypes from 'prop-types';

import {
    CELL_EMPTY,
    CELL_ALIVE
} from './constants';

function Cell(props) {
    let hue = Math.floor(Math.random() * (360 + 1));
    let style = {
        backgroundColor: props.alive === CELL_ALIVE ? 'hsl(' + props.hue + ', 100%, 50%)' : '#222',
        borderRadius: props.alive === CELL_ALIVE ? '50%' : '',
        height: 1 * props.zoom,
        width: 1 * props.zoom,
        top: 0 + props.y * props.zoom,
        left: 0 + props.x * props.zoom,
    };

    return <i onClick={() => props.handleCellClick(props.x, props.y)} className={props.alive ? 'alive' : 'dead'} style={style}></i>;
}

Cell.propTypes = {
    zoom: PropTypes.number.isRequired,
    handleCellClick: PropTypes.func.isRequired
};

export default Cell;