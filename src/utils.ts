import dayjs from 'dayjs';

import { Offer } from './mocks/offers';

const filterByCity = (offers: Offer[], cityName: string) => offers.filter((currOffer) => currOffer.city.name === cityName);
const parseReviewDate = (date: string) => dayjs(date).format('MMMM YYYY');
const parseDateTime = (date: string) => dayjs(date).format('YYYY-MM-DD');

export {filterByCity, parseReviewDate, parseDateTime};
