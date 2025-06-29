import { MouseEventHandler } from 'react';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/auth/selectors';
import { AuthorizationStatus, RoutePath } from '../../const';
import { useNavigate } from 'react-router-dom';

type FavoriteButtonProps = {
  isFavorite: boolean | undefined;
  handleClick: () => void;
  isBigButton?: boolean;
}

const getButtonClass = (isFavorite: boolean | undefined, isBigButton: boolean | undefined) => {
  if(isFavorite && !isBigButton) {
    return 'place-card__bookmark-button--active place-card__bookmark-button button';
  } else if(!isFavorite && !isBigButton) {
    return 'place-card__bookmark-button  button';
  } else if(isFavorite && isBigButton) {
    console.log('big!!!');

    return 'offer__bookmark-button offer__bookmark-button--active place-card__bookmark-button--active button';
  } else {
    return 'offer__bookmark-button button';
  }
};

const getSizes = (isBigButton: boolean) => isBigButton ? {width: 31, height: 33} : {width: 18, height: 19};

export default function FavoriteButton({isFavorite, handleClick, isBigButton}: FavoriteButtonProps) {
  const authStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const sizes = getSizes(Boolean(isBigButton));

  const onFavoriteClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if(authStatus !== AuthorizationStatus.Auth) {
      navigate(RoutePath.Login);
    } else {
      handleClick();
    }
  };

  return (
    <button className={getButtonClass(isFavorite, isBigButton)} type="button" onClick={onFavoriteClick}>
      <svg className= "place-card__bookmark-icon" width={sizes.width} height={sizes.height}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
