import { useEffect } from 'react';
import {MemoizedOffersList} from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { } from '../../store/data/selectors';
import { getFavorites, getFavoritesStatus } from '../../store/favorites/selectors';
import { fetchFavorites } from '../../store/api-action';
import { RequestStatus } from '../../const';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';


export default function FavoritesPage(): JSX.Element {
  const favoritedOffers = useAppSelector(getFavorites);
  const uniquePlaces = favoritedOffers.reduce<string[]>((uniqueCities, offer) => {
    if(uniqueCities.indexOf(offer.city.name) === -1) {
      uniqueCities.push(offer.city.name);
    }
    return uniqueCities;
  } , []).sort();

  const dispatch = useAppDispatch();
  const favoritesStatus = useAppSelector(getFavoritesStatus);


  useEffect(() => {
    if(favoritesStatus === RequestStatus.Idle) {
      dispatch(fetchFavorites);
    }
  });

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
              return (
                <li key={key} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
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
