import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/app';

const OFFERS_COUNT: number = 312;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_COUNT}/>
  </React.StrictMode>
);
