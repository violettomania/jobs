import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
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

  const handleDemoUserLogin = () => {
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

  // TODO: there's no error for not registered user
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
        <FormRow
          type='email'
          name='email'
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <FormRow
          type='password'
          name='password'
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
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
