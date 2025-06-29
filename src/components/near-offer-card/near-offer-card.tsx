import { Link } from 'react-router-dom';
import { Offer } from '../../types';
import { useAppDispatch } from '../../hooks/store';
import { addFavoriteRequest, deleteFavoriteRequest, fetchNearbyOffers } from '../../store/api-action';
import { useState } from 'react';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: Offer;
}

export default function NearOfferCard({offer}: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFavorite, setFavorite] = useState<boolean>(offer.isFavorite);

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

    dispatch(fetchNearbyOffers(offer.id));
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
          <FavoriteButton isFavorite={isFavorite} handleClick={handleFavoriteClick}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }} />
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
