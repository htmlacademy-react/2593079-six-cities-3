import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { useAppDispatch } from '../../hooks/store';
import { addFavoriteRequest, deleteFavoriteRequest } from '../../store/api-action';
import { useRef, useState } from 'react';
import FavoriteButton from '../favorite-button/favorite-button';
import { ratingRatio } from '../../const';
import { setBtn, toCapitalize } from '../../utils';

type PlaceCardProps = {
  offer: Offer;
}

export default function NearOfferCard({offer}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(offer.isFavorite);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleFavoriteClick = () => {
    setBtn(btnRef, 'off');

    if(isFavorite) {
      dispatch(deleteFavoriteRequest(offer))
        .unwrap()
        .then(() => setIsFavorite(false))
        .finally(() => setBtn(btnRef, 'on'));
    } else {
      dispatch(addFavoriteRequest(offer))
        .unwrap()
        .then(() => setIsFavorite(true))
        .finally(() => setBtn(btnRef, 'on'));
    }
  };
  return (

    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton isFavorite={isFavorite} handleClick={handleFavoriteClick} btnRef={btnRef}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * ratingRatio}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>

        </h2>
        <p className="place-card__type">{toCapitalize(offer.type)}</p>

      </div>
    </article>
  );
}
