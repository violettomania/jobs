import { Link } from 'react-router-dom';

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
            <Link to='/'>
              <Logo />
            </Link>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
