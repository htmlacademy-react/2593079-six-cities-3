import { Offer } from '../../mocks/offers';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  isForFavPage?: boolean;
  onChange?: (activeOfferId: string) => void;
}

export default function OffersList({offers, isForFavPage, onChange}: OffersListProps): JSX.Element {

  return (
    <div className={isForFavPage ? 'favorites__places' : 'cities__places-list places__list tabs__content'}>
      {offers.map((currOffer) => {
        const key = currOffer.id;
        return <PlaceCard key={key} offer={currOffer} isForFavPage={isForFavPage} onChange={onChange}/>;

      })}
    </div>
  );
}
