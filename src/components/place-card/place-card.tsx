import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { addFavoriteRequest, deleteFavoriteRequest } from '../../store/api-action';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: Offer;
  isForFavPage?: boolean;
  onChange?: (activeOfferId: string) => void;
}


export default function PlaceCard({offer, isForFavPage, onChange}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [isFavorite, setFavorite] = useState<boolean>(offer.isFavorite);

  const handleCardHover = () => {
    if(onChange) {
      onChange(offer.id);
    }
  };

  const handleCardLeave = () => {
    if(onChange) {
      onChange('');
    }
  };

  const handleFavoriteClick = () => {
    if(isFavorite) {
      dispatch(deleteFavoriteRequest(offer))
        .unwrap()
        .then(() => setFavorite(false));
    } else {
      dispatch(addFavoriteRequest(offer))
        .unwrap()
        .then(() => setFavorite(true));
    }
  };

  return (

    <article className={`${isForFavPage ? 'favorites' : 'cities'}__card place-card`} onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
      {isForFavPage && offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${isForFavPage ? 'favorites' : 'cities'}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`} >
          <img className="place-card__image" src={offer.previewImage} width={isForFavPage ? '150' : '260'} height={isForFavPage ? '110' : '200'} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton handleClick={handleFavoriteClick} isFavorite={isFavorite} isBigButton={false}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
