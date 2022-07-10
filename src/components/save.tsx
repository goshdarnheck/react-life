import { FunctionComponent, ChangeEvent, FormEvent } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface SaveProps {
  isOpen: boolean;
  close: () => void;
  saveName: string;
  saveData: (event: FormEvent<HTMLFormElement>) => void;
  onChangeSaveName: (event: ChangeEvent<HTMLInputElement>) => void
}

const Save: FunctionComponent<SaveProps> = ({ isOpen, close, saveData, saveName, onChangeSaveName }) => (
  <div>
    <Dialog className="dialog save" isOpen={isOpen} onDismiss={close} aria-labelledby="save-title">
      <div className="dialog__header">
        <button onClick={close}>
          Close <span aria-hidden>×</span>
        </button>
        <h2 id="save-title">Save Current State</h2>
      </div>
      <form onSubmit={saveData}>
        <label htmlFor="name">Name</label>
        <input id="name" value={saveName} onChange={onChangeSaveName} />
        <input type="submit" disabled={!saveName.length} value="Save" />
      </form>
    </Dialog>
  </div>
)

export default Save;
