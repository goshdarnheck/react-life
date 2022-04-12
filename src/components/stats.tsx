import { FunctionComponent } from "react";

interface StatsProps {
  generation: number;
  births: number;
  deaths: number;
}

const Stats: FunctionComponent<StatsProps> = ({ generation, births, deaths }) => (
  <dl className="stats">
    <div>
      <dt>Generation</dt>
      <dd>{generation}</dd>
    </div>
    <div>
      <dt>Births</dt>
      <dd>{births}</dd>
    </div>
    <div>
      <dt>Deaths</dt>
      <dd>{deaths}</dd>
    </div>
  </dl>
);

export default Stats;
