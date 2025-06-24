import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { RouteAPI, RoutePath } from '../const';
import { redirectTo } from './action';
import { LoginData, Offer, userData, userLoginErrorData } from '../types';
import { saveToken } from '../services/token';
import { setOffers } from './data/data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffersAction', async (_, {dispatch, extra: api}) => {
  const {data} = await api.get<Offer[]>(RouteAPI.GET_OFFERS);
  dispatch(setOffers(data));
});

export const checkLogin = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>('checkLoginAction', async (_, {extra: api}) => {
  await api.get<userData | userLoginErrorData>(RouteAPI.LOGIN);
});

export const loginAction = createAsyncThunk<void, LoginData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('loginAction', async (loginData, {dispatch, extra: api}) => {

  const {data} = await api.post<userData>(RouteAPI.LOGIN, loginData);
  saveToken(data.token);
  dispatch(redirectTo(RoutePath.Main));

});
