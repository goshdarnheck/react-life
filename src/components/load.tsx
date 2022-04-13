import { FunctionComponent } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface LoadProps {
  isOpen: boolean;
  close: () => void;
  loadData: (data: number[][]) => void;
  examples: { name: string; data: number[][]; }[]
}

const Load: FunctionComponent<LoadProps> = ({ isOpen, close, loadData, examples}) => (
  <div>
    <Dialog isOpen={isOpen} onDismiss={close} aria-labelledby="load-title">
      <button className="close-button" onClick={close}>
        Close<span aria-hidden>×</span>
      </button>
      <h2 id="load-title">Load an Example or Saved State</h2>
      <ul>
      {examples.map((example, i) => {
        return (
          <li key={i}>
            <button onClick={() => loadData(example.data)}>
              {example.name}
            </button>
          </li>
        );
      })}
      </ul>
    </Dialog>
  </div>
)

export default Load;
