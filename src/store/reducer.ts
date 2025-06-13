import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers, setOffersIsLoaded } from './action';
import { Offer } from '../types';

interface State {
    activeCity: string;
    offers: Offer[];
    isOffersLoaded: boolean;
}

const initialState: State = {
  activeCity: 'Paris',
  offers: [],
  isOffersLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersIsLoaded, (state, action) => {
      state.isOffersLoaded = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    });

});

export {reducer};
