import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import createAPI from '../services/api';
import { State } from '../types/store';
import { NameSpace } from '../const';
import {initialState as initialAppState} from '../store/app/app';
import {initialState as initialAuthState} from '../store/auth/auth';
import {initialState as initialDataState} from '../store/data/data';
import {initialState as initialFavoritesState} from '../store/favorites/favorites';
import {initialState as initialOfferState} from '../store/offer/offer';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const getMockReview = () => (
  {
    'id': 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    'date': '2019-05-08T14:13:56.569Z',
    'user': {
      'name': 'Oliver Conner',
      'avatarUrl': 'https://url-to-image/image.png',
      'isPro': false
    },
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'rating': 4
  }
);

export const makeFakeStore = (initialState?: Partial<State>): State => (
  {
    [NameSpace.App]: initialAppState,
    [NameSpace.Auth]: initialAuthState,
    [NameSpace.Data]: initialDataState,
    [NameSpace.Favorites]: initialFavoritesState,
    [NameSpace.Offer]: initialOfferState,
    ...initialState ?? {},
  }
);

