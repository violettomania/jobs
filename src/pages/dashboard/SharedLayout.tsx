import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooksWrapper';
import { resetUser } from '../../state/slices/userSlice';
import { RootState } from '../../state/store/store';

const SharedLayout = () => {
  const [smallSidebarOpen, setSmallSidebarOpen] = useState(false);
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true);

  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();

  const handleSmallSidebarToggle = () => {
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  const handleBigSidebarToggle = () => {
    setBigSidebarOpen(!bigSidebarOpen);
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  useEffect(() => {
    if (!user) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userObj = JSON.parse(userString);
        dispatch(resetUser(userObj));
      }
    }
  }, [dispatch, user]);

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
