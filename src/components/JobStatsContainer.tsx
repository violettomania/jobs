import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/StatsContainer';

import JobStatItem from './StatItem';

interface JobStatsContainerProps {
  jobStats: JobStats;
}

const JobStatsContainer = ({ jobStats }: JobStatsContainerProps) => {
  const defaultStats = [
    {
      title: 'pending applications',
      count: jobStats.defaultStats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: jobStats.defaultStats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: jobStats.defaultStats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <JobStatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default JobStatsContainer;
