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
} from '../../state/slices/jobSlice';
import { RootState } from '../../state/store/store';

const AddJob = () => {
  const {
    loading,
    jobTypeOptions,
    statusOptions,
    isEditing,
    editedJobId,
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
    jobAdded,
  } = useAppSelector((state: RootState) => state.job);

  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.isDemo) return;
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields');
      return;
    }
    const job = {
      _id,
      position,
      company,
      jobLocation,
      jobType,
      createdAt,
      status,
    };
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
          company,
          jobLocation,
          jobType,
          position,
          status,
          token: user?.token,
        })
      );
    }
  };

  const handleJobInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (user?.isDemo) return;
    const name = e.target.name as keyof JobState;
    const value = e.target.value;
    console.log(
      'name',
      name,
      'value',
      value,
      'status',
      status,
      'jobType',
      jobType
    );
    dispatch(handleJobChange({ name, value }));
  };

  //   useEffect(() => {
  //     if (jobAdded) {
  //       toast.success('Job added successfully');
  //     } else {
  //       toast.error('Error adding job; please try again');
  //     }
  //   }, [jobAdded]);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
            disabled={loading || user?.isDemo}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
            disabled={loading || user?.isDemo}
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
            disabled={loading || user?.isDemo}
          />
          {/* status */}
          <FormRowSelect
            name='status'
            labelText='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
            disabled={user?.isDemo}
          />
          {/* job type*/}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
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
