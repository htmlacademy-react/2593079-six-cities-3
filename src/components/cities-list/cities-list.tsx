import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store';
import { changeCity } from '../../store/app/app';
import { memo } from 'react';
import { Cities } from '../../const';

type CitiesListProps = {
  activeCity: string;
}

function CitiesList({activeCity}: CitiesListProps): JSX.Element {
  const cities = Cities;
  const dispatch = useAppDispatch();
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={`${city}-1`} className="locations__item">
            <NavLink onClick={() => dispatch(changeCity(city))} className={`${city === activeCity ? 'tabs__item--active' : ''} locations__item-link tabs__item`} to="/">
              <span>{city}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const MemoizedCitiesList = memo(CitiesList);

