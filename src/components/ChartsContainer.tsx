import { useState } from 'react';

import Wrapper from '../assets/wrappers/ChartsContainer';

import AreaChart from './AreaChart';
import BarChart from './BarChart';

interface MonthlyApplicationsProps {
  monthlyApplications: MonthlyApplication[];
}

const ChartsContainer = ({ monthlyApplications }: MonthlyApplicationsProps) => {
  const [barChart, setBarChart] = useState(true);

  // TODO: handle empty chart
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? (
        <BarChart data={monthlyApplications} />
      ) : (
        <AreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
