import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/reduxHooksWrapper';
import SharedLayout from '../pages/dashboard/SharedLayout';
import Error from '../pages/Error';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { RootState } from '../state/store/store';

export default function App() {
  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <Routes>
      <Route
        path='/'
        element={user ? <SharedLayout /> : <Navigate to='/landing' />}
      ></Route>
      <Route path='/landing' element={<Landing />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
  );
}
