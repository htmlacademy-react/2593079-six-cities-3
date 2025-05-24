import { Offer } from '../../mocks/offers';

type PlaceCardProps = {
  offer: Offer;
  isForFavPage?: boolean;
}


export default function PlaceCard({offer, isForFavPage}: PlaceCardProps): JSX.Element {
  return (

    <article className={`${isForFavPage ? 'favorites' : 'cities'}__card place-card`}>
      {isForFavPage && offer.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${isForFavPage ? 'favorites' : 'cities'}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={isForFavPage ? '150' : '260'} height={isForFavPage ? '110' : '200'} alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} place-card__bookmark-button button`} type="button">
            <svg className= "place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
