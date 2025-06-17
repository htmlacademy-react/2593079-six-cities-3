import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AuthorizationStatus, RoutePath } from '../../const';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';


export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.Main} element={<Layout isLogged/>}>
          <Route index element={<MainPage/>}/>
          <Route path={RoutePath.Offer} element={<OfferPage authorizationStatus={AuthorizationStatus.Auth}/>}/>
          <Route path={RoutePath.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage/>
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
}


//  return (
//     <MainPage offers={offers}/>
//   );
