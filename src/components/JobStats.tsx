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

  const { loading, jobStats, error } = useAppSelector(
    (state: RootState) => state.jobStats
  );

  useEffect(() => {
    if (user) {
      resetError();
      dispatch(fetchJobStats({ token: user.token }));
    }
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
