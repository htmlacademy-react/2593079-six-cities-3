import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, RouteAPI, RoutePath } from '../const';
import { redirectTo, setAuthStatus, setOffers, setOffersIsLoaded } from './action';
import { LoginData, Offer, userData, userLoginErrorData } from '../types';
import { saveToken } from '../services/token';

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

export const loginAction = createAsyncThunk<void, LoginData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('loginAction', async (loginData, {dispatch, extra: api}) => {
  try {
    const {data} = await api.post<userData>(RouteAPI.LOGIN, loginData);
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
    saveToken(data.token);
    dispatch(redirectTo(RoutePath.Main));
  } catch {
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
  }
});
