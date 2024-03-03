import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';
import { useRehydrateOnPageRefresh } from '../../hooks/useRehydrateOnPageRefresh';

const SharedLayout = () => {
  const [smallSidebarOpen, setSmallSidebarOpen] = useState(false);
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true);

  useRehydrateOnPageRefresh('/dashboard');

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
