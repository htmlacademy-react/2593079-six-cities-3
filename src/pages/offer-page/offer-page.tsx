import { useOutletContext, useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form/comment-form';
import {MemoizedMap} from '../../components/map/map';
import {MemoizedOffersList} from '../../components/offers-list/offers-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AuthorizationStatus, MAX_NEARBY_PLACES_COUNT, MAX_OFFER_IMG_COUNT, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { addFavoriteRequest, deleteFavoriteRequest, fetchComments, fetchNearbyOffers, fetchOffer } from '../../store/api-action';
import { getAuthStatus } from '../../store/auth/selectors';
import { getNearby, getOffer, getOfferStatus } from '../../store/offer/selectors';
import { useEffect, useMemo, useRef, useState } from 'react';
import { clearOfferData, setStatus } from '../../store/offer/offer';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import { setBtn, toCapitalize } from '../../utils';
import FavoriteButton from '../../components/favorite-button/favorite-button';

const RATIO_COEFF = 19;

export default function OfferPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};

  const authorizationStatus = useAppSelector(getAuthStatus);
  const offer = useAppSelector(getOffer);
  const offerStatus = useAppSelector(getOfferStatus);
  const nearbyPlaces = useAppSelector(getNearby);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { setPageClass } = useOutletContext<{ setPageClass: (cls: string) => void }>();

  const btnRef = useRef<HTMLButtonElement>(null);

  const limitedNearbyPlacesData = useMemo(
    () => nearbyPlaces.slice(0, MAX_NEARBY_PLACES_COUNT),
    [nearbyPlaces]
  );

  const city = useMemo(
    () => nearbyPlaces[0]?.city,
    [nearbyPlaces]
  );

  useEffect(() => {
    setPageClass('');

  }, [setPageClass]);

  useEffect(() => {
    dispatch(fetchOffer(id))
      .unwrap()
      .then(() => {
        Promise.all([
          dispatch(fetchNearbyOffers(id)),
          dispatch(fetchComments(id))
        ]).catch(() => {
          dispatch(setStatus(RequestStatus.Failed));

        });
      })
      .catch(() => {
        dispatch(setStatus(RequestStatus.Failed));
      });

    return () => {
      dispatch(clearOfferData());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if(offer) {
      setIsFavorite(offer.isFavorite);
    }
  }, [setIsFavorite, offer]);

  useEffect(() => {
    dispatch(clearOfferData());
  }, [id, dispatch]);


  const handleFavoriteClick = () => {
    if(offer) {
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
    }

  };


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
            {offer.images.slice(0, MAX_OFFER_IMG_COUNT).map((img, index) => {
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
              <FavoriteButton isFavorite={isFavorite} handleClick={handleFavoriteClick} isBigButton btnRef={btnRef}/>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${RATIO_COEFF * (offer.rating ?? 0) }%` }} />
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
              <ReviewsList/>
              {authorizationStatus === AuthorizationStatus.Auth && <CommentForm id={offer.id}/>}
            </section>
          </div>
        </div>
        <section className="container map">
          <MemoizedMap points={[...limitedNearbyPlacesData, offer]} city={city} activePoint={offer.id}/>
        </section>

      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <MemoizedOffersList offers={limitedNearbyPlacesData} isForOfferPage/>
        </section>
      </div>
    </main>
  );


}
