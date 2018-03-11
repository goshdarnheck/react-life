import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Plane.css';

import Cell from './Cell';

const CELL_EMPTY = 0;
const CELL_ALIVE = 1;

class Plane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plane : this.buildPlane()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updatePlane(),
            1000
        );
        // this.updatePlane();
        console.log(this.getAliveNeighbourCount(this.state.plane, 6, 4));
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    buildPlane() {
        let plane = [];

        for (let x = 0; x < this.props.size; x++) {
            plane[x] = [];

            for (let y = 0; y < this.props.size; y++) {
                plane[x][y] = CELL_EMPTY;

                if (
                    (x === 5 && y===5)
                    || (x === 6 && y===5)
                    || (x === 7 && y===5)
                ) {
                    plane[x][y] = CELL_ALIVE;
                }
            }
        }

        return plane;
    }

    getAliveNeighbourCount(plane, x, y) {
        let count = 0;

        if (x - 1 >= 0 && plane[x - 1][y] === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && plane[x + 1][y] === CELL_ALIVE) {
            count++;
        }

        if (y - 1 >= 0 && plane[x][y - 1] === CELL_ALIVE) {
            count++;
        }

        if (y + 1 < this.props.size && plane[x][y + 1] === CELL_ALIVE) {
            count++;
        }

        //

        if (x - 1 >= 0 && y - 1 >= 0 && plane[x - 1][y - 1] === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && y - 1 >= 0 && plane[x + 1][y - 1] === CELL_ALIVE) {
            count++;
        }

        if (x - 1 >= 0 && y + 1 < this.props.size && plane[x - 1][y + 1] === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && y + 1 < this.props.size && plane[x + 1][y + 1] === CELL_ALIVE) {
            count++;
        }

        return count;
    }

    updatePlane() {
        this.setState(function(prevState, props) {
            let newPlane = [];

            for (let x = 0; x < this.props.size; x++) {
                newPlane[x] = [];

                for (let y = 0; y < this.props.size; y++) {
                    switch (this.getAliveNeighbourCount(prevState.plane, x, y)) {
                        case 0: {
                            newPlane[x][y] = CELL_EMPTY;
                            break;
                        }
                        case 1: {
                            newPlane[x][y] = CELL_EMPTY;
                            break;
                        }
                        case 2: {
                            newPlane[x][y] = CELL_ALIVE;
                            break;
                        }
                        case 3: {
                            newPlane[x][y] = CELL_ALIVE;
                            break;
                        }
                        case 4: {
                            newPlane[x][y] = CELL_EMPTY;
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
console.log(newPlane)
            return {
                plane: newPlane
            };
        });
    }

    renderPlane(plane) {
        let cellArray = [];

        for (let x = 0; x < plane.length; x++) {
            for (let y = 0; y < plane[x].length; y++) {
                cellArray.push(<Cell x={x} y={y} key={x + '-' + y} state={plane[x][y]} zoom={this.props.zoom} />);
            }
        }

        return cellArray;
    }

    render() {
        let style = {
            width: this.props.size * this.props.zoom,
            height: this.props.size * this.props.zoom,
            position: 'relative',
        };

        return (
            <div style={style} className="Plane">
                {this.renderPlane(this.state.plane)}
            </div>
        );
    }
}

Plane.propTypes = {
    size: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
};

export default Plane;