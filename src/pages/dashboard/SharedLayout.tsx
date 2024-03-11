import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';
import { useAppSelector } from '../../hooks/reduxHooksWrapper';
import { RootState } from '../../state/store/store';

interface SharedLayoutProps {
  children: React.ReactNode;
}

const SharedLayout = ({ children }: SharedLayoutProps) => {
  const [smallSidebarOpen, setSmallSidebarOpen] = useState(false);
  const [bigSidebarOpen, setBigSidebarOpen] = useState(true);

  const user = useAppSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const handleSmallSidebarToggle = () => {
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  const handleBigSidebarToggle = () => {
    setBigSidebarOpen(!bigSidebarOpen);
    setSmallSidebarOpen(!smallSidebarOpen);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          {smallSidebarOpen && (
            <SmallSidebar onSidebarToggle={handleSmallSidebarToggle} />
          )}
          <BigSidebar showSidebar={bigSidebarOpen} />
          <div>
            <Navbar
              onSidebarToggle={handleBigSidebarToggle}
              userName={user ? user.name : ''}
            />
            <div className='dashboard-page'>{children}</div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
