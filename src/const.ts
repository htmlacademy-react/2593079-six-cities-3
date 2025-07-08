import { Offer } from './types';

enum AuthorizationStatus {
  Auth= 'Auth',
  NoAuth= 'NoAuth',
  Unknown= 'Unknown'
}

enum RoutePath {
  'Login' = '/login',
  'Offer' = '/offer/:id',
  'Favorites' = '/favorites',
  'Main' = '/',
}

enum OptionsTypes {
  ASC = 'ASC',
  DSC = 'DSC',
  TOP = 'TOP',
  POP = 'POP'
}

enum RouteAPI {
  GET_OFFERS = '/offers',
  GET_OFFER = '/offers/',
  GET_FAVORITES = '/favorite',
  GET_COMMENTS = '/comments/',
  LOGIN = '/login',
  LOGOUT = '/logout'
}

const SortFunctions = {
  [OptionsTypes.ASC]: (offers: Offer[]) => offers?.sort((firstOffer: Offer, secondOffer: Offer) => firstOffer.price - secondOffer.price),
  [OptionsTypes.DSC]: (offers: Offer[]) => offers?.sort((firstOffer: Offer, secondOffer: Offer) => secondOffer.price - firstOffer.price),
  [OptionsTypes.TOP]: (offers: Offer[]) => offers?.sort((firstOffer: Offer, secondOffer: Offer) => secondOffer.rating - firstOffer.rating),
};
const MarkerUrl = {
  DEFAULT: '/img/pin.svg',
  CURRENT: '/img/pin-active.svg'
};

const COMMENT_LIMIT = {MIN: 50, MAX: 300} as const;

const MAX_NEARBY_PLACES_COUNT = 3;

const DEFAULT_RATING = 0;

const favoriteButtonSizes = {
  big: {width: 31, height: 33},
  small:  {width: 18, height: 19}
};

const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const enum RequestStatus {
  Idle,
  Pending,
  Loaded,
  Failed
}

const RATING_COEFF = 20;

const MAX_COMMENTS_COUNT = 10;
const MAX_OFFER_IMG_COUNT = 6;

enum NameSpace {
  Data = 'data',
  App = 'app',
  Auth = 'auth',
  'Offer' = 'offer',
  'Favorites' = 'favorites'
}

const ErrorText = {
  OFFERS_ERROR: 'Failed to load offers. Please try again later.',
  OFFER_ERROR: 'Failed to load offer. Please try again later.',
  COMMENT_ERROR: 'Error posting comment. Please refresh the page.',
  ADD_FAVORITE_ERROR: 'Failed to add the offer to favorites.',
  DELETE_FAVORITE_ERROR: 'Failed to delete the offer from favorites.',
  LOGIN_ERROR: 'Login failed. Please verify your credentials and retry.'
};


export {AuthorizationStatus, RoutePath, Cities, MAX_NEARBY_PLACES_COUNT,MarkerUrl, OptionsTypes, SortFunctions, RouteAPI, NameSpace, DEFAULT_RATING, favoriteButtonSizes, RATING_COEFF, MAX_COMMENTS_COUNT, MAX_OFFER_IMG_COUNT, ErrorText, COMMENT_LIMIT};
