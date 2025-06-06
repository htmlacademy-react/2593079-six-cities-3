enum AuthorizationStatus {
  Auth= 'Auth',
  NoAuth= 'NoAuth',
  Unknown= 'Unknown'
}

enum RoutePath {
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Main = '/',
}

const URL_MARKER_DEFAULT =
  '../../public/img/pin.svg';

const URL_MARKER_CURRENT =
  '../../public/img/pin-active.svg';

const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export {AuthorizationStatus, RoutePath, Cities, URL_MARKER_DEFAULT, URL_MARKER_CURRENT};
