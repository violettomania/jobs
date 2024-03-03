import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';

import Logo from './Logo';
import NavLinks from './NavLinks';

interface SmallSidebarProps {
  onSidebarToggle: () => void;
}

// TODO: doesn't close when choosing a link
export const SmallSidebar = ({ onSidebarToggle }: SmallSidebarProps) => {
  return (
    <Wrapper>
      <div className='sidebar-container show-sidebar'>
        <div className='content'>
          <button className='close-btn' onClick={onSidebarToggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
