import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';

const changeCity = createAction<string>('changeCity');
const setOffers = createAction<Offer[] | null>('setOffers');

export {changeCity, setOffers};
