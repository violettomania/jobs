import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useAppDispatch } from '../hooks/reduxHooksWrapper';

const PageBtnContainer = () => {
  const dispatch = useAppDispatch();

  //   const pages = Array.from({ length: numOfPages }, (_, index) => {
  //     return index + 1;
  //   });

  //   const nextPage = () => {
  //     let newPage = page + 1;
  //     if (newPage > numOfPages) {
  //       newPage = 1;
  //     }
  //     dispatch(changePage(newPage));
  //   };
  //   const prevPage = () => {
  //     let newPage = page - 1;
  //     if (newPage < 1) {
  //       newPage = numOfPages;
  //     }
  //     dispatch(changePage(newPage));
  //   };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={() => {}}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {/* {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              //       className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })} */}
      </div>
      <button type='button' className='next-btn' onClick={() => {}}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
