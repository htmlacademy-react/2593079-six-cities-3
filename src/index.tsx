import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './components/App/app';
import Layout from './components/layout/layout';

const OFFERS_COUNT: number = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout isLogged={false}/>}>
        <Route index element={<App offersCount={OFFERS_COUNT}/>}>

        </Route>
      </Route>
    </Routes>
  </BrowserRouter>

);
