import React from 'react';
import PropTypes from 'prop-types';

function Cell(props) {
    let style = {
        backgroundColor: props.state ? 'yellowgreen' : 'darkred',
        color: props.state ? 'white' : 'darkred',
        width: 1 * props.zoom,
        height: 1 * props.zoom,
        lineHeight: 1 * props.zoom + 'px',
        top: 0 + props.y * props.zoom,
        left: 0 + props.x * props.zoom,
    };

    return <div className="cell" data-x={props.x} data-y={props.y} style={style}>•</div>;
}

Cell.propTypes = {
    zoom: PropTypes.number.isRequired,
};

export default Cell;