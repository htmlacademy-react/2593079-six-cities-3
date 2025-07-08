import { useRef, FormEvent, useEffect } from 'react';
import { checkLoginInput, checkPasswordInput } from '../../utils';
import { useAppDispatch } from '../../hooks/store';
import { loginAction } from '../../store/api-action';
import RandomCityLink from '../../components/random-city-link/random-city-link';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../const';


export default function LoginPage(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginText = loginRef.current?.value || '';
    const passwordText = passwordRef.current?.value || '';

    if(checkLoginInput(loginText) && checkPasswordInput(passwordText)) {
      dispatch(loginAction(
        {
          email: loginText,
          password: passwordText
        }
      ));
    }
  };

  useEffect(() => {
    formRef.current?.reset();
  });

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={RoutePath.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <div className="header__nav-item user">
              <Link to={RoutePath.Login} className="header__nav-link header__nav-link--profile"><span className="header__login" style={{zIndex: 10000, opacity: 0}}>Sign in</span></Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" ref={formRef} method="post" onSubmit={onFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" ref={passwordRef} required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <RandomCityLink/>
          </section>
        </div>
      </main>
    </div>
  );
}
