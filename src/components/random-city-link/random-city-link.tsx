import { Link, useNavigate } from 'react-router-dom';
import { getRandomElement } from '../../utils';
import { Cities, RoutePath } from '../../const';
import { MouseEventHandler } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { changeCity } from '../../store/app/app';


export default function RandomCityLink(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentCity = getRandomElement(Cities);


  const onRandomLinkClick:MouseEventHandler = (e) => {
    e.preventDefault();
    if(currentCity) {
      dispatch(changeCity(currentCity));
      navigate('/');
    }
  };

  return (
    <div className="locations__item">
      <Link className="locations__item-link" to={RoutePath.Main} onClick={onRandomLinkClick}>
        <span>{currentCity}</span>
      </Link>
    </div>
  );
}
