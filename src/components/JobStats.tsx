import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/ChartsContainer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { fetchJobStats } from '../state/actions/fetchJobStats';
import { resetError } from '../state/slices/jobsStatsSlice';
import { RootState } from '../state/store/store';

import ChartsContainer from './ChartsContainer';
import JobStatsContainer from './JobStatsContainer';
import LoadingSpinner from './LoadingSpinner';

const JobStats = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const loading = useAppSelector((state: RootState) => state.jobStats.loading);
  const jobStats = useAppSelector(
    (state: RootState) => state.jobStats.jobStats
  );
  const error = useAppSelector((state: RootState) => state.jobStats.error);

  useEffect(() => {
    if (user) dispatch(fetchJobStats({ token: user.token }));
    resetError();
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(
        'An error happened while fetching job stats. Please try again.'
      );
      resetError();
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <JobStatsContainer jobStats={jobStats} />
          {jobStats.monthlyApplications.length > 0 ? (
            <ChartsContainer
              monthlyApplications={jobStats.monthlyApplications}
            />
          ) : (
            <Wrapper>
              <h5>No charts to display</h5>
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

export default JobStats;
