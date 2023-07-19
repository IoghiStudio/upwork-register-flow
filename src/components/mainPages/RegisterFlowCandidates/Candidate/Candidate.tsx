'use client';
import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import './Candidate.scss';
import cn from 'classnames';
import { getCountry } from '@/services/api/country.service';
import { CountryApi } from '@/types/CountryApi';

export const Candidate = () => {
  //job type
  const [allTypes, setAllTypes] = useState<boolean>(false);
  const [fullTime, setFullTime] = useState<boolean>(false);
  const [partTime, setPartTime] = useState<boolean>(false);
  const [internship, setInternship] = useState<boolean>(false);
  const [project, setProject] = useState<boolean>(false);

  const [relocation, setRelocation] = useState<boolean>(false);
  const [industriesSelected, setIndustriesSelected] = useState<string[]>([]);
  const [departmentsSelected, setDepartmentsSelected] = useState<string[]>([]);
  const [countriesSelected, setCountriesSelected] = useState<string[]>([]);
  const [wantedSalary, setWantedSalary] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('');
  
  // lists for dropdowns
  const [industryList, setIndustryList] = useState<string[]>([]);
  const [departmentList, setDepartmentList] = useState<string[]>([]);
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [countryList, setCountryList] = useState<CountryApi[]>([]);

  //dropdown states
  const [dropdownIndustryActive, setDropdownIndustryActive] = useState(false);
  const [dropdownDepartmentActive, setDropdownDepartmentActive] = useState(false);
  const [dropdownCurrencyActive, setDropdownCurrencyActive] = useState(false);
  const [dropdownCountryActive, setDropdownCountryActive] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const handleCountrySelect = useCallback((name: string, id?: string) => {
    if (!countriesSelected.includes(name)) {
      setCountriesSelected(state => [...state, name]);
    }

    setDropdownCountryActive(false);
    setSearchInput('');
  }, [countriesSelected]);

  useEffect(() => {
    getCountry()
      .then(resp => {
        if (resp) {
          const countries = resp.data.countries;
          setCountryList(countries)
        }
      })
  }, []);

  return (
    <div className="c">
      <h1 className="c__title">
        Few more steps and your profile will be completed.
      </h1>

      <div className="c__text">
        Prove to companies that you have what they need. Lorem lroem lorem lorem lorem 
      </div>

      <div className="c__top">
        <div className="c__top-left">
          <div className='c__label c__label--types'>
            <div className="c__label-title">
              Type of job
            </div>

            <div className="c__checkbox-container">
              <input
                className={cn(
                  'c__checkbox',
                  {
                    'c__checkbox--active': allTypes,
                  }
                )}
                type="checkbox"
                checked={allTypes}
                onChange={() => {
                  if (!allTypes) {
                    setAllTypes(true);
                    setFullTime(true);
                    setPartTime(true);
                    setInternship(true);
                    setProject(true);
                  } else {
                    setAllTypes(false);
                  }
                }}
              />

              <div className="c__label-title">
                All types
              </div>
            </div>

            <div className="c__checkbox-container">
              <input
                className={cn(
                  'c__checkbox',
                  {
                    'c__checkbox--active': fullTime,
                  }
                )}
                type="checkbox"
                checked={fullTime}
                onChange={() => {
                  setFullTime(!fullTime);
                  setAllTypes(false);

                  if (!fullTime && partTime && project && internship) {
                    setAllTypes(true);
                  }
                }}
              />

              <div className="c__label-title">
                Full-time
              </div>
            </div>

            <div className="c__checkbox-container">
              <input
                className={cn(
                  'c__checkbox',
                  {
                    'c__checkbox--active': partTime,
                  }
                )}
                type="checkbox"
                checked={partTime}
                onChange={() => {
                  setPartTime(!partTime);
                  setAllTypes(false);

                  if (fullTime && !partTime && project && internship) {
                    setAllTypes(true);
                  }
                }}
              />

              <div className="c__label-title">
                Part-time
              </div>
            </div>
            
            <div className="c__checkbox-container">
              <input
                className={cn(
                  'c__checkbox',
                  {
                    'c__checkbox--active': internship,
                  }
                )}
                type="checkbox"
                checked={internship}
                onChange={() => {
                  setInternship(!internship);
                  setAllTypes(false);

                  if (fullTime && partTime && project && !internship) {
                    setAllTypes(true);
                  }
                }}
              />

              <div className="c__label-title">
                Internship / Volunteering
              </div>
            </div>

            <div className="c__checkbox-container">
              <input
                className={cn(
                  'c__checkbox',
                  {
                    'c__checkbox--active': project,
                  }
                )}
                type="checkbox"
                checked={project}
                onChange={() => {
                  setProject(!project);
                  setAllTypes(false);

                  if (fullTime && partTime && !project && internship) {
                    setAllTypes(true);
                  }
                }}
              />

              <div className="c__label-title">
                Project / Seasonal
              </div>
            </div>
          </div>
        </div>

        <div className="c__top-right">
          <div className="c__relocation">
            <div className="c__checkbox-container">
              <input
                className={cn(
                  'c__checkbox',
                  {
                    'c__checkbox--active': relocation,
                  }
                )}
                type="checkbox"
                checked={relocation}
                onChange={() => {
                  if (relocation) {
                    setDropdownCountryActive(false);
                  }

                  setRelocation(!relocation);
                }}
              />

              <div className="c__label-title">
                Disponible for relocation
              </div>
            </div>

            {relocation ? (
              <label className='c__label'>
                <div className="c__label-title">
                  Countries *
                </div>
          
                <div
                  className='c__input c__select'
                  onClick={() => {
                    setDropdownIndustryActive(false);
                    setDropdownDepartmentActive(false);
                    setDropdownCountryActive(!dropdownCountryActive);
                    setDropdownCurrencyActive(false);
                    setSearchInput('');
                  }}
                >
                  <div className="c__select-left">
                    <div className="c__select-flag"></div>

                    {'Countries willing to relocate'}
                  </div>
          
                  <div className="c__select-arrow"></div>
                </div>

                <div className={cn(
                  "c__dropdown",
                  {
                    "c__dropdown--active": dropdownCountryActive
                  }
                )}>
                  <input
                    type="text"
                    className='c__dropdown-input'
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
                        className="c__dropdown-item"
                        onClick={() => {
                          handleCountrySelect(country.name);
                        }}
                      >
                        <div className="c__select-flag"></div>

                        {country.name}
                      </div>
                    ))
                  }
                </div>

                {countriesSelected.length > 0 && (
                  <div className="c__board">
                    {countriesSelected.map(countrySelected => (
                      <div
                        key={countrySelected}
                        className="c__board-item"
                      >
                        {countrySelected}

                        <div
                          className="c__board-item-cross"
                          onClick={() => {
                            const newCountriesSelected = countriesSelected
                              .filter(country => country !== countrySelected);

                            setCountriesSelected(newCountriesSelected);
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
              </label>
            ) : (
              <div className="c__no-relocation-text">
                If no, only current residency is available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="c__label-wrapper">
        <div className="c__column">
          <label className='c__label'>
            <div className="c__label-title">
              Departments *
            </div>
            <div
              className='c__input c__select'
              onClick={() => {
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(!dropdownDepartmentActive);
                setDropdownCountryActive(false);
                setDropdownCurrencyActive(false);
                setSearchInput('');
              }}
            >
              <div className="c__select-left">
                {'Select Departments'}
              </div>
              <div className="c__select-arrow"></div>
            </div>
            <div className={cn(
              "c__dropdown",
              {
                "c__dropdown--active": dropdownDepartmentActive
              }
            )}>
              <input
                type="text"
                className='c__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery)
                }}
              />
              {departmentList
                .filter(department => department.toLowerCase()
                  .includes(searchInput)
                )
                .map(department => (
                  <div
                    // key={department.id}
                    className="c__dropdown-item"
                    onClick={() => {
                      setDepartmentsSelected(state => [...state, department]);
                      setSearchInput('');
                    }}
                  >
                    {department}
                  </div>
                ))
              }
            </div>
          </label>

          {departmentsSelected.length > 0 && (
            <div className="c__board">
              {departmentsSelected.map(departmentSelected => (
                <div
                  key={departmentSelected}
                  className="c__board-item"
                >
                  {departmentSelected}

                  <div
                    className="c__board-item-cross"
                    onClick={() => {
                      const newDepartmentsSelected = departmentsSelected
                        .filter(department => department !== departmentSelected);

                      setDepartmentsSelected(newDepartmentsSelected);
                    }}
                  ></div>
                </div>
              ))}
            </div>
            )}
        </div>

        <div className="c__column">
          <label className='c__label'>
            <div className="c__label-title">
              Industry *
            </div>
            <div
              className='c__input c__select'
              onClick={() => {
                setDropdownIndustryActive(!dropdownIndustryActive);
                setDropdownDepartmentActive(false);
                setDropdownCountryActive(false);
                setDropdownCurrencyActive(false);
                setSearchInput('');
              }}
            >
              <div className="c__select-left">
                {'Select Industries'}
              </div>
              <div className="c__select-arrow"></div>
            </div>
            <div className={cn(
              "c__dropdown",
              {
                "c__dropdown--active": dropdownIndustryActive
              }
            )}>
              <input
                type="text"
                className='c__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />
              {industryList
                .filter(industry => industry.toLowerCase()
                  .includes(searchInput)
                )
                .map(industry => (
                  <div
                    // key={industry.id}
                    className="c__dropdown-item"
                    onClick={() => {
                      setIndustriesSelected(state => [...state, industry]);
                      setSearchInput('');
                    }}
                  >
                    {industry}
                  </div>
                ))
              }
            </div>
          </label>

          
          {industriesSelected.length > 0 && (
            <div className="c__board">
              {industriesSelected.map(industrySelected => (
                <div
                  key={industrySelected}
                  className="c__board-item"
                >
                  {industrySelected}

                  <div
                    className="c__board-item-cross"
                    onClick={() => {
                      const newIndustriesSelected = industriesSelected
                        .filter(industry => industry !== industrySelected);

                      setIndustriesSelected(newIndustriesSelected);
                    }}
                  ></div>
                </div>
              ))}
            </div>
            )}
        </div>
      </div>

      <div className="c__label-wrapper">
        <label className='c__label'>
          <div className="c__label-title">
            Wanted Salary *
          </div>

          <input
            type="number"
            className='c__input'
            name='lastname'
            placeholder=''
            value={wantedSalary}
            onChange={(e) => setWantedSalary(+e.target.value)}
          />
        </label>

        <label className='c__label'>
          <div className="c__label-title">
            Currency *
          </div>

          <div
            className='c__input c__select'
            onClick={() => {
              setDropdownIndustryActive(false);
              setDropdownDepartmentActive(false);
              setDropdownCountryActive(false);
              setDropdownCurrencyActive(!dropdownCurrencyActive);
              setSearchInput('');
            }}
          >
            <div className="c__select-left">
              {currency || 'Select currency'}
            </div>

            <div className="c__select-arrow"></div>
          </div>

          <div className={cn(
            "c__dropdown",
            "c__dropdown--currency",
            {
              "c__dropdown--active": dropdownCurrencyActive
            }
          )}>
            <input
              type="text"
              className='c__dropdown-input'
              value={searchInput}
              onChange={(e) => {
                const inputQuery = e.target.value.toLowerCase();
                setSearchInput(inputQuery)
              }}
            />

            {currencyList
              .filter(currency => currency.toLowerCase()
                .includes(searchInput)
              )
              .map(currency => (
                <div
                  // key={currency.id}
                  className="c__dropdown-item"
                  onClick={() => {
                    setCurrency(currency);
                    setSearchInput('');
                  }}
                >
                  {currency}
                </div>
              ))
            }
          </div>
        </label>
      </div>
    </div>
  )
}