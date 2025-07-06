import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkLogin, fetchOffersAction } from './store/api-action';
import HistoryRouter from './components/history-router/history-router.tsx';
import browserHistory from './browser-history.ts';
import App from './components/app-component/app.tsx';

store.dispatch(fetchOffersAction());
store.dispatch(checkLogin());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </React.StrictMode>
  </Provider>
);
