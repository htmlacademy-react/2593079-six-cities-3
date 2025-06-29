import { useNavigate } from 'react-router-dom';
import { getRandomElement } from '../../utils';
import { Cities } from '../../const';
import { MouseEventHandler } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { changeCity } from '../../store/app/app';

const currentCity = getRandomElement(Cities);

export default function RandomCityLink(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onRandomLinkClick:MouseEventHandler = (e) => {
    e.preventDefault();
    if(currentCity) {
      dispatch(changeCity(currentCity));
      navigate('/');
    }
  };

  return (
    <div className="locations__item">
      <a className="locations__item-link" href="/" onClick={onRandomLinkClick}>
        <span>{currentCity}</span>
      </a>
    </div>
  );
}
