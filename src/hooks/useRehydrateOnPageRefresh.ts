import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetUser } from '../state/slices/userSlice';
import { RootState } from '../state/store/store';

import { useAppDispatch, useAppSelector } from './reduxHooksWrapper';

export const useRehydrateOnPageRefresh = (navigatePath?: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );

  useEffect(() => {
    if (!userLoggedIn) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userObj = JSON.parse(userString);
        dispatch(resetUser(userObj));
        if (navigatePath) {
          navigate(navigatePath);
        }
      }
    }
  }, [dispatch, navigate, userLoggedIn, navigatePath]);
};
