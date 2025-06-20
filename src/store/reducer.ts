import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setAuthStatus, setOffers, setOffersIsLoaded } from './action';
import { Offer } from '../types';
import { AuthorizationStatus } from '../const';

interface State {
    activeCity: string;
    offers: Offer[];
    isOffersLoaded: boolean;
    authorizationStatus: AuthorizationStatus;
}

const initialState: State = {
  activeCity: 'Paris',
  offers: [],
  isOffersLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersIsLoaded, (state, action) => {
      state.isOffersLoaded = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    });

});

export {reducer};
