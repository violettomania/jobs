import Wrapper from '../assets/wrappers/BigSidebar';

import NavLinks from './NavLinks';

import { Logo } from '.';

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
