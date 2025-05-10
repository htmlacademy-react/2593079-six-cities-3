import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './components/App/app';
import Layout from './components/layout/layout';
import OfferPage from './pages/offer-page/offer-page';
import LoginPage from './pages/login-page/login-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import PrivateRoute from './components/private-route/private-route';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { AuthorizationStatus, RoutePath } from './const';

const OFFERS_COUNT: number = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={RoutePath.Main} element={<Layout isLogged={false}/>}>
        <Route index element={<App offersCount={OFFERS_COUNT}/>}/>
        <Route path={RoutePath.Offer} element={<OfferPage/>}/>
        <Route path={RoutePath.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage isFavoritesEmpty/>
          </PrivateRoute>
        }
        >
        </Route>

      </Route>
      <Route path={RoutePath.Login} element={<LoginPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>

    </Routes>
  </BrowserRouter>

);
