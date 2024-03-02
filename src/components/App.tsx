import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SharedLayout from '../pages/dashboard/SharedLayout';
import Error from '../pages/Error';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { store } from '../state/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}></Route>
          <Route path='/landing' element={<Landing />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

// TODO: user resets to null on page refresh: add setUser to userSlice, if user is null, get it from localStorage and fire the event
