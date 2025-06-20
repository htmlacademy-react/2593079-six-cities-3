import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { AuthorizationStatus } from '../../const';


export default function Layout(): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;

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
                    Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </>
                      : <span className="header__login">Sign in</span>}

                  </a>
                </li>
                {isAuthorized &&
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/login">
                    <span className="header__signout">Sign out</span>
                  </a>
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
