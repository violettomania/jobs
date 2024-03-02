import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';

const SharedLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          {sidebarOpen && (
            <SmallSidebar onSidebarToggle={handleSidebarToggle} />
          )}
          <BigSidebar />
          <div>
            <Navbar />
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
