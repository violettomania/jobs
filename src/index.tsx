import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/App';
import { store } from './state/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    <ToastContainer position='bottom-right' />
  </React.StrictMode>
);
