import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    }
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Link to='/'>
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
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <button type='button' className='btn btn-block btn-hipster'>
          demo app
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
