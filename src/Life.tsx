import { Component, ChangeEvent, FormEvent } from "react";
import Grid from "./components/grid";
import Cell from "./components/cell";
import Controls from "./components/controls";
import Settings from "./components/settings";
import Stats from "./components/stats";
import Load from "./components/load";
import Save from "./components/save";
import Logo from "./components/logo";
import { MAX_HUE, HUE_STEP } from "./lib/constants";
import examples from "./lib/examples";
import { runGeneration } from "./lib/utils";
import type { LoadableState } from "./lib/types";
import "./css/styles.scss"

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
  generation: number;
  hue: number;
  births: number;
  deaths: number;
  cellSize: number;
  gridSize: number;
  loadModalIsOpen: boolean;
  saveModalIsOpen: boolean;
  saveName: string;
  savedStates: LoadableState[];
  torusMode: boolean;
}

const mutantMode = false;

class Life extends Component<LifeProps, LifeState> {
  timerID: number | undefined = undefined;
  state: Readonly<LifeState> = {
    cells: {},
    speed: this.props.speed,
    paused: this.props.paused,
    generation: 0,
    hue: 0,
    births: 0,
    deaths: 0,
    cellSize: this.props.cellSize,
    gridSize: this.props.gridSize,
    loadModalIsOpen: false,
    saveModalIsOpen: false,
    saveName: '',
    savedStates: [],
    torusMode: false
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
      if (this.state.paused === false) {
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
      generation: 0,
      hue: 0,
      births: 0,
      deaths: 0
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

  loadData = (data: number[][]) => {
    let newCells: { [key: string]: { hue: number } } = {};

    for (let i = 0, len = data.length; i < len; i++) {
      newCells[`${data[i][0]}|${data[i][1]}`] = { hue: 0 };
    }

    this.setState({
      cells: newCells,
      hue: 0,
      generation: 0,
      paused: true,
      births: 0,
      deaths: 0,
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
      const newHue = prevState.hue + HUE_STEP;
      const hue = newHue < MAX_HUE ? newHue : newHue - MAX_HUE;

      const response = runGeneration(
        prevState.cells,
        prevState.gridSize,
        hue,
        prevState.torusMode,
        mutantMode
      );

      return {
        generation: prevState.generation + 1,
        cells: response.cells,
        hue,
        births: response.births,
        deaths: response.deaths
      };
    });
  }

  openLoadModal = () => {
    this.setState({ loadModalIsOpen: true });
  }

  closeLoadModal = () => {
    this.setState({ loadModalIsOpen: false });
  }

  openSaveModal = () => {
    this.setState({ saveModalIsOpen: true, paused: true });
  }

  closeSaveModal = () => {
    this.setState({ saveModalIsOpen: false});
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
          />
        );
      }
    }

    return cells;
  };

  render() {
    return (
      <div className="app">
        <div className="panel">
          <Logo />
          <Controls
            pause={this.pause}
            play={this.play}
            clear={this.clear}
            paused={this.state.paused}
            openLoadModal={this.openLoadModal}
            openSaveModal={this.openSaveModal}
            torusMode={this.state.torusMode}
            toggleTorusMode={this.toggleTorusMode}
          />
          <Settings
            handleChangeSpeed={this.changeSpeed}
            handleChangeCellSize={this.changeCellSize}
            handleChangeGridSize={this.changeGridSize}
            speed={this.state.speed}
            cellSize={this.state.cellSize}
            gridSize={this.state.gridSize}
          />
          <Stats
            generation={this.state.generation}
            births={this.state.births}
            deaths={this.state.deaths}
          />
        </div>
        <Grid size={this.state.gridSize} cellSize={this.state.cellSize}>
          {this.renderCellList()}
        </Grid>
        <Load
          isOpen={this.state.loadModalIsOpen}
          close={this.closeLoadModal}
          loadData={this.loadData}
          examples={examples}
          savedStates={this.state.savedStates}
          deleteSavedState={this.deleteSavedState}
        />
        <Save
          isOpen={this.state.saveModalIsOpen}
          close={this.closeSaveModal}
          saveData={this.saveData}
          saveName={this.state.saveName}
          onChangeSaveName={this.onChangeSaveName}
        />
      </div>
    );
  }
}

export default Life;
