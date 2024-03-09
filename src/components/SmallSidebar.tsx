import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/SmallSidebar';

import NavLinks from './NavLinks';

import { Logo } from '.';

interface SmallSidebarProps {
  onSidebarToggle: () => void;
}

export const SmallSidebar = ({ onSidebarToggle }: SmallSidebarProps) => {
  return (
    <Wrapper>
      <div className='sidebar-container show-sidebar'>
        <div className='content'>
          <button className='close-btn' onClick={onSidebarToggle}>
            <FaTimes />
          </button>
          <header>
            <Link to='/'>
              <Logo />
            </Link>
          </header>
          <NavLinks onSidebarToggle={onSidebarToggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
