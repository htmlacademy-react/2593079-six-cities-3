import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { RouteAPI, RoutePath } from '../const';
import { redirectTo } from './action';
import { LoginData, Offer, OfferData, PostCommentData, Review, userData, userLoginErrorData } from '../types';
import { saveToken } from '../services/token';
import { setOffers } from './data/data';
import { addComment, setCommentData, setNearbyData, setOfferData } from './offer/offer';
import { saveAuthData } from './auth/auth';

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
  dispatch(saveAuthData(data));
  dispatch(redirectTo(RoutePath.Main));

});

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffer',async (id, {extra: api, dispatch}) => {
  const {data} = await api.get<OfferData>(`${RouteAPI.GET_OFFER}/${id}`);
  dispatch(setOfferData(data));
});

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffer',async (id, {extra: api, dispatch}) => {
  const {data} = await api.get<Review[]>(`${RouteAPI.GET_COMMENTS}/${id}`);
  dispatch(setCommentData(data));
});

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffer',async (id, {extra: api, dispatch}) => {

  const {data} = await api.get<Offer[]>(`${RouteAPI.GET_OFFER}/${id}/nearby`);
  dispatch(setNearbyData(data));

});

export const postComment = createAsyncThunk<void, {id: string; body: PostCommentData} , {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffer', async ({id, body}, {extra: api, dispatch}) => {
  const {data} = await api.post<Review>(`${RouteAPI.GET_COMMENTS}/${id}`, body);
  dispatch(addComment(data));
});
