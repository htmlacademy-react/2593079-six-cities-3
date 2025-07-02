import { MouseEventHandler, RefObject } from 'react';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/auth/selectors';
import { AuthorizationStatus, favoriteButtonSizes, RoutePath } from '../../const';
import { useNavigate } from 'react-router-dom';

type FavoriteButtonProps = {
  isFavorite: boolean | undefined;
  handleClick: () => void;
  isBigButton?: boolean;
  btnRef: RefObject<HTMLButtonElement>;
}

const getButtonClass = (isFavorite: boolean | undefined, isBigButton: boolean | undefined) => {
  if(isFavorite && !isBigButton) {
    return 'place-card__bookmark-button--active place-card__bookmark-button button';
  } else if(!isFavorite && !isBigButton) {
    return 'place-card__bookmark-button button';
  } else if(isFavorite && isBigButton) {
    return 'offer__bookmark-button offer__bookmark-button--active place-card__bookmark-button--active button';
  } else {
    return 'offer__bookmark-button button';
  }
};

const getSizes = (isBigButton: boolean) => isBigButton ? favoriteButtonSizes.big : favoriteButtonSizes.small;

export default function FavoriteButton({isFavorite, handleClick, isBigButton, btnRef}: FavoriteButtonProps) {
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
    <button className={getButtonClass(isFavorite, isBigButton)} type="button" ref={btnRef} onClick={onFavoriteClick}>
      <svg className= "place-card__bookmark-icon" width={sizes.width} height={sizes.height}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
