import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Job';
import { useAppDispatch } from '../hooks/reduxHooksWrapper';

import JobInfo from './JobInfo';

interface JobProps {
  job: Job;
}

const SingleJob = ({ job }: JobProps) => {
  const dispatch = useAppDispatch();

  const date = moment(job.createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{job.company.charAt(0)}</div>
        <div className='info'>
          <h5>{job.position}</h5>
          <p>{job.company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={job.jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={job.jobType} />
          <div className={`status ${job.status}`}>{job.status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              //       onClick={() =>
              //         dispatch(
              //           setEditJob({
              //             editJobId: _id,
              //             position,
              //             company,
              //             jobLocation,
              //             jobType,
              //             status,
              //           })
              //         )
              //       }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              //       onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default SingleJob;
