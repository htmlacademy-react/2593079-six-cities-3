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
import { offersMock } from './mocks/offers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={RoutePath.Main} element={<Layout isLogged/>}>
        <Route index element={<App offers={offersMock}/>}/>
        <Route path={RoutePath.Offer} element={<OfferPage authorizationStatus={AuthorizationStatus.Auth}/>}/>
        <Route path={RoutePath.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage offers={offersMock}/>
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
