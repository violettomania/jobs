import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from '../pages/Error';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
