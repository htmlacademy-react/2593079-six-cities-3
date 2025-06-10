import { Offer } from './mocks/offers';

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

const SortFunctions = {
  [OptionsTypes.ASC]: (offers: Offer[] | undefined) => offers?.sort((a: Offer, b: Offer) => a.price - b.price),
  [OptionsTypes.DSC]: (offers: Offer[] | undefined) => offers?.sort((a: Offer, b: Offer) => b.price - a.price),
  [OptionsTypes.TOP]: (offers: Offer[] | undefined) => offers?.sort((a: Offer, b: Offer) => b.rating - a.rating),
};

const URL_MARKER_DEFAULT =
  '/img/pin.svg';

const URL_MARKER_CURRENT =
  '/img/pin-active.svg';

const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export {AuthorizationStatus, RoutePath, Cities, URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OptionsTypes, SortFunctions};
