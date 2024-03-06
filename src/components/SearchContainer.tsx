import { useState, ChangeEvent, useMemo } from 'react';

import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { FilterState, JobsState, search } from '../state/slices/jobsSlice';
import { clearFilters } from '../state/slices/jobsSlice';
import { RootState } from '../state/store/store';

import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [jobType, setJobType] = useState('all');
  const [sort, setSort] = useState('latest');

  const { loading, sortOptions } = useAppSelector(
    (state: RootState) => state.jobs
  );

  const { jobTypeOptions, statusOptions } = useAppSelector(
    (state: RootState) => state.job
  );

  const dispatch = useAppDispatch();

  const handleSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      search({
        name: e.target.name as keyof JobsState & FilterState,
        value: e.target.value,
      })
    );
  };

  const debounceSearch = useMemo(() => {
    let timeoutID: NodeJS.Timeout;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(
          search({
            name: e.target.name as keyof JobsState & FilterState,
            value: e.target.value,
          })
        );
      }, 1000);
    };
  }, [dispatch]);

  const handleClick = () => {
    setSearchTerm('');
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='searchTerm'
            value={searchTerm}
            handleChange={debounceSearch}
            disabled={false}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='status'
            value={status}
            handleChange={(e) => {
              setStatus(e.target.value);
              handleSearch(e);
            }}
            list={['all', ...statusOptions]}
          />
          {/* search by type*/}
          <FormRowSelect
            labelText='type'
            name='jobType'
            value={jobType}
            handleChange={(e) => {
              setJobType(e.target.value);
              handleSearch(e);
            }}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={(e) => {
              setSort(e.target.value);
              handleSearch(e);
            }}
            list={sortOptions}
            labelText='sort by'
          />
          <button
            className='btn btn-block btn-danger'
            disabled={loading}
            onClick={handleClick}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
