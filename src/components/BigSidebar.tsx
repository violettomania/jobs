import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from '../components/Logo';

import NavLinks from './NavLinks';

interface BigSidebarProps {
  showSidebar: boolean;
}

const BigSidebar = ({ showSidebar }: BigSidebarProps) => {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container '
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
