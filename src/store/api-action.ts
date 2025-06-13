import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { RouteAPI } from '../const';
import { setOffers, setOffersIsLoaded } from './action';
import { Offer } from '../types';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffersAction', async (_, {dispatch, extra: api}) => {
  dispatch(setOffersIsLoaded(false));
  try {
    const {data} = await api.get<Offer[]>(RouteAPI.GET_OFFERS);
    dispatch(setOffers(data));
  } finally {
    dispatch(setOffersIsLoaded(true));
  }


});
