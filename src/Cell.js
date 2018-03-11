import React from 'react';
import PropTypes from 'prop-types';

function Cell(props) {
    let style = {
        backgroundColor: props.state ? 'red' : 'blue',
        width: 1 * props.zoom,
        height: 1 * props.zoom,
        position: 'absolute',
        top: 0 + props.y * props.zoom,
        left: 0 + props.x * props.zoom
    };

    return <div className={'c-' + props.x + '-' + props.y} style={style}></div>;
}

Cell.propTypes = {
    zoom: PropTypes.number.isRequired,
};

export default Cell;