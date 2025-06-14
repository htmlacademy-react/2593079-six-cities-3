import { Offer } from '../../types';
import NearOfferCard from '../near-offer-card/near-offer-card';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  isForFavPage?: boolean;
  isForOfferPage?: boolean;
  onChange?: (activeOfferId: string) => void;
}

const getListClassName = (isForFavPage: boolean | undefined, isForOfferPage: boolean | undefined) => {
  if(isForFavPage) {
    return 'favorites__places';
  } else if(isForOfferPage) {
    return 'near-places__list places__list';
  }
  return 'cities__places-list tabs__content places__list';
};

export default function OffersList({offers, isForFavPage, isForOfferPage, onChange}: OffersListProps): JSX.Element {

  return (
    <div className={getListClassName(isForFavPage, isForOfferPage)}>
      {offers?.map((currOffer) => {
        const key = currOffer.id;
        if(isForOfferPage) {
          return <NearOfferCard offer={currOffer} key={key}/>;
        }
        return <PlaceCard key={key} offer={currOffer} isForFavPage={isForFavPage} onChange={onChange}/>;

      })}
    </div>
  );
}
