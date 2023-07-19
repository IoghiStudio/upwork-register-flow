'use client';
import { useState, useEffect, useCallback } from 'react';
import './UserProfile.scss';
import { getCountry } from '@/services/api/country.service';
import cn from 'classnames';
import { CountryApi } from '@/types/CountryApi';
import { getNationality } from '@/services/api/nationality.service';
import { NationalityApi } from '@/types/NationalityApi';
import { Object } from '@/types/Object';

export const UserProfile = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phonePrefix, setPhonePrefix] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addressTwo, setAddressTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [nationalityName, setNationalityName] = useState('');
  const [nationalityCode, setNationalityCode] = useState('');

  const [nationalityList, setNationalityList] = useState<NationalityApi[]>([]);
  const [countryList, setCountryList] = useState<CountryApi[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [dropdownPhoneActive, setDropdownPhoneActive] = useState(false);
  const [dropdownCountryActive, setDropdownCountryActive] = useState(false);
  const [dropdownNationalityActive, setDropdownNationalityActive] = useState(false);

  const [userInfo, setUserInfo] = useState<Object | null>(null);

  useEffect(() => {
    if (userInfo) {
      setFirstname(userInfo.first_name)
      setLastname(userInfo.last_name)
    }
  }, [userInfo])

  const handleCountrySelect = useCallback((id: string, name: string) => {
    setCountryName(name);
    setCountryCode(id);
    setDropdownCountryActive(false);
    setSearchInput('');
  }, []);

  const handleNationalitySelect = useCallback((id: string, name: string) => {
    setNationalityName(name);
    setNationalityCode(id);
    setDropdownNationalityActive(false);
    setSearchInput('');
  }, []);

  const handlePhonePrefix = useCallback((code: string) => {
    setPhonePrefix(code);
    setDropdownPhoneActive(false);
    setSearchInput('');
  }, []);
  
  useEffect(() => {
    const userDetails = localStorage.getItem('userData');

    if (userDetails) {
      setUserInfo(JSON.parse(userDetails));
    }

    getCountry()
      .then(resp => {
        if (resp) {
          const data = resp.data.countries;
          setCountryList(data)
        }
      })

    getNationality()
      .then(resp => {
        const data = resp.data.languages
        setNationalityList(data);
      })
  }, []);

  return (
    <div className="profile">
      <h1 className="profile__title">
        A few last details, then you can check and publish your profile.
      </h1>

      <div className="profile__text">
        A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you through us - which is why we need your personal information.
      </div>

      <div className="profile__content">
        <div className="profile__portrait">
          <div className="profile__portrait-image"></div>

          <div className="profile__portrait-upload">
            <div className="profile__portrait-upload-icon"></div>

            <div className="profile__portrait-upload-text">
              Upload photo
            </div>
          </div>
        </div>

        <div className="profile__form">
          <div className="profile__names">
            <label className='profile__label'>
              <div className="profile__label-title">
                First Name *
              </div>

              <input
                type="text"
                className='profile__input'
                name='firstname'
                placeholder=''
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>

            <label className='profile__label'>
              <div className="profile__label-title">
                Last Name *
              </div>

              <input
                type="text"
                className='profile__input'
                name='lastname'
                placeholder=''
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>

          <div className="profile__dropdowns">
            <label className='profile__label'>
              <div className="profile__label-title">
                Phone
              </div>

              <div className="profile__phone-inputs">
                <div
                  className='profile__phone-input
                  profile__phone-input--left
                  profile__select'
                  onClick={() => {
                    setDropdownPhoneActive(!dropdownPhoneActive)
                    setDropdownCountryActive(false);
                  }}
                >
                  <div className="profile__select-left">
                    <div className="profile__select-flag profile__select-flag--phone"></div>
                  </div>

                  <div className="profile__select-arrow"></div>
                </div>
                <div className={cn(
                  "profile__dropdown profile__dropdown--phone",
                  {
                    "profile__dropdown--active": dropdownPhoneActive
                  }
                )}>
                  <input
                    type="text"
                    className='profile__dropdown-input'
                    value={searchInput}
                    onChange={(e) => {
                      const inputQuery = e.target.value.toLowerCase();
                      setSearchInput(inputQuery);
                    }}
                  />

                  {countryList
                    .filter(country => country.name.toLowerCase()
                      .includes(searchInput)
                    )
                    .map(country => (
                      <div
                        key={country.id}
                        className="profile__dropdown-item"
                        onClick={() => {
                          handlePhonePrefix(country.phone_code);
                        }}
                      >
                        <div className="profile__select-flag"></div>
      
                        {country.phone_code}
                        {' - '}
                        {country.name}
                      </div>
                    ))
                  }
                </div>

                <div className="profile__phone-input-prefix">
                  {phonePrefix}
                </div>

                <input
                  type="tel"
                  className='profile__phone-input profile__phone-input--right'
                  name='phoneNumber'
                  value={`${phoneNumber}`}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </label>

            <label className='profile__label'>
              <div className="profile__label-title">
                Nationality *
              </div>

              <div
                className='profile__input profile__select profile__select--nat'
                onClick={() => {
                  setDropdownNationalityActive(!dropdownNationalityActive)
                  setDropdownPhoneActive(false);
                  setDropdownCountryActive(false);
                }}
              >
                <div className="profile__select-left">
                  {nationalityName || 'Select nationality'}
                </div>

                <div className="profile__select-arrow"></div>
              </div>

              <div className={cn(
                "profile__dropdown",
                {
                  "profile__dropdown--active": dropdownNationalityActive
                }
              )}>
                <input
                  type="text"
                  className='profile__dropdown-input'
                  value={searchInput}
                  onChange={(e) => {
                    const inputQuery = e.target.value.toLowerCase();
                    setSearchInput(inputQuery)
                  }}
                />

                {nationalityList
                  .filter(nationality => nationality.name.toLowerCase()
                    .includes(searchInput)
                  )
                  .map(nationality => (
                    <div
                      key={nationality.id}
                      className="profile__dropdown-item"
                      onClick={() => {
                        handleNationalitySelect(nationality.id, nationality.name)
                      }}
                    >
                      {nationality.name}
                    </div>
                  ))
                }
              </div>
            </label>
          </div>

          <div className="profile__streets">
            <label className='profile__label'>
              <div className="profile__label-title">
                Street Adress line 1 *
              </div>

              <input
                type="text"
                className='profile__input'
                name='lastname'
                placeholder=''
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label className='profile__label'>
              <div className="profile__label-title">
                Street Adress line 2
              </div>

              <input
                type="text"
                className='profile__input'
                name='lastname'
                placeholder=''
                value={addressTwo}
                onChange={(e) => setAddressTwo(e.target.value)}
              />
            </label>
          </div>

          <div className="profile__location">
            <label className='profile__label'>
              <div className="profile__label-title">
                City *
              </div>

              <input
                type="text"
                className='profile__input'
                name='lastname'
                placeholder=''
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>

            <label className='profile__label'>
              <div className="profile__label-title">
                State *
              </div>

              <input
                type="text"
                className='profile__input'
                name='lastname'
                placeholder=''
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>

            <label className='profile__label'>
              <div className="profile__label-title">
                Country *
              </div>

              <div
                className='profile__input profile__select'
                onClick={() => {
                  setDropdownCountryActive(!dropdownCountryActive)
                  setDropdownPhoneActive(false);
                  setDropdownNationalityActive(false);
                }}
              >
                <div className="profile__select-left">
                  <div className="profile__select-flag"></div>

                  {countryName || 'Select country'}
                </div>
                <div className="profile__select-arrow"></div>
              </div>

              <div className={cn(
                "profile__dropdown",
                "profile__dropdown--country",
                {
                  "profile__dropdown--active": dropdownCountryActive
                }
              )}>
                <input
                  type="text"
                  className='profile__dropdown-input'
                  value={searchInput}
                  onChange={(e) => {
                    const inputQuery = e.target.value.toLowerCase();
                    setSearchInput(inputQuery)
                  }}
                />

                {countryList
                  .filter(country => country.name.toLowerCase()
                    .includes(searchInput)
                  )
                  .map(country => (
                    <div
                      key={country.id}
                      className="profile__dropdown-item"
                      onClick={() => {
                        handleCountrySelect(country.id, country.name)
                      }}
                    >
                      <div className="profile__select-flag"></div>
      
                      {country.name}
                    </div>
                  ))
                }
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
} 