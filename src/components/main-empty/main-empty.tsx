import { Cities } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getActiveCity } from '../../store/app/selectors';
import {MemoizedCitiesList} from '../cities-list/cities-list';

export default function MainEmpty(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  return (
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <MemoizedCitiesList activeCity={activeCity} cities={Cities}/>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
            </div>
          </section>
          <div className="cities__right-section"/>
        </div>
      </div>
    </main>
  );

}
