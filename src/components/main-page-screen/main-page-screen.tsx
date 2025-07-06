import { useCallback, useEffect, useState } from 'react';
import {MemoizedOffersList} from '../offers-list/offers-list';
import { OptionsTypes, RequestStatus, SortFunctions } from '../../const';
import { filterByCity } from '../../utils';
import {MemoizedMap} from '../map/map';
import { useAppSelector } from '../../hooks/store';
import {MemoizedCitiesList} from '../cities-list/cities-list';
import OptionsList from '../options-list/options-list';
import { Offer } from '../../types';
import Spinner from '../spinner/spinner';
import { getActiveCity } from '../../store/app/selectors';
import { getOffersStatus } from '../../store/data/selectors';
import MainEmpty from '../main-empty/main-empty';
import { useOutletContext } from 'react-router-dom';

type MainPageScreenProps = {
  offers: Offer[];
}

export default function MainPageScreen({offers}: MainPageScreenProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersStatus = useAppSelector(getOffersStatus);
  const [currentOption, setCurrentOption] = useState<OptionsTypes>(OptionsTypes.POP);
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const handleActiveOfferChange = useCallback((activeOfferId: string) => setActiveOffer(activeOfferId), []);
  const { setPageClass } = useOutletContext<{ setPageClass: (cls: string) => void }>();

  useEffect(() => {
    setPageClass('page--gray page--main');

  }, [setPageClass]);

  let filteredOffers = filterByCity(offers, activeCity);
  if(currentOption !== OptionsTypes.POP) {
    filteredOffers = SortFunctions[currentOption](filteredOffers);
  }
  const activeCityData = filteredOffers.length ? filteredOffers[0].city : null;


  if(offersStatus === RequestStatus.Pending) {
    return <Spinner/>;
  }

  if(!filteredOffers.length) {
    return <MainEmpty/>;
  }


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <MemoizedCitiesList activeCity={activeCity}/>
      </div>

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} {filteredOffers.length > 1 ? 'places' : 'place'} to stay in {activeCity}</b>
            <OptionsList currentOption={currentOption} changeOption={setCurrentOption}/>
            <MemoizedOffersList offers={filteredOffers} onChange={handleActiveOfferChange}/>
          </section>
          <div className="cities__right-section">
            {activeCityData &&
            <section className="cities__map map">
              <MemoizedMap points={filteredOffers} activePoint={activeOffer} city={activeCityData}></MemoizedMap>
            </section>}
          </div>
        </div>
      </div>


    </main>
  );

}
