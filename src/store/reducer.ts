import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers } from './action';
import { Offer } from '../types';

interface State {
    activeCity: string;
    offers: Offer[];
}

const initialState: State = {
  activeCity: 'Paris',
  offers: []
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
