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
      <Route path='/' element={<Landing />} />
      <Route
        path='stats'
        element={
          <SharedLayout>
            <JobStats />
          </SharedLayout>
        }
      />
      <Route
        path='all-jobs'
        element={
          <SharedLayout>
            <Jobs />
          </SharedLayout>
        }
      />
      <Route
        path='add-job'
        element={
          <SharedLayout>
            <AddJob />
          </SharedLayout>
        }
      />
      <Route
        path='profile'
        element={
          <SharedLayout>
            <Profile />
          </SharedLayout>
        }
      />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
  );
}
