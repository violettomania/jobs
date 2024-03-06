import { useState, ChangeEvent, useEffect, useMemo } from 'react';

import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { search } from '../state/slices/jobsSlice';
import { clearFilters } from '../state/slices/jobsSlice';
import { RootState } from '../state/store/store';

import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, status, jobType, sort, sortOptions } = useAppSelector(
    (state: RootState) => state.jobs
  );

  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store: RootState) => store.job
  );

  const dispatch = useAppDispatch();

  const handleSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(search(e.target.value));
  };

  const debounceSearch = useMemo(() => {
    let timeoutID: NodeJS.Timeout;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(search(e.target.value));
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
            name='search'
            value={searchTerm}
            handleChange={debounceSearch}
            disabled={false}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={status}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={jobType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
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
