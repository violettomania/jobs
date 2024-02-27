import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';

const Login = () => {
  return (
    <Wrapper className='full-page'>
      <form className='form'>
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
            value=''
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
            value=''
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
