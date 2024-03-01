import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from '../components/Logo';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { toggleSidebar } from '../state/slices/sidebarSlice';
import { RootState } from '../state/store/store';

import NavLinks from './NavLinks';

const BigSidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? 'sidebar-container '
            : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={handleToggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
