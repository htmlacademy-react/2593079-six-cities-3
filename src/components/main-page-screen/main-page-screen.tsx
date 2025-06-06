import { useState } from 'react';
import OffersList from '../offers-list/offers-list';
import { Cities } from '../../const';
import { filterByCity } from '../../utils';
import Map from '../map/map';
import { useAppSelector } from '../../hooks/store';
import CitiesList from '../cities-list/cities-list';
import { Offer } from '../../mocks/offers';

type MainPageScreenProps = {
  offers: Offer[] | undefined;
}

export default function MainPageScreen({offers}: MainPageScreenProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const handleActiveOfferChange = (activeOfferId: string) => setActiveOffer(activeOfferId);

  const filteredOffers = filterByCity(offers, activeCity);
  const activeCityData = filteredOffers?.length ? filteredOffers[0].city : null;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList cities={Cities} activeCity={activeCity}/>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers?.length} places to stay in {activeCity}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by   </span>
              <span className="places__sorting-type" tabIndex={0}>
                   Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <OffersList offers={filteredOffers} onChange={handleActiveOfferChange}/>
          </section>
          <div className="cities__right-section">
            {activeCityData &&
            <section className="cities__map map">
              <Map points={filteredOffers} activePoint={activeOffer} city={activeCityData}></Map>
            </section>}
          </div>
        </div>
      </div>
    </main>
  );

}
