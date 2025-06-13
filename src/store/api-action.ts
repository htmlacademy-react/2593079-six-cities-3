import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { RouteAPI } from '../const';
import { setOffers } from './action';
import { Offer } from '../types';
// import { setOffers } from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffers', async (_, {dispatch, extra: api}) => {
  try {
    const {data} = await api.get<Offer[]>(RouteAPI.GET_OFFERS);
    dispatch(setOffers(data));

    // store.dispatch(setOffers(response));
  } catch {
    // console.log('error');

  }
});
