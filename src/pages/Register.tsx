import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { registerUser } from '../state/actions/registerUser';
import { redirect } from '../state/slices/userSlice';
import { RootState } from '../state/store/store';
import setCookie from '../util/setCookie';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state: RootState) => state.user.loading);
  const user = useAppSelector((state: RootState) => state.user.user);
  const error = useAppSelector((state: RootState) => state.user.error);
  const redirectToLogin = useAppSelector(
    (state: RootState) => state.user.redirectToLogin
  );

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill out all fields');
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user && !localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(user));
      setCookie('token', user.token, 7);
    }
  }, [user]);

  useEffect(() => {
    if (redirectToLogin) {
      dispatch(redirect(false));
      navigate('/login');
    }
  }, [dispatch, navigate, redirectToLogin]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Link to='/'>
          <Logo />
        </Link>
        <h3>Register</h3>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input
            id='name'
            type='text'
            name='name'
            className='form-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            email
          </label>
          <input
            id='email'
            type='email'
            name='email'
            className='form-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>
            password
          </label>
          <input
            id='password'
            type='password'
            name='password'
            className='form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-block' disabled={loading}>
          {loading ? 'loading...' : 'submit'}
        </button>
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={loading}
        >
          {loading ? 'loading...' : 'demo app'}
        </button>
        <p>
          Already a member?{' '}
          <Link to='/login' type='button' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
