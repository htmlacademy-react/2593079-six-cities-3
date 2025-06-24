import { useState } from 'react';
import OffersList from '../offers-list/offers-list';
import { Cities, OptionsTypes, RequestStatus, SortFunctions } from '../../const';
import { filterByCity } from '../../utils';
import Map from '../map/map';
import { useAppSelector } from '../../hooks/store';
import CitiesList from '../cities-list/cities-list';
import OptionsList from '../options-list/options-list';
import { Offer } from '../../types';
import Spinner from '../spinner/spinner';
import { getActiveCity } from '../../store/app/selectors';
import { getOffersStatus } from '../../store/data/selectors';

type MainPageScreenProps = {
  offers: Offer[];
}

export default function MainPageScreen({offers}: MainPageScreenProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersStatus = useAppSelector(getOffersStatus);
  const [currentOption, setCurrentOption] = useState<OptionsTypes>(OptionsTypes.POP);
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const handleActiveOfferChange = (activeOfferId: string) => setActiveOffer(activeOfferId);

  let filteredOffers = filterByCity(offers, activeCity);
  if(currentOption !== OptionsTypes.POP) {
    filteredOffers = SortFunctions[currentOption](filteredOffers);
  }
  const activeCityData = filteredOffers.length ? filteredOffers[0].city : null;

  if(offersStatus === RequestStatus.Pending) {
    return <Spinner/>;
  }

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
            <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
            <OptionsList currentOption={currentOption} changeOption={setCurrentOption}/>
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
