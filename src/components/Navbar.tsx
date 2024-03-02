import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Navbar';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { logout } from '../state/slices/userSlice';
import { RootState } from '../state/store/store';
import clearCookie from '../util/clearCookie';

import Logo from './Logo';

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const [showLogout, setShowLogout] = useState(false);

  const user = useAppSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    clearCookie('token');
    navigate('/landing');
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={onSidebarToggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
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
