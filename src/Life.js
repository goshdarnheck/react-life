import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Controls from './Controls';
import Import from './Import';
import Export from './Export';
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
            hue: 0,
            showImport: false,
            showExport: false,
            exportData: []
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
        this.setState(function(prevState, props) {
            return {
                showImport: !prevState.showImport
            }
        });
    }

    handleImportCloseClick = () => {
        this.setState(function(prevState, props) {
            return {
                showImport: false
            }
        });
    }
    
    handleClickLibraryEntry = (entry) => {
        this.importData(entry);
    }

    importData = (data) => {
        this.setState(function(prevState, props) {
            let emptyGrid = this.buildGrid();

            for (let i = 0, len = data.length; i < len; i++) {
                emptyGrid[data[i].x][data[i].y].alive = CELL_ALIVE;
                emptyGrid[data[i].x][data[i].y].hue = 0;
            }

            return {
                showImport: false,
                grid: emptyGrid
            };
        });     
    }

    handleExportClick = () => {
        this.setState(function(prevState, props) {
            let exportData = [];
            for (let x = 0; x < this.props.size; x++) {
                for (let y = 0; y < this.props.size; y++) {
                    if (this.state.grid[x][y].alive === CELL_ALIVE) {
                        exportData.push({x: x, y: y});
                    }
                }
            }

            console.log(JSON.stringify(exportData));

            return {
                exportData: JSON.stringify(exportData),
                showExport: true
            };
        });

    }

    handleExportCloseClick = () => {
        this.setState(function(prevState, props) {
            return {
                showExport: false
            }
        });
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
                {this.state.showImport &&
                    <Import
                        handleClickLibraryEntry={this.handleClickLibraryEntry}
                        handleImportCloseClick={this.handleImportCloseClick}
                    />
                }
                {this.state.showExport &&
                    <Export
                        handleClickLibraryEntry={this.handleClickLibraryEntry}
                        handleExportCloseClick={this.handleExportCloseClick}
                        data={this.state.exportData}
                    />
                }
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
