import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';
import { useAppSelector } from '../../hooks/reduxHooksWrapper';
import { useRehydrateOnPageRefresh } from '../../hooks/useRehydrateOnPageRefresh';
import { RootState } from '../../state/store/store';

const SharedLayout = () => {
  const [smallSidebarOpen, setSmallSidebarOpen] = useState(false);
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true);

  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );

  const navigate = useNavigate();

  useRehydrateOnPageRefresh('/');

  const handleSmallSidebarToggle = () => {
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  const handleBigSidebarToggle = () => {
    setBigSidebarOpen(!bigSidebarOpen);
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/landing');
    }
  }, [navigate, userLoggedIn]);

  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          {smallSidebarOpen && (
            <SmallSidebar onSidebarToggle={handleSmallSidebarToggle} />
          )}
          <BigSidebar showSidebar={bigSidebarOpen} />
          <div>
            <Navbar onSidebarToggle={handleBigSidebarToggle} />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
