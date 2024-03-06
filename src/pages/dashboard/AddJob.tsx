import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooksWrapper';
import { createJob } from '../../state/actions/createJob';
import { editJob } from '../../state/actions/editJob';
import { handleChange, clearValues } from '../../state/slices/jobSlice';
import { RootState } from '../../state/store/store';

const AddJob = () => {
  const {
    loading,
    jobTypeOptions,
    statusOptions,
    isEditing,
    editedJobId,
    job,
  } = useAppSelector((state: RootState) => state.job);

  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const handleClick = () => {
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
      dispatch(createJob({ job: { ...job }, token: user?.token }));
    }
  };

  const handleJobInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing && user) {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user.location,
        })
      );
    }
  }, [dispatch, isEditing, user]);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={job.position}
            handleChange={handleJobInput}
            disabled={loading}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={job.company}
            handleChange={handleJobInput}
            disabled={loading}
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={job.jobLocation}
            handleChange={handleJobInput}
            disabled={loading}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            labelText='status'
            value={job.status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          {/* job type*/}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={job.jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
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
              onClick={handleClick}
              disabled={loading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
