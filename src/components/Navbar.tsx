import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Navbar';
import { useAppDispatch } from '../hooks/reduxHooksWrapper';
import { logout } from '../state/slices/userSlice';

import { Logo } from '.';

interface NavbarProps {
  onSidebarToggle: () => void;
  userName: string;
}

const Navbar = ({ onSidebarToggle, userName }: NavbarProps) => {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/landing');
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={onSidebarToggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Link to='/'>
            <Logo />
            <h3 className='logo-text'>dashboard</h3>
          </Link>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {userName}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
