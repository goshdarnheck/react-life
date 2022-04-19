import { FunctionComponent, memo } from "react";
import { ReactComponent as LogoSvg } from '../svg/reacty-life1-test.svg'

interface HeaderProps {
  onClick: () => void;
}


const Header: FunctionComponent<HeaderProps> = ({ onClick }) => (
  <header className="header">
    <h1>
      <button onClick={onClick}>
        <LogoSvg />
        <span>About</span>
      </button>
    </h1>
  </header>
);

export default memo(Header)
