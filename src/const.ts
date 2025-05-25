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

const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export {AuthorizationStatus, RoutePath, Cities};
