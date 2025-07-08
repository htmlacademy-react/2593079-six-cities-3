import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { RoutePath } from '../../const';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Footer from '../footer/footer';

export default function App(): JSX.Element {
  return (

    <Routes>
      <Route path={RoutePath.Main} element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path={RoutePath.Offer} element={<OfferPage/>}/>
        <Route path={RoutePath.Favorites} element={
          <PrivateRoute>
            <>
              <FavoritesPage/>
              <Footer/>
            </>
          </PrivateRoute>
        }
        >
        </Route>

      </Route>
      <Route path={RoutePath.Login} element={
        <PrivateRoute onlyUnAuth>
          <LoginPage/>
        </PrivateRoute>
      }
      />
      <Route path="*" element={<NotFoundPage/>}/>

    </Routes>

  );
}
