import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import LogoImage from '../components/svg/LogoImage';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooksWrapper';
import { registerUser } from '../state/actions/registerUser';
import { setRegisterPending } from '../state/slices/userSlice';
import { RootState } from '../state/store/store';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state: RootState) => state.user.loading);
  const error = useAppSelector((state: RootState) => state.user.error);
  const registerPending = useAppSelector(
    (state: RootState) => state.user.registerPending
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
    if (error && error !== 'Rejected') {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (registerPending) {
      dispatch(setRegisterPending(false));
      toast.success('registration successful');
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerPending]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Link to='/'>
          <LogoImage />
        </Link>
        <h3>Register</h3>
        <FormRow
          type='text'
          name='name'
          value={name}
          handleChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
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
