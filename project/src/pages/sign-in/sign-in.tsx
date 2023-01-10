import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import React, {FormEvent, useState} from 'react';
import {login} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Navigate} from 'react-router-dom';
import AuthorizationStatus from '../../types/authorizationStatus';


function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(login({email: email, password: password}));
  }

  if (authStatus === AuthorizationStatus.AUTHORIZED) {
    return <Navigate to='/' />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form onSubmit={handleSubmit} className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" onChange={(e) => setEmail(e.target.value)}
              />
              <label className="sign-in__label visually-hidden" form="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" onChange={(e) => setPassword(e.target.value)}
              />
              <label className="sign-in__label visually-hidden" form="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>);
}

export default SignIn;
