import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from './types';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, ErrorText, RequestStatus, RouteAPI, RoutePath } from '../const';
import { redirectTo } from './action';
import { LoginData, Offer, OfferData, PostCommentData, Review, userData } from '../types';
import { dropToken, saveToken } from '../services/token';
import { setOffers, setOffersStatus } from './data/data';
import { addComment, setCommentData, setNearbyData, setOfferData } from './offer/offer';
import { saveAuthData, setAuthStatus } from './auth/auth';
import { addFavorite, deleteFavorite, setFavorites } from './favorites/favorites';
import { showMessage } from '../utils';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffersAction', async (_, {dispatch, extra: api}) => {
  try {
    const {data} = await api.get<Offer[]>(RouteAPI.GET_OFFERS);
    dispatch(setOffers(data));
    dispatch(setOffersStatus(RequestStatus.Loaded));
  } catch {
    dispatch(setOffersStatus(RequestStatus.Failed));
    showMessage(ErrorText.OFFERS_ERROR);
  }
});

export const checkLogin = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
  dispatch: AppDispatch;
}>('checkLoginAction', async (_, {extra: api, dispatch}) => {
  const {data} = await api.get<userData>(RouteAPI.LOGIN);
  dispatch(saveAuthData(data));
});

export const loginAction = createAsyncThunk<void, LoginData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('loginAction', async (loginData, {dispatch, extra: api}) => {
  try {
    const {data} = await api.post<userData>(RouteAPI.LOGIN, loginData);
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
    saveToken(data.token);
    dispatch(saveAuthData(data));
    dispatch(redirectTo(RoutePath.Main));

  } catch {
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
    showMessage(ErrorText.LOGIN_ERROR);
  }

});

export const fetchOffer = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchOffer',async (id, {extra: api, dispatch}) => {
  try {
    const {data} = await api.get<OfferData>(`${RouteAPI.GET_OFFER}/${id}`);
    dispatch(setOfferData(data));
  } catch {
    showMessage(ErrorText.OFFER_ERROR);

  }
});

export const fetchFavorites = createAsyncThunk<void, void, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchFavorites',async (_id, {extra: api, dispatch}) => {
  try {
    const {data} = await api.get<Offer[]>(`${RouteAPI.GET_FAVORITES}`);
    dispatch(setFavorites(data));
  } catch {
    showMessage(ErrorText.OFFER_ERROR);
  }

});

export const addFavoriteRequest = createAsyncThunk<void, Offer | OfferData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('addFavoriteRequest',async (offer, {extra: api, dispatch}) => {
  try {
    const {data} = await api.post<Offer>(`${RouteAPI.GET_FAVORITES}/${offer.id}/1`);
    dispatch(addFavorite(data));
  } catch {
    showMessage(ErrorText.ADD_FAVORITE_ERROR);
  }
});

export const deleteFavoriteRequest = createAsyncThunk<void, Offer | OfferData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('deleteFavoriteRequest',async (offer, {extra: api, dispatch}) => {
  try {
    const {data} = await api.post<Offer>(`${RouteAPI.GET_FAVORITES}/${offer.id}/0`);
    dispatch(deleteFavorite(data));
    dropToken();
  } catch {
    showMessage(ErrorText.DELETE_FAVORITE_ERROR);
  }

});

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchComments',async (id, {extra: api, dispatch}) => {
  const {data} = await api.get<Review[]>(`${RouteAPI.GET_COMMENTS}/${id}`);
  dispatch(setCommentData(data));
});

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('fetchNearbyOffers',async (id, {extra: api, dispatch}) => {

  const {data} = await api.get<Offer[]>(`${RouteAPI.GET_OFFER}/${id}/nearby`);
  dispatch(setNearbyData(data));
});

export const postComment = createAsyncThunk<void, {id: string; body: PostCommentData} , {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>('postComment', async ({id, body}, {extra: api, dispatch}) => {

  const {data} = await api.post<Review>(`${RouteAPI.GET_COMMENTS}/${id}`, body);
  dispatch(addComment(data));
});
