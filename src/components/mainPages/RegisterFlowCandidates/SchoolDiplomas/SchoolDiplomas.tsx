'use client';
import { 
  useState,
  useEffect, 
  useCallback
} from 'react';
import './SchoolDiplomas.scss';
import cn from 'classnames';

import { createYearsArray } from '@/utils/createYearArray';
import { CountryApi } from '@/types/CountryApi';
import { getCountry } from '@/services/api/country.service';
import { getMonthsArray } from '@/utils/getMonthsArray';
import { MonthType } from '@/types/MonthType';
import { EducationApi } from '@/types/EducationApi';
import {
  getEducations, 
  postEducation,
  getEducationById,
  updateEducationById,
  deleteEducationById
} from '@/services/api/education.service';
import { getInstitutionsType } from '@/services/api/institutionstype.service';
import { Object } from '@/types/Object';

const yearsArray = createYearsArray(2023, 1960);
const monthsArray: MonthType[] = getMonthsArray();


export const SchoolDiplomas = () => {
  const [startMonth, setStartMonth] = useState<MonthType | null>();
  const [startYear, setStartYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<MonthType | null>();
  const [endYear, setEndYear] = useState<string>('');
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [institutionType, setInstitutionType] = useState<string>('');
  const [institutionName, setInstitutionName] = useState<string>('');
  const [profile, setProfile] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const [countryName, setCountryName] = useState('');
  const [userId, setUserId] = useState('');

  const [infoContainers, setInfoContainers] = useState<EducationApi[]>([]);
  const [countryList, setCountryList] = useState<CountryApi[]>([]);
  const [institutionList, setInstitutionList] = useState<Object[]>([]);

  const [isNewMenuOpen, setIsNewMenuOpen] = useState<boolean>(false);
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<boolean>(false);
  const [dropdownInstitutionActive, setDropdownInstitutionActive] = useState(false);
  const [dropdownCountryActive, setDropdownCountryActive] = useState(false);
  const [dropdownStartMonthActive, setDropdownStartMonthActive] = useState(false);
  const [dropdownStartYearActive, setDropdownStartYearActive] = useState(false);
  const [dropdownEndMonthActive, setDropdownEndMonthActive] = useState(false);
  const [dropdownEndYearActive, setDropdownEndYearActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [selectedEducation, setSelectedEducation] = useState<EducationApi>();
  //we set the states based on selectedEducation
  const [selectedStartMonth, setSelectedStartMonth] = useState<MonthType | null>();
  const [selectedStartYear, setSelectedStartYear] = useState<string>('');
  const [selectedEndMonth, setSelectedEndMonth] = useState<MonthType | null>();
  const [selectedEndYear, setSelectedEndYear] = useState<string>('');
  const [selectedInProgress, setSelectedInProgress] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [selectedInstitutionName, setSelectedInstitutionName] = useState<string>('');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('');
  const [selectedObservations, setSelectedObservations] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCountryName, setSelectedCountryName] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');
  
  useEffect(() => {
    if (!selectedEducation) {
      return;
    }
    // if we add Education we trigger this func to update selectedStates
    const startDate = new Date(selectedEducation.from_date);
    const startMonth: MonthType | undefined = monthsArray.find(month => +month.id === startDate.getMonth())
    const startYear = startDate.getFullYear();

    //handling if we don't have to_date 
    let endDate: Date | null = null;
    let endMonth: MonthType | undefined = undefined;
    let endYear = null;

    setSelectedEndMonth(undefined);
    setSelectedEndYear('');

    if (selectedEducation.to_date) {
      endDate = new Date(selectedEducation.to_date);
      endMonth = monthsArray.find(month => +month.id === endDate?.getMonth())
      endYear = endDate.getFullYear();
      setSelectedEndMonth(endMonth);
      setSelectedEndYear(String(endYear));
    }

    setSelectedStartMonth(startMonth);
    setSelectedStartYear(String(startYear));
    setSelectedProfile(selectedEducation.profile);
    setSelectedInProgress(selectedEducation.in_progress);
    setSelectedInstitutionName(selectedEducation.institution_name);
    setSelectedInstitutionType(selectedEducation.institution_type);
    setSelectedObservations(selectedEducation.observations);
    setSelectedCity(selectedEducation.city);
    setSelectedCountryName(selectedEducation.country);

    if (selectedEducation.id) {
      // the id is there but its optional and need extra check for ts 
      setSelectedId(selectedEducation.id)
    }
  } , [selectedEducation])

  const resetOurFields = useCallback(() => {
    setStartMonth(null);
    setStartYear('');
    setEndMonth(null);
    setEndYear('');
    setInProgress(false);
    setProfile('');
    setInstitutionType('');
    setInstitutionName('');
    setCity('');
    setCountryName('');
    setObservations('');
  }, []);
  
  const resetSelectedFields = useCallback(() => {
    setSelectedStartMonth(null);
    setSelectedStartYear('');
    setSelectedEndMonth(null);
    setSelectedEndYear('');
    setSelectedInProgress(false);
    setSelectedProfile('');
    setSelectedInstitutionType('');
    setSelectedInstitutionName('');
    setSelectedCity('');
    setSelectedCountryName('');
    setSelectedObservations('');
    setSelectedId('');
  }, []);

  const getEducationsFromServer = useCallback(() => {
    getEducations()
      .then(resp => {
        const data: EducationApi[] = resp.data.diplomas;
        setInfoContainers(data);
      })
  }, []);

  useEffect(() => {
    //get dropdowns data
    getCountry()
      .then(resp => {
        if (resp) {
          const countries = resp.data.countries;
          setCountryList(countries)
        }
      })

    getInstitutionsType()
      .then(resp => {
        if (resp) {
          const institutions = resp.data.institutionType;
          setInstitutionList(institutions);
        }
      })

    const user = localStorage.getItem('userId');

    if (user) {
      setUserId(user);
    }

    getEducationsFromServer();
  }, []);

  
  const addEducation = () => {
    const dataValid = startYear.length > 0 
      && startMonth
      && institutionType
      && institutionName
      && profile
      && city
      && countryName
      && observations
      && userId;

    if (dataValid) {
      const data: EducationApi = {
        from_date: new Date(+startYear, +startMonth?.id),
        in_progress: inProgress,
        institution_type: institutionType,
        institution_name: institutionName,
        profile: profile,
        city: city,
        user_id: userId,
        country: countryName,
        observations: observations,
      }

      if (endMonth && endYear) {
        data.to_date = new Date(+endYear, +endMonth?.id);
      } else {
        data.in_progress = true;
      }

      postEducation(data)
        .then(resp => {
          resetOurFields();
          getEducationsFromServer();
          setIsNewMenuOpen(false);
        })
        .catch(error => console.log(error))
    }
  }

  const updateEducation = () => {
    const dataValid = selectedStartYear.length > 0 
      && selectedStartMonth
      && selectedInstitutionType
      && selectedInstitutionName
      && selectedProfile
      && selectedCity
      && selectedCountryName
      && selectedObservations
      && userId;

      
    if (dataValid 
      && selectedStartMonth 
      && selectedStartYear 
    ) {
      const data: EducationApi = {
        from_date: new Date(+selectedStartYear, +selectedStartMonth?.id),
        in_progress: selectedInProgress,
        institution_type: selectedInstitutionType,
        institution_name: selectedInstitutionName,
        profile: selectedProfile,
        city: selectedCity,
        user_id: userId,
        country: selectedCountryName,
        observations: selectedObservations,
      }

      if (selectedEndMonth && selectedEndYear) {
        console.log('end date')
        data.to_date = new Date(+selectedEndYear, +selectedEndMonth?.id);
      } else {
        data.in_progress = true;
      }

      updateEducationById(selectedId, data)
        .then(resp => {
          resetSelectedFields();
          getEducationsFromServer();
          setIsUpdateMenuOpen(false);
        })
    }
  }

  const getEducationInfo = (id: string) => {
    getEducationById(id)
      .then(resp => {
        console.log(resp.data);
        setSelectedEducation(resp.data);
      })
  }

  const removeEducation = useCallback((id: string) => {
    deleteEducationById(id)
      .then(resp => {
        console.log(resp);

        getEducationsFromServer();
      })
  }, []);

  return (
    <div  className={cn(
      "sc",
      {
        "sc--inactive": false
      }
    )}>

      <h1 className="sc__title">
        Companies like to know what you know - add your education here.
      </h1>

      <div className="sc__text">
        You don’t have to have a degree. Adding any relevant education helps make your profile more visible.
      </div>

      {infoContainers.length > 0 && (
        <div className="sc__containers">
          {infoContainers.map(container => {
            const {
              id,
              from_date,
              to_date,
              in_progress,
              institution_type,
              institution_name,
              profile,
              city,
              country,
              observations,
            } = container;

            const startDate = new Date(from_date);
            const startMonth: MonthType | undefined = monthsArray.find(month => +month.id === startDate.getMonth())
            const startYear = startDate.getFullYear();

            let endDate: Date | null = null;
            let endMonth: MonthType | undefined;
            let endYear;

            if (to_date) {
              endDate = new Date(to_date);
              endMonth = monthsArray.find(month => +month.id === endDate?.getMonth())
              endYear = endDate.getFullYear();
            }

            // on save we need a function to find the experience by id and modify it's data
            // we pass the id of the current container

            return (
              <div key={id} className="sc__container">
                <div className="sc__container-main-icon"></div>

                <div className="sc__container-content">
                  <div className="sc__container-job">
                    {institution_name}
                  </div>

                  <div className="sc__container-company">
                    {profile}
                  </div>

                  <div className="sc__container-date">
                    {`${startMonth?.name} ${startYear}`}
                    {' - '}
                    {in_progress ? (
                      'Present'
                    ) : (
                      `${endMonth?.name} ${endYear}`
                    )}
                  </div>

                  <div className="sc__container-description">
                    {observations}
                  </div>
                </div>

                <div className="sc__container-icons">
                  <div
                    className="sc__container-icon-container"
                    onClick={() => {
                      if (!isNewMenuOpen) {
                        setIsUpdateMenuOpen(true);
                      }
                      
                      if (id) {
                        getEducationInfo(id)
                      }
                    }}
                  >
                    <div className="sc__container-icon sc__container-icon--edit"></div>
                  </div>

                  <div
                    className="sc__container-icon-container"
                    onClick={() => {
                      if (id) {
                        removeEducation(id);
                      }
                    }}
                  >
                    <div className="sc__container-icon sc__container-icon--delete"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div
        className={cn(
          "sc__add-button",
          {
            "sc__add-button--empty": infoContainers.length < 1
          }
        )}
        onClick={() => {
          if (!isUpdateMenuOpen) {
            setIsNewMenuOpen(true);
          }
        }}
      >
        <div className="sc__add-button-icon"></div>

        <div className="sc__add-button-text">
          Add education
        </div>
      </div>

      <div 
        className={cn(
          "sc__menu",
          {
            "sc__menu--active": isNewMenuOpen
          }
        )}
      >
        <div className="sc__menu-title">
          add Education history
        </div>

        <div className="sc__menu-form">
          <label className='sc__label'>
            <div className="sc__label-title">
              Type of institution *
            </div>

            <div
              className='sc__input sc__select'
              onClick={() => {
                setDropdownCountryActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownInstitutionActive(!dropdownInstitutionActive);
                setSearchInput('');
              }}
            >
              <div className="sc__select-left">
                {institutionType || 'Select type of institution'}
              </div>
              <div className="sc__select-arrow"></div>
            </div>

            <div className={cn(
              "sc__dropdown",
              "sc__dropdown--country",
              {
                "sc__dropdown--active": dropdownInstitutionActive
              }
            )}>
              <input
                type="text"
                className='sc__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery)
                }}
              />

              {institutionList
                .filter(institution => institution.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(institution => (
                  <div
                    key={institution.id}
                    className="sc__dropdown-item"
                    onClick={() => {
                      setSearchInput('');
                      setInstitutionType(institution.name);
                      setDropdownInstitutionActive(false);
                    }}
                  >
                    {institution.name}
                  </div>
                ))
              }
            </div>
          </label>

          <div className="sc__label">
            <div className="sc__label-title">
              Name of Institution *
            </div>

            <input
              className="sc__input"
              type="text"
              value={institutionName}
              onChange={(e) => {
                setInstitutionName(e.target.value);
              }}
            />
          </div>

          <div className="sc__label">
            <div className="sc__label-title">
              Profile / Specialization *
            </div>

            <input
              className="sc__input"
              type="text"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
              }}
            />
          </div>

          <div className="sc__checkbox-container">
            <input
              className={cn(
                'sc__checkbox',
                {
                  'sc__checkbox--active': inProgress,
                }
              )}
              type="checkbox"
              checked={inProgress}
              onChange={() => {
                setInProgress(!inProgress);
                setDropdownInstitutionActive(false);
                setDropdownCountryActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
              }}
            />

            <div className="sc__label-title">
              In Progress
            </div>
          </div>

          <div className="sc__dates-container">
            <div className="sc__date-container">
              <div className="sc__label-title">
                Start Date *
              </div>

              <div className="sc__dates">
                <div className="sc__date">
                  <div
                    className='sc__input sc__select'
                    onClick={() => {
                      setDropdownInstitutionActive(false);
                      setDropdownCountryActive(false);
                      setDropdownStartMonthActive(!dropdownStartMonthActive);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="sc__select-left">
                      {startMonth?.name || 'Month'}
                    </div>
                    <div className="sc__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "sc__dropdown",
                    "sc__dropdown--dates",
                    {
                      "sc__dropdown--active": dropdownStartMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="sc__dropdown-item"
                          onClick={() => {
                            setStartMonth(month);
                            setDropdownStartMonthActive(false);
                          }}
                        >
                          {month.name}
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div className="sc__date">
                  <div
                    className='sc__input sc__select'
                    onClick={() => {
                      setDropdownInstitutionActive(false);
                      setDropdownCountryActive(false);
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(!dropdownStartYearActive);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="sc__select-left">
                      {startYear || 'Year'}
                    </div>

                    <div className="sc__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "sc__dropdown",
                    "sc__dropdown--dates",
                    {
                      "sc__dropdown--active": dropdownStartYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='sc__dropdown-input'
                      value={searchInput}
                      onChange={(e) => {
                        const inputQuery = e.target.value.toLowerCase();
                        setSearchInput(inputQuery)
                      }}
                    />

                    {yearsArray
                      .filter(year => year.toLowerCase()
                      .includes(searchInput)
                      )
                      .map((year, i) => (
                        <div
                          key={i}
                          className="sc__dropdown-item"
                          onClick={() => {
                            setStartYear(year);
                            setDropdownStartYearActive(false);
                            setSearchInput('');
                          }}
                        >
                          {year}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="sc__date-container">
              <div className="sc__label-title">
                End Date *
              </div>

              {!inProgress ? (
                <div className="sc__dates">
                  <div className="sc__date">
                    <div
                      className='sc__input sc__select'
                      onClick={() => {
                        setDropdownInstitutionActive(false);
                        setDropdownCountryActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(!dropdownEndMonthActive);
                        setDropdownEndYearActive(false);
                        setSearchInput('');
                      }}
                    >
                      <div className="sc__select-left">
                        {endMonth?.name || 'Month'}
                      </div>
                      <div className="sc__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "sc__dropdown",
                      "sc__dropdown--dates",
                      {
                        "sc__dropdown--active": dropdownEndMonthActive
                      }
                    )}>
                      {monthsArray
                        .map((month) => (
                          <div
                            key={month.id}
                            className="sc__dropdown-item"
                            onClick={() => {
                              setEndMonth(month);
                              setDropdownEndMonthActive(false);
                            }}
                          >
                            {month.name}
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className="sc__date">
                    <div
                      className='sc__input sc__select'
                      onClick={() => {
                        setDropdownInstitutionActive(false);
                        setDropdownCountryActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(false);
                        setDropdownEndYearActive(!dropdownStartYearActive);
                        setSearchInput('');
                      }}
                    >
                      <div className="sc__select-left">
                        {endYear || 'Year'}
                      </div>

                      <div className="sc__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "sc__dropdown",
                      "sc__dropdown--dates",
                      {
                        "sc__dropdown--active": dropdownEndYearActive
                      }
                    )}>
                      <input
                        type="text"
                        className='sc__dropdown-input'
                        value={searchInput}
                        onChange={(e) => {
                          const inputQuery = e.target.value.toLowerCase();
                          setSearchInput(inputQuery)
                        }}
                      />

                      {yearsArray
                        .filter(year => year.toLowerCase()
                          .includes(searchInput)
                        )
                        .map((year, i) => (
                          <div
                            key={i}
                            className="sc__dropdown-item"
                            onClick={() => {
                              setEndYear(year);
                              setDropdownEndYearActive(false);
                              setSearchInput('');
                            }}
                          >
                            {year}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sc__present">
                  Present
                </div>
              )}
            </div>
          </div>

          <div className="sc__label">
            <div className="sc__label-title">
              City *
            </div>

            <input
              className="sc__input"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          
          <label className='sc__label'>
            <div className="sc__label-title">
              Country *
            </div>

            <div
              className='sc__input sc__select'
              onClick={() => {
                setDropdownCountryActive(!dropdownCountryActive)
                setDropdownInstitutionActive(false)
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setSearchInput('');
              }}
            >
              <div className="sc__select-left">
                <div className="sc__select-flag"></div>

                {countryName || 'Select country'}
              </div>
              <div className="sc__select-arrow"></div>
            </div>

            <div className={cn(
              "sc__dropdown",
              "sc__dropdown--country",
              {
                "sc__dropdown--active": dropdownCountryActive
              }
            )}>
              <input
                type="text"
                className='sc__dropdown-input'
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
                    className="sc__dropdown-item"
                    onClick={() => {
                      setSearchInput('');
                      setCountryName(country.name);
                      setDropdownCountryActive(false);
                    }}
                  >
                    <div className="sc__select-flag"></div>
    
                    {country.name}
                  </div>
                ))
              }
            </div>
          </label>
          
          <div className="sc__label">
            <div className="sc__label-title">
              Observations
            </div>

            <textarea
              className="sc__textarea"
              value={observations}
              onChange={(e) => {
                setObservations(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="sc__buttons">
          <div 
            className="sc__button sc__button-delete"
            onClick={() => {
              setIsNewMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="sc__button sc__button-save"
            onClick={() => {
              addEducation();
            }}
          >
            Save
          </div>
        </div>
      </div>

      
      <div 
        className={cn(
          "sc__menu",
          {
            "sc__menu--active": isUpdateMenuOpen
          }
        )}
      >
        <div className="sc__menu-title">
          update Education history
        </div>

        <div className="sc__menu-form">
          <label className='sc__label'>
            <div className="sc__label-title">
              Type of institution *
            </div>

            <div
              className='sc__input sc__select'
              onClick={() => {
                setDropdownCountryActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownInstitutionActive(!dropdownInstitutionActive);
                setSearchInput('');
              }}
            >
              <div className="sc__select-left">
                {selectedInstitutionType}
              </div>
              <div className="sc__select-arrow"></div>
            </div>

            <div className={cn(
              "sc__dropdown",
              "sc__dropdown--country",
              {
                "sc__dropdown--active": dropdownInstitutionActive
              }
            )}>
              <input
                type="text"
                className='sc__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery)
                }}
              />

              {institutionList
                .filter(institution => institution.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(institution => (
                  <div
                    key={institution.id}
                    className="sc__dropdown-item"
                    onClick={() => {
                      setSearchInput('');
                      setSelectedInstitutionType(institution.name);
                      setDropdownInstitutionActive(false);
                    }}
                  >
                    {institution.name}
                  </div>
                ))
              }
            </div>
          </label>

          <div className="sc__label">
            <div className="sc__label-title">
              Name of Institution *
            </div>

            <input
              className="sc__input"
              type="text"
              value={selectedInstitutionName}
              onChange={(e) => {
                setSelectedInstitutionName(e.target.value);
              }}
            />
          </div>

          <div className="sc__label">
            <div className="sc__label-title">
              Profile / Specialization *
            </div>

            <input
              className="sc__input"
              type="text"
              value={selectedProfile}
              onChange={(e) => {
                setSelectedProfile(e.target.value);
              }}
            />
          </div>

          <div className="sc__checkbox-container">
            <input
              className={cn(
                'sc__checkbox',
                {
                  'sc__checkbox--active': selectedInProgress,
                }
              )}
              type="checkbox"
              checked={selectedInProgress}
              onChange={() => {
                setSelectedInProgress(!selectedInProgress);
                setDropdownInstitutionActive(false);
                setDropdownCountryActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
              }}
            />

            <div className="sc__label-title">
              In Progress
            </div>
          </div>

          <div className="sc__dates-container">
            <div className="sc__date-container">
              <div className="sc__label-title">
                Start Date *
              </div>

              <div className="sc__dates">
                <div className="sc__date">
                  <div
                    className='sc__input sc__select'
                    onClick={() => {
                      setDropdownInstitutionActive(false);
                      setDropdownCountryActive(false);
                      setDropdownStartMonthActive(!dropdownStartMonthActive);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="sc__select-left">
                      {selectedStartMonth?.name}
                    </div>
                    <div className="sc__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "sc__dropdown",
                    "sc__dropdown--dates",
                    {
                      "sc__dropdown--active": dropdownStartMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="sc__dropdown-item"
                          onClick={() => {
                            setSelectedStartMonth(month);
                            setDropdownStartMonthActive(false);
                          }}
                        >
                          {month.name}
                        </div>
                      ))
                    }
                  </div>
                </div>
                
                <div className="sc__date">
                  <div
                    className='sc__input sc__select'
                    onClick={() => {
                      setDropdownInstitutionActive(false);
                      setDropdownCountryActive(false);
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(!dropdownStartYearActive);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="sc__select-left">
                      {selectedStartYear}
                    </div>

                    <div className="sc__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "sc__dropdown",
                    "sc__dropdown--dates",
                    {
                      "sc__dropdown--active": dropdownStartYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='sc__dropdown-input'
                      value={searchInput}
                      onChange={(e) => {
                        const inputQuery = e.target.value.toLowerCase();
                        setSearchInput(inputQuery)
                      }}
                    />

                    {yearsArray
                      .filter(year => year.toLowerCase()
                      .includes(searchInput)
                      )
                      .map((year, i) => (
                        <div
                          key={i}
                          className="sc__dropdown-item"
                          onClick={() => {
                            setSelectedStartYear(year);
                            setDropdownStartYearActive(false);
                            setSearchInput('');
                          }}
                        >
                          {year}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="sc__date-container">
              <div className="sc__label-title">
                End Date *
              </div>

              {!selectedInProgress ? (
                <div className="sc__dates">
                  <div className="sc__date">
                    <div
                      className='sc__input sc__select'
                      onClick={() => {
                        setDropdownInstitutionActive(false);
                        setDropdownCountryActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(!dropdownEndMonthActive);
                        setDropdownEndYearActive(false);
                        setSearchInput('');
                      }}
                    >
                      <div className="sc__select-left">
                        {selectedEndMonth?.name || 'Month'}
                      </div>
                      <div className="sc__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "sc__dropdown",
                      "sc__dropdown--dates",
                      {
                        "sc__dropdown--active": dropdownEndMonthActive
                      }
                    )}>
                      {monthsArray
                        .map((month) => (
                          <div
                            key={month.id}
                            className="sc__dropdown-item"
                            onClick={() => {
                              setSelectedEndMonth(month);
                              setDropdownEndMonthActive(false);
                            }}
                          >
                            {month.name}
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className="sc__date">
                    <div
                      className='sc__input sc__select'
                      onClick={() => {
                        setDropdownInstitutionActive(false);
                        setDropdownCountryActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(false);
                        setDropdownEndYearActive(!dropdownStartYearActive);
                        setSearchInput('');
                      }}
                    >
                      <div className="sc__select-left">
                        {selectedEndYear || 'Year'}
                      </div>

                      <div className="sc__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "sc__dropdown",
                      "sc__dropdown--dates",
                      {
                        "sc__dropdown--active": dropdownEndYearActive
                      }
                    )}>
                      <input
                        type="text"
                        className='sc__dropdown-input'
                        value={searchInput}
                        onChange={(e) => {
                          const inputQuery = e.target.value.toLowerCase();
                          setSearchInput(inputQuery)
                        }}
                      />

                      {yearsArray
                        .filter(year => year.toLowerCase()
                          .includes(searchInput)
                        )
                        .map((year, i) => (
                          <div
                            key={i}
                            className="sc__dropdown-item"
                            onClick={() => {
                              setSelectedEndYear(year);
                              setDropdownEndYearActive(false);
                              setSearchInput('');
                            }}
                          >
                            {year}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sc__present">
                  Present
                </div>
              )}
            </div>
          </div>

          <div className="sc__label">
            <div className="sc__label-title">
              City *
            </div>

            <input
              className="sc__input"
              type="text"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
            />
          </div>
          
          <label className='sc__label'>
            <div className="sc__label-title">
              Country *
            </div>

            <div
              className='sc__input sc__select'
              onClick={() => {
                setDropdownCountryActive(!dropdownCountryActive)
                setDropdownInstitutionActive(false)
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setSearchInput('');
              }}
            >
              <div className="sc__select-left">
                <div className="sc__select-flag"></div>

                {selectedCountryName}
              </div>
              <div className="sc__select-arrow"></div>
            </div>

            <div className={cn(
              "sc__dropdown",
              "sc__dropdown--country",
              {
                "sc__dropdown--active": dropdownCountryActive
              }
            )}>
              <input
                type="text"
                className='sc__dropdown-input'
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
                    className="sc__dropdown-item"
                    onClick={() => {
                      setSearchInput('');
                      setSelectedCountryName(country.name);
                      setDropdownCountryActive(false);
                    }}
                  >
                    <div className="sc__select-flag"></div>
    
                    {country.name}
                  </div>
                ))
              }
            </div>
          </label>
          
          <div className="sc__label">
            <div className="sc__label-title">
              Observations
            </div>

            <textarea
              className="sc__textarea"
              value={selectedObservations}
              onChange={(e) => {
                setSelectedObservations(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="sc__buttons">
          <div 
            className="sc__button sc__button-delete"
            onClick={() => {
              setIsUpdateMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="sc__button sc__button-save"
            onClick={() => {
              updateEducation();
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  )
}
