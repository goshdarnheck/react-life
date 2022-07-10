import { Component, ChangeEvent, FormEvent } from "react";
import Grid from "./components/grid";
import Cell from "./components/cell";
import Controls from "./components/controls";
import Load from "./components/load";
import Save from "./components/save";
import About from "./components/about";
import Header from "./components/header";
import Stepper from "./components/stepper";
import examples from "./lib/examples";
import { runGeneration } from "./lib/core";
import type { LoadableState } from "./lib/types";
import "./css/styles.scss"
import "./css/reachui.scss"

const MAX_HUE = 360;

interface LifeProps {
  speed: number;
  paused: boolean;
  cellSize: number;
  gridSize: number;
}

interface LifeState {
  cells: { [key: string]: { hue: number } };
  speed: number;
  paused: boolean;
  hue: number;
  hueStep: number;
  cellSize: number;
  gridSize: number;
  loadModalIsOpen: boolean;
  saveModalIsOpen: boolean;
  aboutModalIsOpen: boolean;
  saveName: string;
  savedStates: LoadableState[];
  torusMode: boolean;
  mutantMode: boolean;
  isDrawingCells: boolean;
}

class Life extends Component<LifeProps, LifeState> {
  timerID: number | undefined = undefined;
  state: Readonly<LifeState> = {
    cells: {},
    speed: this.props.speed,
    paused: this.props.paused,
    hue: 0,
    hueStep: 29,
    cellSize: this.props.cellSize,
    gridSize: this.props.gridSize,
    loadModalIsOpen: false,
    saveModalIsOpen: false,
    aboutModalIsOpen: false,
    saveName: '',
    savedStates: [],
    torusMode: false,
    mutantMode: false,
    isDrawingCells: false
  };

  componentDidMount() {
    this.loadData(examples[0].data);
    this.loadLocalStorage();
    this.setGenerationInterval();
  }

  componentWillUnmount() {
    window.clearInterval(this.timerID);
  }

  setGenerationInterval = () => {
    this.timerID = window.setInterval(() => {
      if (this.state.paused === false && this.state.isDrawingCells === false) {
        this.runNextGeneration();
      }
    }, 1000 - this.state.speed);
  };

  pause = () => {
    this.setState({ paused: true });
  };

  play = () => {
    this.setState({ paused: false});
  };

  clear = () => {
    this.setState({
      cells: {},
      paused: true,
      hue: 0
    });
  };

  changeSpeed = (speed: number) => {
    clearInterval(this.timerID);
    this.setState({ speed }, this.setGenerationInterval);
  };

  changeCellSize = (cellSize: number) => {
    this.setState({ cellSize });
  };

  changeGridSize = (gridSize: number) => {
    this.setState({ gridSize });
  };

  changeHueStep = (hueStep: number) => {
    this.setState({ hueStep });
  }

  loadData = (data: number[][]) => {
    let newCells: { [key: string]: { hue: number } } = {};

    for (let i = 0, len = data.length; i < len; i++) {
      newCells[`${data[i][0]}|${data[i][1]}`] = { hue: 0 };
    }

    this.setState({
      cells: newCells,
      hue: 0,
      paused: true,
      loadModalIsOpen: false
    });
  };

  loadLocalStorage = () => {
    const savedStates = localStorage.getItem("savedStates");

    if (savedStates) {
      this.setState({ savedStates: JSON.parse(savedStates) })
    }
  }

  deleteSavedState = (index: number) => {
    this.setState((prevState: LifeState) => {
      let newSavedStates = [...prevState.savedStates];
      newSavedStates.splice(index, 1);
      localStorage.setItem("savedStates", JSON.stringify(newSavedStates));

      return {
        savedStates: newSavedStates
      };
    });
  }

  toggleTorusMode = () => {
    this.setState((prevState: LifeState) => {
      return { torusMode: !prevState.torusMode }
    });
  }

  toggleMutantMode = () => {
    this.setState((prevState: LifeState) => {
      return { mutantMode: !prevState.mutantMode }
    });
  }

  handleCellClick = (cellKey: string) => {
    this.setState((prevState: LifeState) => {
      let newCells = { ...prevState.cells };

      if (prevState.cells && prevState.cells[cellKey]) {
        delete newCells[cellKey];
      } else {
        newCells[cellKey] = { hue: 0 };
      }

      return {
        cells: newCells,
      };
    });
  };

