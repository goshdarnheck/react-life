import { FunctionComponent, memo } from "react";

interface StatsProps {
  generation: number;
  births: number;
  deaths: number;
}

const Stats: FunctionComponent<StatsProps> = memo(({ generation, births, deaths }) => (
  <div className="stats">
    <dl>
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
  </div>
));

export default Stats;
