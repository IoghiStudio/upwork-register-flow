'use client';
import { useState, useEffect, useCallback } from 'react';
import './RegisterCompany.scss';
import cn from 'classnames';
import Link from 'next/link';
import { CountryApi } from '@/types/CountryApi';
import { register } from '@/services/api/register.service';
import { getCountry } from '@/services/api/country.service';
import { Register } from '@/types/Register';
import { AccountType } from '@/types/CompanyAccountType';


export const RegisterCompany = () => {
  const [countryList, setCountryList] = useState<CountryApi[]>([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [taxId, setTaxId] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [accountType, setAccountType] = useState<AccountType>(AccountType.None);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);

  const [dropdownPhoneActive, setDropdownPhoneActive] = useState(false);
  const [dropdownCountryActive, setDropdownCountryActive] = useState(false);
  const [countrySearchInput, setCountrySearchInput] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordValidLength, setPasswordValidLength] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phonePrefix, setPhonePrefix] = useState<string>('');

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
    setDropdownPhoneActive(false);
    setDropdownCountryActive(false);
    setVatNumber('');
    setAccountType(AccountType.None);
    setTaxId('');
    setPhoneNumber('');
    setPhonePrefix('');

    //should be optional if they are active by default or not
    // setSubscribed(false);
    // setTermsAccepted(false)
  }, []);

  const handleRegister = ( accountData: Register) => {
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
  }

  const handleCountrySelect = useCallback((id: string, name: string) => {
    setCountryName(name);
    setCountryCode(id);
    setDropdownCountryActive(false);
    setCountrySearchInput('');
  }, [])

  const handlePhonePrefix = useCallback((code: string) => {
    setPhonePrefix(code);
    setDropdownPhoneActive(false);
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
    <div className="register-company">
      <header className="register-company__header">
        <h1 className="register-company__title">
          Sign Up your Company
        </h1>

        <div className="register-company__text">
          <div>
            Start your 6-month free trial.
          </div>

          <div>
            No credit card required.
          </div>
        </div>
      </header>

      <form
        className="register-company__form"
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
              "name": `${firstname} ${lastname}`,
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
        <div className="register-company__labels">
          <div className="register-company__labels-top">
            <div className="register-company__labels-top-section">
              <label className='register-company__label mb10'>
                <div className="register-company__label-title">
                  First Name
                </div>

                <input
                  type="text"
                  className='register-company__input'
                  name='firstname'
                  placeholder=''
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label className='register-company__label mb10'>
                <div className="register-company__label-title">
                  Last Name
                </div>

                <input
                  type="text"
                  className='register-company__input'
                  name='lastname'
                  placeholder=''
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
            </div>

            <div className="register-company__labels-top-section">
              <label className='register-company__label'>
                <div className="register-company__label-title">
                  E-mail
                </div>

                <div className={cn(
                  "register-company__email-error",
                  {
                    "register-company__email-error--active": alreadyRegisteredError,
                  }
                )}>
                  Email taken / format invalid
                </div>

                <input
                  type="email"
                  className='register-company__input'
                  name='email'
                  placeholder='example@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className={cn(
                  "register-company__validate-icon",
                  {
                    "register-company__validate-icon--invalid": email.length > 0 &&!isEmailValid,
                    "register-company__validate-icon--valid": isEmailValid,
                  }
                )}></div>
              </label>

              <label className='register-company__label'>
                <div className="register-company__label-title">
                  Phone
                </div>

                <div className="register-company__phone-inputs">
                  <div
                    className='register-company__phone-input
                    register-company__phone-input--left
                    register-company__select'
                    onClick={() => {
                      setDropdownPhoneActive(!dropdownPhoneActive)
                      setDropdownCountryActive(false);
                    }}
                  >
                    <div className="register-company__select-left">
                      <div className="register-company__select-flag register-company__select-flag--phone"></div>
                    </div>

                    <div className="register-company__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "register-company__dropdown register-company__dropdown--phone",
                    {
                      "register-company__dropdown--active": dropdownPhoneActive
                    }
                  )}>
                    <input
                      type="text"
                      className='register-company__dropdown-input'
                      value={countrySearchInput}
                      onChange={(e) => {
                        const inputQuery = e.target.value.toLowerCase();
                        setCountrySearchInput(inputQuery);
                      }}
                    />

                    {countryList
                      .filter(country => country.name.toLowerCase()
                        .includes(countrySearchInput)
                      )
                      .map(country => (
                        <div
                          key={country.id}
                          className="register-company__dropdown-item"
                          onClick={() => {
                            handlePhonePrefix(country.phone_code);
                          }}
                        >
                          <div className="register-company__select-flag"></div>
                          
                          {country.phone_code}
                          {' - '}
                          {country.name}
                        </div>
                      ))
                    }
                  </div>

                  <div className="register-company__phone-input-prefix">
                    {phonePrefix}
                  </div>

                  <input
                    type="tel"
                    className='register-company__phone-input register-company__phone-input--right'
                    name='phoneNumber'
                    value={`${phoneNumber}`}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div className="register-company__labels-top-section">
              <label className='register-company__label'>
                <div className="register-company__label-title">
                  <div>Password</div>
                  <div>8 symbols min</div>
                </div>

                <input
                  type="password"
                  className='register-company__input'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className={cn(
                  "register-company__validate-icon",
                  {
                    "register-company__validate-icon--invalid": password.length > 0 && !passwordValidLength,
                    "register-company__validate-icon--valid": passwordValidLength,
                  }
                )}></div>
              </label>

              <label className='register-company__label'>
                <div className="register-company__label-title">
                  Password Verification
                </div>

                <input
                  type="password"
                  className='register-company__input'
                  name='passwordVerification'
                  value={passwordVerification}
                  onChange={(e) => setPasswordVerification(e.target.value)}
                />

                
                <div className={cn(
                  "register-company__validate-icon",
                  {
                    "register-company__validate-icon--invalid":  passwordVerification.length > 0 && !passwordMatch,
                    "register-company__validate-icon--valid": passwordMatch,
                  }
                )}></div>
              </label>
            </div>
          </div>

          <div className="register-company__separator"></div>

          <div className="register-company__labels-mid-bottom">
            <div className="register-company__labels-middle">
              <label className='register-company__label'>
                <div className="register-company__label-title">
                  Country of registration
                </div>

                <div
                  className='register-company__input register-company__select'
                  onClick={() => {
                    setDropdownCountryActive(!dropdownCountryActive)
                    setDropdownPhoneActive(false);
                  }}
                >
                  <div className="register-company__select-left">
                    <div className="register-company__select-flag"></div>

                    {countryName || 'Select country please'}
                  </div>

                  <div className="register-company__select-arrow"></div>
                </div>

                <div className={cn(
                  "register-company__dropdown",
                  {
                    "register-company__dropdown--active": dropdownCountryActive
                  }
                )}>
                  <input
                    type="text"
                    className='register-company__dropdown-input'
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
                        className="register-company__dropdown-item"
                        onClick={() => {
                          handleCountrySelect(country.id, country.name)
                        }}
                      >
                        <div className="register-company__select-flag"></div>
                        
                        {country.name}
                      </div>
                    ))
                  }
                </div>
              </label>

              <label className='register-company__label'>
                <div className="register-company__label-title">
                  tax id | vat number
                </div>

                <input
                  type="text"
                  className='register-company__input'
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                />
              </label>
            </div>

            <div className="register-company__labels-bottom">
              <div className="register-company__account-type">
                <div className="register-company__label-title register-company__account-type-title">
                  Account type requested
                </div>

                <label className='register-company__label-check'>
                  <input
                    type="checkbox"
                    className={cn(
                      "register-company__checkbox",
                      {
                        "register-company__checkbox--active": accountType === AccountType.DirectEmployer
                      }
                    )}
                    onClick={() => {
                      if (accountType === AccountType.DirectEmployer) {
                        setAccountType(AccountType.None);
                      } else {
                        setAccountType(AccountType.DirectEmployer)
                      }
                    }}
                  />
                  <div className="register-company__label-check-title">
                    Direct Employer
                  </div>
                </label>

                <label className='register-company__label-check'>
                  <input
                    type="checkbox"
                    className={cn(
                      "register-company__checkbox",
                      {
                        "register-company__checkbox--active": accountType === AccountType.RecruitingAgency
                      }
                    )}
                    onClick={() => {
                      if (accountType === AccountType.RecruitingAgency) {
                        setAccountType(AccountType.None);
                      } else {
                        setAccountType(AccountType.RecruitingAgency)
                      }
                    }}
                  />
                    <div className="register-company__label-check-title">
                      Recruitment Agency
                    </div>
                </label>
              </div>
              
              <div className="register-company__safe register-company__safe--label">
                <div className="register-company__safe-icon"></div>
                <div className="register-company__safe-text">
                  This page uses 128-bit encryption. Your details are safe.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-company__divider"></div>

        <div className="register-company__form-bottom">
          <div className="register-company__conditions">
            <label className='register-company__label-check'>
              <input
                type="checkbox"
                className={cn(
                  "register-company__checkbox",
                  {
                    "register-company__checkbox--active": subscribed
                  }
                )}
                onClick={() => {
                  setSubscribed(!subscribed)
                }}
              />
              <div className="register-company__label-check-title">
                Subscribe to our newsletters. No spam!
              </div>
            </label>
            <label className='register-company__label-check'>
              <input
                type="checkbox"
                className={cn(
                  "register-company__checkbox",
                  {
                    "register-company__checkbox--active": termsAccepted
                  }
                )}
                onClick={() => {
                  setTermsAccepted(!termsAccepted)
                }}
              />
              <div className="register-company__label-check-title">
                By creating an account on our website you agree to the
                <Link href='/' className='register-company__link'>
                  {' Terms of Service '}
                </Link>
                and
          
                <Link href='/' className='register-company__link'>
                  {' Privacy Policy '}
                </Link>
              </div>
            </label>
          </div>

          <div className="register-company__form-bottom-right">
            <button
              className="register-company__submit"
              type='submit'
            >
              Get Started
            </button>
            
            <div className="register-company__safe register-company__safe--bottom">
              <div className="register-company__safe-icon"></div>
              <div className="register-company__safe-text">
                This page uses 128-bit encryption. Your details are safe.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}