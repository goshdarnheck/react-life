import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Controls from './Controls';
import {
    CELL_EMPTY,
    CELL_ALIVE
} from './constants';

class Life extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: this.buildGrid(),
            tick: 0,
            speed: this.props.speed,
            paused: this.props.paused,
            hue: 0
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                if (this.state.paused === false) {
                    this.updateGrid();
                }
            },
            this.state.speed
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handlePauseClick = () => {
        this.setState({
            paused: true
        });
    }

    handlePlayClick = () => {
        this.setState({
            paused: false
        });
    }

    handleClearClick = () => {
        this.setState({
            grid: this.buildGrid()
        });
    }

    handleImportClick = () => {
        console.log('import!');

        this.importData([{"x":0,"y":39},{"x":0,"y":64},{"x":1,"y":39},{"x":1,"y":64},{"x":2,"y":39},{"x":2,"y":64},{"x":3,"y":39},{"x":3,"y":64},{"x":4,"y":39},{"x":4,"y":64},{"x":5,"y":39},{"x":5,"y":64},{"x":6,"y":39},{"x":6,"y":64},{"x":7,"y":39},{"x":7,"y":64},{"x":8,"y":39},{"x":8,"y":64},{"x":9,"y":39},{"x":9,"y":64},{"x":10,"y":39},{"x":10,"y":64},{"x":11,"y":39},{"x":11,"y":64},{"x":12,"y":39},{"x":12,"y":64},{"x":13,"y":39},{"x":13,"y":64},{"x":14,"y":39},{"x":14,"y":64},{"x":15,"y":39},{"x":15,"y":64},{"x":16,"y":39},{"x":16,"y":64},{"x":17,"y":39},{"x":17,"y":64},{"x":18,"y":39},{"x":18,"y":64},{"x":19,"y":39},{"x":19,"y":64},{"x":20,"y":39},{"x":20,"y":64},{"x":21,"y":39},{"x":21,"y":64},{"x":22,"y":39},{"x":22,"y":64},{"x":23,"y":39},{"x":23,"y":64},{"x":24,"y":39},{"x":24,"y":64},{"x":25,"y":39},{"x":25,"y":64},{"x":26,"y":39},{"x":26,"y":64},{"x":27,"y":39},{"x":27,"y":64},{"x":28,"y":39},{"x":28,"y":64},{"x":29,"y":39},{"x":29,"y":64},{"x":30,"y":39},{"x":30,"y":64},{"x":31,"y":39},{"x":31,"y":64},{"x":32,"y":39},{"x":32,"y":64},{"x":33,"y":39},{"x":33,"y":64},{"x":34,"y":39},{"x":34,"y":64},{"x":35,"y":39},{"x":35,"y":64},{"x":36,"y":39},{"x":36,"y":64},{"x":37,"y":39},{"x":37,"y":64},{"x":38,"y":39},{"x":38,"y":64},{"x":39,"y":39},{"x":39,"y":64},{"x":40,"y":39},{"x":40,"y":64},{"x":41,"y":39},{"x":41,"y":64},{"x":42,"y":39},{"x":42,"y":64},{"x":43,"y":39},{"x":43,"y":64},{"x":44,"y":39},{"x":44,"y":64},{"x":45,"y":39},{"x":45,"y":64},{"x":46,"y":39},{"x":46,"y":64},{"x":47,"y":39},{"x":47,"y":64},{"x":48,"y":39},{"x":48,"y":64},{"x":49,"y":39},{"x":49,"y":64},{"x":50,"y":39},{"x":50,"y":64},{"x":51,"y":39},{"x":51,"y":64},{"x":52,"y":39},{"x":52,"y":64},{"x":53,"y":39},{"x":53,"y":64},{"x":54,"y":39},{"x":54,"y":64},{"x":55,"y":39},{"x":55,"y":64},{"x":56,"y":39},{"x":56,"y":64},{"x":57,"y":39},{"x":57,"y":64},{"x":58,"y":39},{"x":58,"y":64},{"x":59,"y":39},{"x":59,"y":64},{"x":60,"y":39},{"x":60,"y":64},{"x":61,"y":39},{"x":61,"y":64},{"x":62,"y":39},{"x":62,"y":64},{"x":63,"y":39},{"x":63,"y":64},{"x":64,"y":39},{"x":64,"y":64},{"x":65,"y":39},{"x":65,"y":64},{"x":66,"y":39},{"x":66,"y":64},{"x":67,"y":39},{"x":67,"y":64},{"x":68,"y":39},{"x":68,"y":64},{"x":69,"y":39},{"x":69,"y":64},{"x":70,"y":39},{"x":70,"y":64},{"x":71,"y":39},{"x":71,"y":64},{"x":72,"y":39},{"x":72,"y":64},{"x":73,"y":39},{"x":73,"y":64},{"x":74,"y":39},{"x":74,"y":64},{"x":75,"y":39},{"x":75,"y":64},{"x":76,"y":39},{"x":76,"y":64},{"x":77,"y":39},{"x":77,"y":64},{"x":78,"y":39},{"x":78,"y":64},{"x":79,"y":39},{"x":79,"y":64}]);
    }

    importData = (data) => {
        this.setState(function(prevState, props) {
            let emptyGrid = this.buildGrid();

            for (let i = 0, len = data.length; i < len; i++) {
                emptyGrid[data[i].x][data[i].y].alive = CELL_ALIVE;
                emptyGrid[data[i].x][data[i].y].hue = 0;
            }

            return {
                grid: emptyGrid
            };
        });     
    }

    handleExportClick = () => {
        console.log('export!');

        let exportData = [];
        for (let x = 0; x < this.props.size; x++) {
            for (let y = 0; y < this.props.size; y++) {
                if (this.state.grid[x][y].alive === CELL_ALIVE) {
                    exportData.push({x: x, y: y});
                }
            }
        }

        console.log(exportData);
        console.log(JSON.stringify(exportData));
    }

    handleCellClick = (x, y) => {
        this.setState(function(prevState, props) {
            prevState.grid[x][y].alive = (prevState.grid[x][y].alive === CELL_ALIVE) ? CELL_EMPTY : CELL_ALIVE;

            return {
                grid: prevState.grid
            };
        });        
    }

    getAliveNeighbourCount(grid, x, y) {
        let count = 0;

        if (x - 1 >= 0 && grid[x - 1][y].alive === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && grid[x + 1][y].alive === CELL_ALIVE) {
            count++;
        }

        if (y - 1 >= 0 && grid[x][y - 1].alive === CELL_ALIVE) {
            count++;
        }

        if (y + 1 < this.props.size && grid[x][y + 1].alive === CELL_ALIVE) {
            count++;
        }

        if (x - 1 >= 0 && y - 1 >= 0 && grid[x - 1][y - 1].alive === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && y - 1 >= 0 && grid[x + 1][y - 1].alive === CELL_ALIVE) {
            count++;
        }

        if (x - 1 >= 0 && y + 1 < this.props.size && grid[x - 1][y + 1].alive === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && y + 1 < this.props.size && grid[x + 1][y + 1].alive === CELL_ALIVE) {
            count++;
        }

        return count;
    }

    buildGrid() {
        let grid = [];

        for (let x = 0; x < this.props.size; x++) {
            grid[x] = [];

            for (let y = 0; y < this.props.size; y++) {
                grid[x][y] = {
                    alive: CELL_EMPTY,
                    hue: 0
                };
            }
        }

        return grid;
    }

    updateGrid() {
        this.setState(function(prevState, props) {
            let nextGrid = [];
            let nextHue = prevState.hue < 360 ? prevState.hue + 3 : 0;

            for (let x = 0; x < this.props.size; x++) {
                nextGrid[x] = [];
                for (let y = 0; y < this.props.size; y++) {
                    switch (this.getAliveNeighbourCount(prevState.grid, x, y)) {
                        case 2:
                            if (prevState.grid[x][y].alive === CELL_ALIVE) {
                                nextGrid[x][y] = {
                                    alive: CELL_ALIVE,
                                    hue: prevState.grid[x][y].hue
                                };
                            } else {
                                nextGrid[x][y] = {
                                    alive: CELL_EMPTY,
                                    hue: nextHue
                                };
                            }
                            break;
                        case 3:
                        if (prevState.grid[x][y].alive === CELL_ALIVE) {
                            nextGrid[x][y] = {
                                alive: CELL_ALIVE,
                                hue: prevState.grid[x][y].hue
                            };
                        } else {
                            nextGrid[x][y] = {
                                alive: CELL_ALIVE,
                                hue: nextHue
                            };
                        }
                            break;
                        case 0:
                        case 1:
                        case 4:
                        default:
                            nextGrid[x][y] = {
                                alive: CELL_EMPTY,
                                hue: nextHue
                            };
                            break;
                    }
                }
            }

            return {
                grid: nextGrid,
                tick: prevState.tick + 1,
                hue: nextHue
            };
        });
    }

    render() {
        return (
            <div className="life">
                <Grid
                    grid={this.state.grid}
                    size={this.props.size}
                    zoom={this.props.zoom}
                    handleCellClick={this.handleCellClick}
                />
                <Controls
                    handlePauseClick={this.handlePauseClick}
                    handlePlayClick={this.handlePlayClick}
                    handleClearClick={this.handleClearClick}
                    handleImportClick={this.handleImportClick}
                    handleExportClick={this.handleExportClick}
                    paused={this.state.paused}
                    tick={this.state.tick}
                    speed={this.state.speed}
                />
            </div>
        );
    }
}

Life.propTypes = {
    size: PropTypes.number.isRequired, // todo - default value
    zoom: PropTypes.number.isRequired, // todo - default value
    speed: PropTypes.number, // todo - default value
    paused: PropTypes.bool // todo - default value
};

export default Life;
