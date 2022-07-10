import { FunctionComponent } from "react";
import { Dialog } from "@reach/dialog";
import type { LoadableState } from "../lib/types";
import "@reach/dialog/styles.css";

interface LoadProps {
  isOpen: boolean;
  close: () => void;
  loadData: (data: number[][]) => void;
  examples: LoadableState[];
  savedStates: LoadableState[];
  deleteSavedState: (index: number) => void;
}

const Load: FunctionComponent<LoadProps> = (props) => {
  return (
    <div>
      <Dialog className="dialog load" isOpen={props.isOpen} onDismiss={props.close} aria-labelledby="load-title">
        <div className="dialog__header">
          <button onClick={props.close}>
            Close<span aria-hidden>×</span>
          </button>
          <h2 id="load-title">Load an Example or Saved State</h2>
        </div>
        <ul>
          {props.savedStates.map((state: LoadableState, i: number) => (
            <li key={i}>
              <button onClick={() => props.loadData(state.data)}>
                {state.name}
              </button>
              <button className="delete" onClick={() => props.deleteSavedState(i)}>Delete</button>
            </li>
          ))}
        </ul>
        <ul>
          {props.examples.map((example, i) => (
            <li key={i}>
              <button onClick={() => props.loadData(example.data)}>
                {example.name}
              </button>
            </li>
          ))}
        </ul>
      </Dialog>
    </div>
  )
}

export default Load;
