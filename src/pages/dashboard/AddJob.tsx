import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooksWrapper';
import { createJob } from '../../state/actions/createJob';
import { editJob } from '../../state/actions/editJob';
import {
  handleJobChange,
  clearValues,
  JobState,
  resetErrorsAndSuccesses,
} from '../../state/slices/jobSlice';
import { RootState } from '../../state/store/store';

const AddJob = () => {
  const {
    job,
    loading,
    jobTypeOptions,
    statusOptions,
    isEditing,
    editedJobId,
    addJobSuccess,
    addJobError,
    editJobSuccess,
    editJobError,
  } = useAppSelector((state: RootState) => state.job);

  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.isDemo) return;
    if (!job.position || !job.company || !job.jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    if (user) {
      if (isEditing) {
        dispatch(
          editJob({
            jobId: editedJobId,
            job: { ...job },
            token: user?.token,
          })
        );
        return;
      }
      dispatch(
        createJob({
          company: job.company,
          jobLocation: job.jobLocation,
          jobType: job.jobType,
          position: job.position,
          status: job.status,
          token: user?.token,
        })
      );
    }
  };

  const handleJobInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (user?.isDemo) return;
    const name = e.target.name as keyof JobState & keyof Job;
    const value = e.target.value;
    dispatch(handleJobChange({ name, value }));
  };

  useEffect(() => {
    if (addJobSuccess) {
      toast.success('Job added successfully');
      dispatch(resetErrorsAndSuccesses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addJobSuccess]);

  useEffect(() => {
    if (addJobError) {
      toast.error('Error adding job, please try again');
      dispatch(resetErrorsAndSuccesses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addJobError]);

  useEffect(() => {
    if (editJobSuccess) {
      navigate('/jobs');
      toast.success('Job edited successfully');
      dispatch(resetErrorsAndSuccesses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editJobSuccess]);

  useEffect(() => {
    if (editJobError) {
      toast.error('Error editing job, please try again');
      dispatch(resetErrorsAndSuccesses());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editJobError]);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={job.position}
            handleChange={handleJobInput}
            disabled={loading || user?.isDemo}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={job.company}
            handleChange={handleJobInput}
            disabled={loading || user?.isDemo}
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={job.jobLocation}
            handleChange={handleJobInput}
            disabled={loading || user?.isDemo}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            labelText='status'
            value={job.status}
            handleChange={handleJobInput}
            list={statusOptions}
            disabled={user?.isDemo}
          />
          {/* job type*/}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={job.jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
            disabled={user?.isDemo}
          />
          {user?.isDemo || (
            <div className='btn-container'>
              <button
                type='button'
                className='btn btn-block clear-btn'
                onClick={() => dispatch(clearValues())}
              >
                clear
              </button>
              <button
                type='submit'
                className='btn btn-block submit-btn'
                disabled={loading}
              >
                submit
              </button>
            </div>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
