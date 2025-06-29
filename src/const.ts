import { LoginData, Offer } from './types';

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
  [OptionsTypes.ASC]: (offers: Offer[]) => offers?.sort((a: Offer, b: Offer) => a.price - b.price),
  [OptionsTypes.DSC]: (offers: Offer[]) => offers?.sort((a: Offer, b: Offer) => b.price - a.price),
  [OptionsTypes.TOP]: (offers: Offer[]) => offers?.sort((a: Offer, b: Offer) => b.rating - a.rating),
};

const URL_MARKER_DEFAULT =
  '/img/pin.svg';

const URL_MARKER_CURRENT =
  '/img/pin-active.svg';

const MAX_NEARBY_PLACES_COUNT = 3;

const DEFAULT_RATING = 4;

const favoriteButtonSizes = {
  big: {width: 31, height: 33},
  small:  {width: 18, height: 19}
};

const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const loginData: LoginData = {
  email: 'SomeEmail890@gmail.com',
  password: 'password1'
};

export const enum RequestStatus {
  Idle,
  Pending,
  Loaded,
  Failed
}

enum NameSpace {
  Data = 'data',
  App = 'app',
  Auth = 'auth',
  'Offer' = 'offer',
  'Favorites' = 'favorites'
}


export {AuthorizationStatus, RoutePath, Cities, URL_MARKER_DEFAULT, MAX_NEARBY_PLACES_COUNT, URL_MARKER_CURRENT, OptionsTypes, SortFunctions, RouteAPI, loginData, NameSpace, DEFAULT_RATING, favoriteButtonSizes};
