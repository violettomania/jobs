import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { fetchJobStats } from '../state/actions/fetchJobStats';
import { RootState } from '../state/store/store';

import ChartsContainer from './ChartsContainer';
import JobStatsContainer from './JobStatsContainer';
import LoadingSpinner from './LoadingSpinner';

const JobStats = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.jobs.loading);
  const jobStats = useAppSelector((state: RootState) => state.jobs.jobStats);

  useEffect(() => {
    dispatch(fetchJobStats());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <JobStatsContainer jobStats={jobStats} />
          {jobStats.monthlyApplications.length > 0 && (
            <ChartsContainer
              monthlyApplications={jobStats.monthlyApplications}
            />
          )}
        </>
      )}
    </>
  );
};

export default JobStats;
