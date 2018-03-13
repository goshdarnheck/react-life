import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

class Grid extends Component {

    renderGrid(grid) {
        let cellArray = [];

        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                cellArray.push(<Cell handleCellClick={this.props.handleCellClick} x={x} y={y} key={x + '-' + y} state={grid[x][y]} zoom={this.props.zoom} />);
            }
        }

        return cellArray;
    }

    render() {
        let style = {
            width: this.props.size * this.props.zoom,
            height: this.props.size * this.props.zoom,
        };

        return (
            <div style={style} className="grid">
                {this.renderGrid(this.props.grid)}
            </div>
        );
    }
}

Grid.propTypes = {
    size: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    handleCellClick: PropTypes.func.isRequired
};

export default Grid;