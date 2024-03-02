import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import useUserStorage from '../hooks/useLocalStorage';
import { loginUser } from '../state/actions/loginUser';
import { RootState } from '../state/store/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loggedIn = useAppSelector((state: RootState) => state.user.loggedIn);
  const user = useAppSelector((state: RootState) => state.user.user);
  const loading = useAppSelector((state: RootState) => state.user.loading);
  const error = useAppSelector((state: RootState) => state.user.error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill out all fields');
    } else {
      if (user) dispatch(loginUser({ email, password, token: user.token }));
    }
  };

  const handleDemoUserLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      loginUser({
        email: 'testUser@test.com',
        password: 'secret',
        isDemo: true,
        token: user && user.token ? user.token : '',
      })
    );
  };

  useUserStorage();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Link to='/landing'>
          <Logo />
        </Link>
        <h3>Login</h3>
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
          onClick={handleDemoUserLogin}
          disabled={loading}
        >
          {loading ? 'loading...' : 'demo app'}
        </button>
        <p>
          Not a member yet?{' '}
          <Link to='/register' type='button' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
