import { useState, useMemo } from 'react';

import Wrapper from '../assets/wrappers/SearchContainer';
// import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');

  //   const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
  //     useSelector((store) => store.allJobs);

  //   const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  //   const dispatch = useDispatch();

  //   const handleSearch = (e) => {
  //     dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  //   };

  //   const debounce = () => {
  //     let timeoutID;
  //     return (e) => {
  //       setLocalSearch(e.target.value);
  //       clearTimeout(timeoutID);
  //       timeoutID = setTimeout(() => {
  //         dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  //       }, 1000);
  //     };
  //   };

  //   const optimizedDebounce = useMemo(() => debounce(), [debounce]);

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     setLocalSearch('');
  //     dispatch(clearFilters());
  //   };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={() => {}}
            disabled={false}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value=''
            handleChange={() => {}}
            list={['all']}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value=''
            handleChange={() => {}}
            list={['all']}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value=''
            handleChange={() => {}}
            list={['all']}
            labelText='sort by'
          />
          <button
            className='btn btn-block btn-danger'
            //     disabled={loading}
            //     onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
