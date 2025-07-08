import { MouseEventHandler, useEffect } from 'react';
import {MemoizedOffersList} from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { } from '../../store/data/selectors';
import { getFavorites, getFavoritesStatus } from '../../store/favorites/selectors';
import { fetchFavorites } from '../../store/api-action';
import { AuthorizationStatus, RequestStatus, RoutePath } from '../../const';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { Link, useOutletContext } from 'react-router-dom';
import { getAuthStatus } from '../../store/auth/selectors';
import { changeCity } from '../../store/app/app';


export default function FavoritesPage(): JSX.Element {
  const favoritedOffers = useAppSelector(getFavorites);
  const authorizationStatus = useAppSelector(getAuthStatus);
  const uniquePlaces = favoritedOffers.reduce<string[]>((uniqueCities, offer) => {
    if(uniqueCities.indexOf(offer.city.name) === -1) {
      uniqueCities.push(offer.city.name);
    }
    return uniqueCities;
  } , []);


  const dispatch = useAppDispatch();
  const favoritesStatus = useAppSelector(getFavoritesStatus);

  const { setPageClass } = useOutletContext<{ setPageClass: (cls: string) => void }>();
  useEffect(() => {
    setPageClass('');
  }, [setPageClass]);


  useEffect(() => {
    if(favoritesStatus === RequestStatus.Idle && authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavorites);
    }
  }, [favoritesStatus, dispatch, authorizationStatus]);

  if(!favoritedOffers.length) {
    return <FavoritesEmpty/>;
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {uniquePlaces.map((city, id) => {
              const filteredOffers = favoritedOffers.filter((offer) => offer.city.name === city);
              const key = `${id}-city`;
              const onCityLinkClick: MouseEventHandler = () => dispatch(changeCity(city));
              return (
                <li key={key} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={RoutePath.Main} onClick={onCityLinkClick}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <MemoizedOffersList offers={filteredOffers} isForFavPage/>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>

  );
}
