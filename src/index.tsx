import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position='bottom-right' />
  </React.StrictMode>
);
