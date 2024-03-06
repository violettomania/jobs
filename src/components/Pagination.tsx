import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { changePage } from '../state/slices/jobsSlice';
import { RootState } from '../state/store/store';

const Pagination = () => {
  const { page, numOfPages } = useAppSelector((state: RootState) => state.jobs);
  const dispatch = useAppDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const handleNextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const handlePrevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={handlePrevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type='button' className='next-btn' onClick={handleNextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default Pagination;
