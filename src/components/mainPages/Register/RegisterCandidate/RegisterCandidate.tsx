'use client';
import { useState, useEffect, useCallback } from 'react';
import './RegisterCandidate.scss';
import cn from 'classnames';
import Link from 'next/link';
import { CountryApi } from '@/types/CountryApi';
import { register } from '@/services/api/register.service';
import { getCountry } from '@/services/api/country.service';
import { Register } from '@/types/Register';

export const RegisterCandidate = () => {
  const [countryList, setCountryList] = useState<CountryApi[]>([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);

  const [dropdownActive, setDropdownActive] = useState(false);
  const [countrySearchInput, setCountrySearchInput] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValidLength, setPasswordValidLength] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('202020');

  const [alreadyRegisteredError, setAlreadyRegisteredError] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const resetInputs = useCallback(() => {
    setFirstname('');
    setLastname('');
    setPassword('');
    setPasswordVerification('');
    setPasswordMatch(false);
    setPasswordValidLength(false);
    setCountryCode('');
    setCountryName('');
    setEmail('');
    setIsEmailValid(false);
    setDropdownActive(false);

    //should be optional if they are active by default or not
    // setSubscribed(false);
    // setTermsAccepted(false)
  }, []);

  const handleRegister = useCallback((accountData: Register) => {
    register(accountData)
      .then(resp => {
        //we can will handle the login token key here
        //based on that state we can redirect the user to login or profile directly
        setAccountCreated(true);
        resetInputs();
      })
      .catch(error => {
        setAlreadyRegisteredError(true);
        console.log('error has occures / user already registered');
      })
  }, []);

  const handleCountrySelect = useCallback((id: string, name: string) => {
    setCountryName(name);
    setCountryCode(id);
    setDropdownActive(false);
    setCountrySearchInput('');
  }, [])

  useEffect(() => {
    if (alreadyRegisteredError) {
      setTimeout(() => {
        setAlreadyRegisteredError(false);
      }, 3000);
    }
  }, [alreadyRegisteredError])

  useEffect(() => {
    getCountry()
      .then(resp => {
        if (resp) {
          const countries = resp.data.countries;
          setCountryList(countries)
        }
      });
  }, [])

  useEffect(() => {
    if (email.length > 0) {
      if (email.includes('@') 
        && !email.startsWith('@')
        && !email.endsWith('@')
      ) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false)
      }
    }
  }, [email])

  useEffect(() => {
    if (password.length < 8) {
      setPasswordValidLength(false);
    } else {
      setPasswordValidLength(true);
    }
    
  }, [password])

  useEffect(() => {
    if (password.length > 0) {
      if (password === passwordVerification) {
        setPasswordMatch(true)
      } else {
        setPasswordMatch(false);
      }
    }
  }, [passwordVerification])
  
  return (
    <div className="register-candidate">
      <header className="register-candidate__header">
        <h1 className="register-candidate__title">
          Register Account
        </h1>

        <div className="register-candidate__subtitle">
          Start your 90-day trial at just $2.99
        </div>

        <div className="register-candidate__text">
          $8.99/month after the trial period ends. Cancel anytime.
        </div>
      </header>

      <form
        className="register-candidate__form"
        action=""
        method='post'
        onSubmit={(e) => {
          e.preventDefault();

          const isDataValid = firstname.length 
            && lastname.length 
            && countryCode.length 
            && isEmailValid
            && passwordValidLength 
            && passwordMatch 
            && termsAccepted;

          if (isDataValid) {
            const accountData = {
              "first_name": firstname,
              "last_name": lastname,
              "email": email,
              "password": password,
              "password_confirmation": passwordVerification,
              "phone_number": phoneNumber,
              "country": countryCode
            }

            handleRegister(accountData);
          }
        }}
      >
        <div className="register-candidate__labels">
          <div className="register-candidate__labels-top">
            <div className="register-candidate__labels-top-section">
              <label className='register-candidate__label mb10'>
                <div className="register-candidate__label-title">
                  First Name
                </div>

                <input
                  type="text"
                  className='register-candidate__input'
                  name='firstname'
                  placeholder=''
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label className='register-candidate__label mb10'>
                <div className="register-candidate__label-title">
                  Last Name
                </div>

                <input
                  type="text"
                  className='register-candidate__input'
                  name='lastname'
                  placeholder=''
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
            </div>

            <div className="register-candidate__labels-top-section">
              <label className='register-candidate__label'>
                <div className="register-candidate__label-title">
                  E-mail
                </div>

                <div className={cn(
                  "register-candidate__email-error",
                  {
                    "register-candidate__email-error--active": alreadyRegisteredError,
                  }
                )}>
                  Email taken / format invalid
                </div>

                <input
                  type="email"
                  className='register-candidate__input'
                  name='email'
                  placeholder='example@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className={cn(
                  "register-candidate__validate-icon",
                  {
                    "register-candidate__validate-icon--invalid": email.length > 0 &&!isEmailValid,
                    "register-candidate__validate-icon--valid": isEmailValid,
                  }
                )}></div>
              </label>

              <label className='register-candidate__label'>
                <div className="register-candidate__label-title">
                  Country / Nationality
                </div>

                <div
                  className='register-candidate__input register-candidate__select'
                  onClick={() => {
                    setDropdownActive(!dropdownActive)
                  }}
                >
                  <div className="register-candidate__select-left">
                    <div className="register-candidate__select-flag"></div>

                    {countryName || 'Select country'}
                  </div>

                  <div className="register-candidate__select-arrow"></div>
                </div>

                <div className={cn(
                  "register-candidate__dropdown",
                  {
                    "register-candidate__dropdown--active": dropdownActive
                  }
                )}>
                  <input
                    type="text"
                    className='register-candidate__dropdown-input'
                    value={countrySearchInput}
                    onChange={(e) => {
                      const inputQuery = e.target.value.toLowerCase();
                      setCountrySearchInput(inputQuery)
                    }}
                  />

                  {countryList
                    .filter(country => country.name.toLowerCase()
                      .includes(countrySearchInput)
                    )
                    .map(country => (
                    <div
                      key={country.id}
                      className="register-candidate__dropdown-item"
                      onClick={() => {
                        handleCountrySelect(country.id, country.name);
                      }}
                    >
                      <div className="register-candidate__select-flag"></div>
                      
                      {country.name}
                    </div>
                  ))}
                </div>
              </label>
            </div>

            <div className="register-candidate__labels-top-section">
              <label className='register-candidate__label'>
                <div className="register-candidate__label-title">
                  <div>Password</div>
                  <div>8 symbols min</div>
                </div>

                <input
                  type="password"
                  className='register-candidate__input'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className={cn(
                  "register-candidate__validate-icon",
                  {
                    "register-candidate__validate-icon--invalid": password.length > 0 && !passwordValidLength,
                    "register-candidate__validate-icon--valid": passwordValidLength,
                  }
                )}></div>
              </label>

              <label className='register-candidate__label'>
                <div className="register-candidate__label-title">
                  Password Verification
                </div>
                
                <input
                  type="password"
                  className='register-candidate__input'
                  name='passwordVerification'
                  value={passwordVerification}
                  onChange={(e) => setPasswordVerification(e.target.value)}
                />

                <div className={cn(
                  "register-candidate__validate-icon",
                  {
                    "register-candidate__validate-icon--invalid":  passwordVerification.length > 0 && !passwordMatch,
                    "register-candidate__validate-icon--valid": passwordMatch,
                  }
                )}></div>
              </label>
            </div>
          </div>

          <div className="register-candidate__separator"></div>
        </div>

        <div className="register-candidate__divider"></div>

        <div className="register-candidate__form-bottom">
          <div className="register-candidate__conditions">
            <label className='register-candidate__label-check'>
              <input
                type="checkbox"
                className={cn(
                  "register-candidate__checkbox",
                  {
                    "register-candidate__checkbox--active": subscribed
                  }
                )}
                onClick={() => {
                  setSubscribed(!subscribed)
                }}
              />

              <div className="register-candidate__label-check-title">
                Subscribe to our newsletters. No spam!
              </div>
            </label>

            <label className='register-candidate__label-check'>
              <input
                type="checkbox"
                className={cn(
                  "register-candidate__checkbox",
                  {
                    "register-candidate__checkbox--active": termsAccepted
                  }
                )}
                onClick={() => {
                  setTermsAccepted(!termsAccepted)
                }}
              />

              <div className="register-candidate__label-check-title">
                By creating an account on our website you agree to the
                <Link href='/' className='register-candidate__link'>
                  {' Terms of Service '}
                </Link>
                and
          
                <Link href='/' className='register-candidate__link'>
                  {' Privacy Policy '}
                </Link>
              </div>
            </label>
          </div>

          <div className="register-candidate__form-bottom-right">
            <button
              className="register-candidate__submit"
              type='submit'
            >
              Register New Account
            </button>
            
            <div className="register-candidate__safe">
              <div className="register-candidate__safe-icon"></div>
              <div className="register-candidate__safe-text">
                This page uses 128-bit encryption. Your details are safe.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}