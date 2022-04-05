import React, { FunctionComponent } from "react";

interface InfoProps {
  generation: number;
  births: number;
  deaths: number;
}

const Info: FunctionComponent<InfoProps> = ({ generation, births, deaths }) => (
  <div className="info">
    <ul>
      <li>
        <span>{generation}</span>
        <span>Generations</span>
      </li>
      <li>
        <span>{births}</span>
        <span>Births</span>
      </li>
      <li>
        <span>{deaths}</span>
        <span>Deaths</span>
      </li>
    </ul>
  </div>
);

export default Info;
