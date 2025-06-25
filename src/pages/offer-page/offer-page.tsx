import { useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form/comment-form';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AuthorizationStatus, MAX_NEARBY_PLACES_COUNT, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchComments, fetchNearbyOffers, fetchOffer } from '../../store/api-action';
import { getAuthStatus } from '../../store/auth/selectors';
import { getComments, getNearby, getOffer, getOfferStatus } from '../../store/offer/selectors';
import { useEffect } from 'react';
import { clearOfferData } from '../../store/offer/offer';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import { toCapitalize } from '../../utils';


export default function OfferPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};

  const authorizationStatus = useAppSelector(getAuthStatus);
  const offer = useAppSelector(getOffer);
  const offerStatus = useAppSelector(getOfferStatus);
  const comments = useAppSelector(getComments);
  const nearbyPlaces = useAppSelector(getNearby);

  useEffect(()=> {
    if(!offer && offerStatus === RequestStatus.Idle) {
      Promise.all([dispatch(fetchComments(id)), dispatch(fetchNearbyOffers(id)), dispatch(fetchOffer(id))]);
    }
  },[id, offer, offerStatus, dispatch]);

  useEffect(() => {
    dispatch(clearOfferData());
  }, [id, dispatch]);

  if(offerStatus === RequestStatus.Pending || offerStatus === RequestStatus.Idle) {
    return <Spinner/>;
  }

  if(offerStatus === RequestStatus.Failed || !offer) {
    return <NotFoundPage/>;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer.images.map((img, index) => {
              const key = `${offer.id}-${index}`;
              return (
                <div className="offer__image-wrapper" key={key}>
                  <img
                    className="offer__image"
                    src={img}
                    alt="Photo studio"
                  />
                </div>);
            }
            )}

          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium &&
            <div className="offer__mark">
              <span>Premium</span>
            </div>}

            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${20 * (offer.rating ?? 0) }%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {toCapitalize(offer.type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {offer.goods.map((good, index) => {
                  const key = `${offer.id}-${index}`;
                  return <li className="offer__inside-item" key={key}>{good}</li>;
                })}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                {offer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <ReviewsList reviews={comments}/>
              {authorizationStatus === AuthorizationStatus.Auth && <CommentForm/>}
            </section>
          </div>
        </div>
        <section className="container map">
          <Map points={nearbyPlaces.slice(0, MAX_NEARBY_PLACES_COUNT)} city={nearbyPlaces[0]?.city} />
        </section>

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <OffersList offers={nearbyPlaces.slice(0, MAX_NEARBY_PLACES_COUNT)} isForOfferPage/>
        </section>
      </div>
    </main>
  );


}
