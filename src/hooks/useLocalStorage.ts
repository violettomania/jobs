import { useEffect } from 'react';

import { RootState } from '../state/store/store';
import setCookie from '../util/setCookie';

import { useAppSelector } from './reduxHooksWrapper';

const useUserStorage = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setCookie('token', user.token, 7);
    }
  }, [user]);
};

export default useUserStorage;
