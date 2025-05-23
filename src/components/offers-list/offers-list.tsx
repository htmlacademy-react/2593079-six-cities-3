import { Offer } from '../../mocks/offers';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
}

export default function OffersList({offers}: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((currOffer) => {
        const key = currOffer.id;
        return <PlaceCard key={key} offer={currOffer}/>;

      })}
    </div>
  );
}
