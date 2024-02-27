import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SharedLayout from '../assets/wrappers/SharedLayout';
import Error from '../pages/Error';
import Landing from '../pages/Landing';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />} />
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='bottom-right' />
    </BrowserRouter>
  );
}
