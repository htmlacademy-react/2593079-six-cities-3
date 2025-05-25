import { Offer } from './mocks/offers';

const filterByCity = (offers: Offer[], cityName: string) => offers.filter((currOffer) => currOffer.city.name === cityName);

export {filterByCity};
