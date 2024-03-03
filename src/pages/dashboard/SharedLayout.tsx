import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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

  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // prevent logout on page refresh
  useEffect(() => {
    if (!userLoggedIn) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userObj = JSON.parse(userString);
        dispatch(resetUser(userObj));
        navigate('/');
      }
    }
  }, [dispatch, navigate, userLoggedIn]);

  const handleSmallSidebarToggle = () => {
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  const handleBigSidebarToggle = () => {
    setBigSidebarOpen(!bigSidebarOpen);
    setSmallSidebarOpen(!smallSidebarOpen);
  };

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
