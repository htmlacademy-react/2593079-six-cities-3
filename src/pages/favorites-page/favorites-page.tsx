// import Footer from '../../components/footer/footer';
// import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
// import OffersList from '../../components/offers-list/offers-list';
import OffersList from '../../components/offers-list/offers-list';
import { useAppSelector } from '../../hooks/store';
import { getOffers } from '../../store/data/selectors';


export default function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favoritedOffers = offers.filter((offer) => offer.isFavorite);
  const uniquePlaces = favoritedOffers.reduce<string[]>((uniqueCities, offer) => {
    if(uniqueCities.indexOf(offer.city.name) === -1) {
      uniqueCities.push(offer.city.name);
    }
    return uniqueCities;
  } , []).sort();
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
                  <OffersList offers={filteredOffers} isForFavPage/>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>

  );
}