  runNextGeneration() {
    this.setState((prevState) => {
      const nextHue = prevState.hue + this.state.hueStep;
      const newHue = nextHue < MAX_HUE ? nextHue : nextHue - MAX_HUE;

      const response = runGeneration(
        prevState.cells,
        prevState.gridSize,
        newHue,
        prevState.torusMode,
        prevState.mutantMode
      );

      return {
        cells: response.cells,
        hue: newHue
      };
    });
  }

  openLoadModal = () => {
    this.setState({ loadModalIsOpen: true });
  }

  openSaveModal = () => {
    this.setState({ saveModalIsOpen: true, paused: true });
  }

  openAboutModal = () => {
    this.setState({ aboutModalIsOpen: true });
  }

  closeModals = () => {
    this.setState({
      loadModalIsOpen: false,
      saveModalIsOpen: false,
      aboutModalIsOpen: false
    });
  }

  onChangeSaveName = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ saveName: event.target.value});
  }

  saveData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cellKeys = Object.keys(this.state.cells);

    if (cellKeys.length > 0) {
      let data: number[][] = [];

      cellKeys.forEach((cell) => {
        const cellArr: string[] = cell.split("|");
        data.push([parseInt(cellArr[0]), parseInt(cellArr[1])])
      });

      const savedStates = localStorage.getItem("savedStates");
      let newSavedStates = savedStates ? JSON.parse(savedStates) : []
      newSavedStates.push({ name: this.state.saveName, data: data });

      localStorage.setItem("savedStates", JSON.stringify(newSavedStates));
      this.setState({
        saveModalIsOpen: false,
        saveName: '',
        savedStates: newSavedStates
      });
    }
  }

  renderCellList = () => {
    const yStart = Math.ceil(this.state.gridSize / 2);
    const yEnd = Math.ceil(0 - this.state.gridSize / 2);
    const xStart = Math.ceil(0 - this.state.gridSize / 2);
    const xEnd = Math.ceil(this.state.gridSize / 2);
    let cells = [];

    for (let y = yStart; y > yEnd; y--) {
      for (let x = xStart; x < xEnd; x++) {
        const cellKey = `${x}|${y}`;
        let hue = 0;
        let alive = false;

        if (this.state.cells[cellKey]) {
          hue = this.state.cells[cellKey].hue;
          alive = true;
        }

        cells.push(
          <Cell
            handleCellClick={this.handleCellClick}
            key={cellKey}
            cellKey={cellKey}
            x={x}
            y={y}
            hue={hue}
            alive={alive}
            onCellMouseEnter={this.onCellMouseEnter}
          />
        );
      }
    }

    return cells;
  };

  onCellMouseEnter = (cellKey: string) => {
    if (this.state.isDrawingCells) {
      this.handleCellClick(cellKey);
    }
  } 

  onGridMouseDown = () => {
    this.setState({ isDrawingCells: true });
  }

  onGridMouseUp = () => {
    this.setState({ isDrawingCells: false });
  }

  render() {
    return (
      <div className="app" onMouseUp={this.onGridMouseUp}>
        <div className="panel">
          <Header onClick={this.openAboutModal} />
          <Controls
            pause={this.pause}
            play={this.play}
            clear={this.clear}
            paused={this.state.paused}
            openLoadModal={this.openLoadModal}
            openSaveModal={this.openSaveModal}
            torusMode={this.state.torusMode}
            toggleTorusMode={this.toggleTorusMode}
            mutantMode={this.state.mutantMode}
            toggleMutantMode={this.toggleMutantMode}
            handleChangeSpeed={this.changeSpeed}
            speed={this.state.speed}
          />
        </div>
        <Grid
          size={this.state.gridSize}
          cellSize={this.state.cellSize}
          onGridMouseDown={this.onGridMouseDown}
          onGridMouseUp={this.onGridMouseUp}
        >
          {this.renderCellList()}
        </Grid>
        <div className="zoom-controls">
          <Stepper
            label="Zoom"
            value={this.state.cellSize}
            changeValue={this.changeCellSize}
            step={1}
            min={1}
            max={20}
            getAriaValueText={() => this.state.cellSize.toString()}
          />
        </div>
        {/* Dialogs */}
        <Load
          isOpen={this.state.loadModalIsOpen}
          close={this.closeModals}
          loadData={this.loadData}
          examples={examples}
          savedStates={this.state.savedStates}
          deleteSavedState={this.deleteSavedState}
        />
        <Save
          isOpen={this.state.saveModalIsOpen}
          close={this.closeModals}
          saveData={this.saveData}
          saveName={this.state.saveName}
          onChangeSaveName={this.onChangeSaveName}
        />
        <About
          isOpen={this.state.aboutModalIsOpen}
          close={this.closeModals}
        />
      </div>
    );
  }
}

export default Life;
