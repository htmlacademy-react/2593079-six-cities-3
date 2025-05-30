import { useState } from 'react';
import OffersList from '../offers-list/offers-list';
import { Offer } from '../../mocks/offers';
import { Cities } from '../../const';
import { NavLink } from 'react-router-dom';
import { filterByCity } from '../../utils';
import Map from '../map/map';

type MainPageScreenProps = {
  offers: Offer[];
}

export default function MainPageScreen({offers}: MainPageScreenProps): JSX.Element {
  const [activeCityFilter, setCityFilter] = useState('Amsterdam');
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  const handleChangeFilter = (newFilter: string) => setCityFilter(newFilter);
  const handleActiveOfferChange = (activeOfferId: string) => setActiveOffer(activeOfferId);

  const filteredOffers = filterByCity(offers, activeCityFilter);
  const cityData = filteredOffers[0]?.city;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cities.map((city) => (
              <li key={`${city}-1`} className="locations__item">
                <NavLink onClick={() => handleChangeFilter(city)} className={`${city === activeCityFilter ? 'tabs__item--active' : ''} locations__item-link tabs__item`} to="/">
                  <span>{city}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} places to stay in {activeCityFilter}</b>
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
            {filteredOffers.length > 0 &&
            <section className="cities__map map">
              <Map points={filteredOffers} activePoint={activeOffer} city={cityData}></Map>
            </section>}
          </div>
        </div>
      </div>
    </main>
  );

}
