import { Routes, Route } from 'react-router-dom';

import SharedLayout from '../pages/dashboard/SharedLayout';
import Error from '../pages/Error';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/dashboard' element={<SharedLayout />}></Route>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
  );
}
