import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
    searchTerm,
    totalJobs,
    numOfPages,
    status,
    jobType,
    sort,
  } = useAppSelector((state: RootState) => state.jobs);

  const { deleteJobError, deleteJobSuccess } = useAppSelector(
    (state: RootState) => state.job
  );

  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        fetchJobs({
          page,
          searchTerm,
          status,
          jobType,
          sort,
          token: user.token,
        })
      );
    }
  }, [dispatch, jobType, page, searchTerm, sort, status, user, user?.token]);

  useEffect(() => {
    if (deleteJobError) {
      toast.error(
        'An error happened while deleting the job. Please try again.'
      );
    }
  }, [deleteJobError]);

  useEffect(() => {
    if (deleteJobSuccess && user) {
      dispatch(
        fetchJobs({
          page,
          searchTerm,
          status,
          jobType,
          sort,
          token: user.token,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteJobSuccess]);

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
