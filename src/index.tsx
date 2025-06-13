import ReactDOM from 'react-dom/client';
import App from './components/App/app';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/api-action';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>


);
