import { Routes, Route } from 'react-router-dom';

import AddJob from '../pages/dashboard/AddJob';
import Jobs from '../pages/dashboard/Jobs';
import Profile from '../pages/dashboard/Profile';
import SharedLayout from '../pages/dashboard/SharedLayout';
import Error from '../pages/Error';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

import JobStats from './JobStats';

export default function App() {
  return (
    <Routes>
      <Route path='/landing' element={<Landing />} />
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<JobStats />} />
        <Route path='all-jobs' element={<Jobs />} />
        <Route path='add-job' element={<AddJob />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
  );
}
