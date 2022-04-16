import { FunctionComponent } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface AboutProps {
  isOpen: boolean;
  close: () => void;
}

const About: FunctionComponent<AboutProps> = ({ isOpen, close }) => (
  <div>
    <Dialog isOpen={isOpen} onDismiss={close} aria-labelledby="about-title">
      <button className="close-button" onClick={close}>
        Close <span aria-hidden>×</span>
      </button>
      <h2 id="about-title">About React Life</h2>
      <p>I made React Life it's great. It's Conway's Game of Life made in React, which is a bad idea.</p>
      <p>You shouldn't make Game of Life in React, but you can and it can handle it sort of.</p>
      <p>What is Game of Life???</p>
      <h3>Torus Mode</h3>
      <p>Torus mode treats edges of the grid as if they are touching the opposite side. Like a donut!</p>
      <h3>Mutation Mode</h3>
      <p>Mutation mode gives a "dead" cell with one neighbour a 1/1000th chance of becoming alive, and an "alive" cell with 3 neighbours a 1 in 1000 chance of dying.</p>
    </Dialog>
  </div>
)

export default About;
