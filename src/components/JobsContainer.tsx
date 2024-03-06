import { useEffect } from 'react';

import Wrapper from '../assets/wrappers/JobsContainer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { fetchJobs } from '../state/actions/fetchJobs';
import { RootState } from '../state/store/store';

import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import SingleJob from './SingleJob';

const JobsContainer = () => {
  const {
    jobs,
    loading,
    page,
    totalJobs,
    numOfPages,
    search,
    status,
    jobType,
    sort,
  } = useAppSelector((state: RootState) => state.jobs);

  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        fetchJobs({
          status: 'all',
          jobType: 'all',
          sort: 'latest',
          token: user.token,
          page: 1,
        })
      );
    }
  }, [dispatch, page, search, sort, user, user?.token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <SingleJob key={job._id} job={job} />;
        })}
      </div>
      {numOfPages > 1 && <Pagination />}
    </Wrapper>
  );
};

export default JobsContainer;
