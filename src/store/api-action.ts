import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, RouteAPI } from '../const';
import { setAuthStatus, setOffers, setOffersIsLoaded } from './action';
import { Offer, userData, userLoginErrorData } from '../types';

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

export const checkLogin = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('checkLoginAction', async (_, {dispatch, extra: api}) => {
  try {
    await api.get<userData | userLoginErrorData>(RouteAPI.LOGIN);
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  }
});
