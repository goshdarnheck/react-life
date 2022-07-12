import { FunctionComponent } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface AboutProps {
  isOpen: boolean;
  close: () => void;
}

const About: FunctionComponent<AboutProps> = ({ isOpen, close }) => (
  <div>
    <Dialog className="dialog about" isOpen={isOpen} onDismiss={close} aria-labelledby="about-title">
      <div className="dialog__header">
        <button className="close-button" onClick={close}>
          Close <span aria-hidden>×</span>
        </button>
        <h2 id="about-title">About</h2>
      </div>
      <p>This is a test to see how the React javascript library can handle rendering Conway's Game of Life.</p>
      <p>Learn more about <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Conway's Game of Life</a> on Wikipedia.</p>
      <h3>Torus Mode</h3>
      <p>Torus mode treats edges of the grid as if they are touching the opposite side. Like a donut!</p>
      <h3>Mutation Mode</h3>
      <p>Mutation mode gives a "dead" cell with one neighbour a 1/1000th chance of becoming alive, and an "alive" cell with 3 neighbours a 1 in 1000 chance of dying.</p>
    </Dialog>
  </div>
)

export default About;
