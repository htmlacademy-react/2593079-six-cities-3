import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { AuthorizationStatus, RequestStatus, RoutePath } from '../../const';
import { getAuthStatus, getUserAvatar, getUserEmail } from '../../store/auth/selectors';
import { deleteAuthData } from '../../store/auth/auth';
import { MouseEventHandler, useEffect } from 'react';
import { getFavorites, getFavoritesStatus } from '../../store/favorites/selectors';
import { fetchFavorites } from '../../store/api-action';
import { resetFavorites } from '../../store/favorites/favorites';
import { usePageClass } from '../../hooks/use-page-class';

export default function Layout(): JSX.Element {
  const isAuthorized = useAppSelector(getAuthStatus) === AuthorizationStatus.Auth;
  const email = useAppSelector(getUserEmail);
  const avatarUrl = useAppSelector(getUserAvatar);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const favoritesStatus = useAppSelector(getFavoritesStatus);
  const {pageClass, setPageClass} = usePageClass();


  useEffect(() => {
    if(favoritesStatus === RequestStatus.Idle && isAuthorized) {
      dispatch(fetchFavorites());
    }
  }, [favoritesStatus, dispatch, isAuthorized]);


  const onSignOutClick: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch(deleteAuthData());
    dispatch(resetFavorites());
  };

  return (
    <div className={`page ${pageClass}`.trim()}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">

                <li className="header__nav-item user">
                  {isAuthorized ?
                    <Link to={RoutePath.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${isAuthorized ? avatarUrl : '../img/avatar.svg'})`
                        }}
                      />

                      <span className="header__user-name user__name">
                        {email}
                      </span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link> : <Link to={RoutePath.Login} className="header__nav-link header__nav-link--profile"><span className="header__login">Sign in</span></Link>}

                </li>
                {isAuthorized &&
                <li className="header__nav-item">
                  <Link className="header__nav-link " to={RoutePath.Login} onClick={onSignOutClick}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>}

              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet context={{setPageClass}}/>
    </div>
  );
}
