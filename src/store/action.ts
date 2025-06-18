import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types';
import { AuthorizationStatus } from '../const';

const changeCity = createAction<string>('changeCity');
const setOffers = createAction<Offer[]>('setOffers');
const setOffersIsLoaded = createAction<boolean>('setOffersIsLoaded');
const setAuthStatus = createAction<AuthorizationStatus>('setAuthStatus');

export {changeCity, setOffers, setOffersIsLoaded, setAuthStatus};
