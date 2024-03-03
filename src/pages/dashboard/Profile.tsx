import { useState } from 'react';
import { toast } from 'react-toastify';

import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooksWrapper';
import { updateUser } from '../../state/actions/updateUser';
import { RootState } from '../../state/store/store';

const Profile = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const loading = useAppSelector((state: RootState) => state.user.loading);

  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.isDemo) return;
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields');
    } else {
      dispatch(updateUser(userData));
    }
  };

  // TODO: handle user update: rewrite localStorage, error message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.isDemo) return;
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
            disabled={loading || user?.isDemo}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
            disabled={loading || user?.isDemo}
          />
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
            disabled={loading || user?.isDemo}
          />
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
            disabled={loading || user?.isDemo}
          />
          {user?.isDemo || (
            <button type='submit' className='btn btn-block' disabled={loading}>
              {loading ? 'Please Wait...' : 'save changes'}
            </button>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
