import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './components/App/app';
import Layout from './components/layout/layout';
import OfferPage from './pages/offer-page/offer-page';
import LoginPage from './pages/login-page/login-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import PrivateRoute from './components/private-route/private-route';
import NotFoundPage from './pages/not-found-page/not-found-page';

const OFFERS_COUNT: number = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout isLogged={false}/>}>
        <Route index element={<App offersCount={OFFERS_COUNT}/>}/>
        <Route path="offer/:id" element={<OfferPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="favorites" element={
          <PrivateRoute>
            <FavoritesPage isFavoritesEmpty={false}/>
          </PrivateRoute>
        }
        >
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>

      </Route>
    </Routes>
  </BrowserRouter>

);
