import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Wrapper from '../assets/wrappers/JobsContainer';
// import { getAllJobs } from '../features/allJobs/allJobsSlice';
import { useAppDispatch } from '../hooks/reduxHooksWrapper';

import Job from './Job';
import LoadingSpinner from './LoadingSpinner';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  //   const {
  //     jobs,
  //     isLoading,
  //     page,
  //     totalJobs,
  //     numOfPages,
  //     search,
  //     searchStatus,
  //     searchType,
  //     sort,
  //   } = useSelector((store) => store.allJobs);

  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //         dispatch(getAllJobs());
  //   }, [dispatch, page, search, searchStatus, searchType, sort]);

  //   if (loading) {
  //     return <LoadingSpinner />;
  //   }

  //   if (jobs.length === 0) {
  //     return (
  //       <Wrapper>
  //         <h2>No jobs to display...</h2>
  //       </Wrapper>
  //     );
  //   }

  return (
    <Wrapper>
      <h5>{/* {totalJobs} job{jobs.length > 1 && 's'} found */}</h5>
      <div className='jobs'>
        {/* {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })} */}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default JobsContainer;
