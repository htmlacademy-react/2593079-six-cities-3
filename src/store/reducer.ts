import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers } from './action';
import { Offer, offersMock } from '../mocks/offers';

interface State {
    activeCity: string;
    offers: Offer[] | null;
}

const initialState: State = {
  activeCity: 'Paris',
  offers: offersMock
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    });
});

export {reducer};
