'use client';
import './LoginCandidate.scss';
import { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { login } from '@/services/api/authentication.service';
import { Login } from '@/types/Login';

export const LoginCandidate = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wrongInput, setWrongInput] = useState<boolean>(false);

  useEffect(() => {
    if (wrongInput) {
      setTimeout(() => {
        setWrongInput(false);
      }, 2000)
    }
  }, [wrongInput]);

  const handleLogin = useCallback((account: Login) => {
    login(account)
      .then(resp => {
        if (resp.status === 200) {
          const token = resp.data.token;
          const userData = resp.data.user;
          const userId = userData.id;

          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);

          setEmail('');
          setPassword('');
        } else if (resp.status === 422) {
          setWrongInput(true);
        }
      })
      .catch(error => {
        setWrongInput(true);
      })
  }, []);

  return (
    <div className="login">
      <div className="login__header">
        <h1 className="login__title">
          Log In
        </h1>

        <h3 className="login__subtitle">
          {/* switching text on large screen */}
          <div className="login__subtitle-1">
            to your Candidate Account
          </div>

          <div className="login__subtitle-2">
            Candidate Account
          </div>
        </h3>

        <div className="login__text">
          {'Not a candidate? '}
          
          <span className='login__to-company'>
            Log in as a company
          </span>
        </div>
      </div>

      <form
        className="login__form"
        onSubmit={(e) => {
          e.preventDefault();

          const account = {
            email,
            password
          }

          handleLogin(account);
        }}
      >
        <label className='login__label'>
          <div className="login__label-title">
            E-mail
          </div>
          
          <input
            type="email"
            className='login__input'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className='login__label'>
          <div className="login__label-title">
            <div>Password</div>
          </div>

          <input
            type="password"
            className='login__input'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className={cn(
          "login__wrong-input",
          {
            "login__wrong-input--active": wrongInput,
          }
        )}>
          Wrong email or password.
        </div>

        <button
          className='login__submit'
          type='submit'
        >
          ENTER YOUR ACCCOUNT
        </button>
      </form>

      <div className="login__no-account-text">
        {'Don’t have an account? '}

          <span className="login__register">
            <Link
              href='/candidates/signup'
            >
              Register
            </Link>
          </span>
      </div>

      <div className="login__social">
        <p className="login__social-text">
          or sign in with your social media account
        </p>

        <div className="login__social-buttons">
          <div className="login__social-button login__social-button--fb">
            facebook
          </div>

          <div className="login__social-button login__social-button--google">
            Google
          </div>
        </div>
      </div>
    </div>
  )
}