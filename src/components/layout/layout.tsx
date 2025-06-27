import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { AuthorizationStatus, RoutePath } from '../../const';
import { getAuthStatus, getUserEmail } from '../../store/auth/selectors';
import { deleteAuthData } from '../../store/auth/auth';
import { MouseEventHandler } from 'react';


export default function Layout(): JSX.Element {
  const isAuthorized = useAppSelector(getAuthStatus) === AuthorizationStatus.Auth;
  const email = useAppSelector(getUserEmail);
  const dispatch = useAppDispatch();


  const onSignOutClick: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch(deleteAuthData());
  };

  return (
    <div className="page">
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
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"/>
                    {isAuthorized ?
                      <>
                        <span className="header__user-name user__name">
                          <Link to={RoutePath.Favorites}>
                            {email}
                          </Link>
                        </span>
                        <span className="header__favorite-count">3</span>
                      </>
                      : <span className="header__login">Sign in</span>}

                  </a>
                </li>
                {isAuthorized &&
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login" onClick={onSignOutClick}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>}

              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
