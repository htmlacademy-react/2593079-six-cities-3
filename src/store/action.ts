import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types';

const changeCity = createAction<string>('changeCity');
const setOffers = createAction<Offer[]>('setOffers');
const setOffersIsLoaded = createAction<boolean>('setOffersIsLoaded');

export {changeCity, setOffers, setOffersIsLoaded};
