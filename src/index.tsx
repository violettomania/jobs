import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/order
import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App';
import LoadingSpinner from './components/LoadingSpinner';
import store, { persistor } from './state/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    <ToastContainer position='bottom-right' />
  </React.StrictMode>
);
