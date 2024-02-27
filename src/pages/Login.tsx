import Wrapper from '../assets/wrappers/RegisterPage';

const Login = () => {
  return (
    <Wrapper className='full-page'>
      <form className='form'>
        <img
          src='/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg'
          alt='jobster logo'
          className='logo'
        />
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
          Not a member yet?
          <button type='button' className='member-btn'>
            Register
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
