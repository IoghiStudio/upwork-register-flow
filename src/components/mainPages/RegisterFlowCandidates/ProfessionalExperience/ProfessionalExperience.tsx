'use client';
import { 
  useState,
  useEffect, 
  useCallback
} from 'react';
import './ProfessionalExperience.scss';
import cn from 'classnames';
import { createYearsArray } from '@/utils/createYearArray';
import { getMonthsArray } from '@/utils/getMonthsArray';
import { Months } from '@/types/Months';
import { 
  getExperiences,
  postExperience ,
  getExperienceById,
  updateExperienceById,
  deleteExperienceById
} from '@/services/api/experience.service';
import { ExperienceApi } from '@/types/ExperienceApi';
import { MonthType } from '@/types/MonthType';
import { getPositions } from '@/services/api/positions.service';
import { getDepartments } from '@/services/api/departments.service';
import { getIndustries } from '@/services/api/industries.service';
import { getCurrencies } from '@/services/api/currencies.service';
import { getAbilities } from '@/services/api/abilities.service';
import { Object } from '@/types/Object';

enum SkillsFor {
  New,
  Update
}

const yearsArray = createYearsArray(2023, 1960);
const monthsArray: MonthType[] = getMonthsArray();


export const ProfessionalExperience = () => {
  const [userId, setUserId] = useState<string>('');
  const [startMonth, setStartMonth] = useState<MonthType | null>(null);
  const [startYear, setStartYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<MonthType | null>(null);
  const [endYear, setEndYear] = useState<string>('');
  const [stillWorking, setStillWorking] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [netSalary, setNetSalary] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('');
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);

  //data from server for employment history previews
  const [infoContainers, setInfoContainers] = useState<ExperienceApi[]>([]);

  //about menu / data for dropdowns
  const [isNewMenuOpen, setIsNewMenuOpen] = useState<boolean>(false);
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<boolean>(false);
  const [skillsList, setSkillsList] = useState<Object[]>([]);
  const [jobTitleList, setJobTitleList] = useState<Object[]>([]);
  const [industryList, setIndustryList] = useState<Object[]>([]);
  const [departmentList, setDepartmentList] = useState<Object[]>([]);
  const [currencyList, setCurrencyList] = useState<Object[]>([]);

  //dropdown states
  const [dropdownJobTitleActive, setDropdownJobTitleActive] = useState(false);
  const [dropdownIndustryActive, setDropdownIndustryActive] = useState(false);
  const [dropdownDepartmentActive, setDropdownDepartmentActive] = useState(false);
  const [dropdownCurrencyActive, setDropdownCurrencyActive] = useState(false);
  const [dropdownStartMonthActive, setDropdownStartMonthActive] = useState(false);
  const [dropdownStartYearActive, setDropdownStartYearActive] = useState(false);
  const [dropdownEndMonthActive, setDropdownEndMonthActive] = useState(false);
  const [dropdownEndYearActive, setDropdownEndYearActive] = useState(false);
  const [dropdownSkillsActive, setDropdownSkillsActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  //could not use and modify selectedExperience inside menu so i had to save every key in states
  const [selectedExperience, setSelectedExperience] = useState<ExperienceApi>();
  //we set the states based on selectedExperience
  const [selectedStartMonth, setSelectedStartMonth] = useState<MonthType | null>();
  const [selectedStartYear, setSelectedStartYear] = useState<string>('');
  const [selectedEndMonth, setSelectedEndMonth] = useState<MonthType | null>();
  const [selectedEndYear, setSelectedEndYear] = useState<string>('');
  const [selectedStillWorking, setSelectedStillWorking] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('');
  const [selectedDescription, setSelectedDescription] = useState<string>('');
  const [selectedNetSalary, setSelectedNetSalary] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    if (!selectedExperience) {
      return;
    }
    // if we add Experience we trigger this func to update selectedStates
    const startDate = new Date(selectedExperience.from_date);
    const startMonth: MonthType | undefined = monthsArray.find(month => +month.id === startDate.getMonth())
    const startYear = startDate.getFullYear();

    //handling if we don't have to_date 
    let endDate: Date | null = null;
    let endMonth: MonthType | undefined = undefined;
    let endYear = null;

    setSelectedEndMonth(undefined);
    setSelectedEndYear('');

    if (selectedExperience.to_date) {
      endDate = new Date(selectedExperience.to_date);
      endMonth = monthsArray.find(month => +month.id === endDate?.getMonth())
      endYear = endDate.getFullYear();
      setSelectedEndMonth(endMonth);
      setSelectedEndYear(String(endYear));
    }

    setSelectedStartMonth(startMonth);
    setSelectedStartYear(String(startYear));
    setSelectedStillWorking(selectedExperience.still_working);
    setSelectedCompany(selectedExperience.company);
    setSelectedIndustry(selectedExperience.industry);
    setSelectedDepartment(selectedExperience.department);
    setSelectedJobTitle(selectedExperience.position);
    setSelectedDescription(selectedExperience.job_description);
    setSelectedNetSalary(selectedExperience.net_salary);
    setSelectedCurrency(selectedExperience.currency);
    setSelectedSkills(selectedExperience.abilities);

    if (selectedExperience.id) {
      // the id is there but its optional and need extra check for ts 
      setSelectedId(selectedExperience.id)
    }
  } , [selectedExperience])

  const resetOurFields = useCallback(() => {
    setStartMonth(null);
    setStartYear('');
    setEndMonth(null);
    setEndYear('');
    setStillWorking(false);
    setCompanyName('');
    setIndustry('');
    setDepartment('');
    setJobTitle('');
    setJobDescription('');
    setNetSalary(0);
    setCurrency('');
    setSkillsSelected([]);
  }, []);

  const resetSelectedFields = useCallback(() => {
    setSelectedStartMonth(null);
    setSelectedStartYear('');
    setSelectedEndMonth(null);
    setSelectedEndYear('');
    setSelectedStillWorking(false);
    setSelectedCompany('');
    setSelectedIndustry('');
    setSelectedDepartment('');
    setSelectedJobTitle('');
    setSelectedDescription('');
    setSelectedNetSalary(0);
    setSelectedCurrency('');
    setSelectedSkills([]);
  }, []);

  const getExperiencesFromServer = useCallback(() => {
    getExperiences()
      .then(resp => {
        const data = resp.data.professionalExperienceProfile;
        setInfoContainers(data);
      })

  }, []);

  useEffect(() => {
    //get here all dropdowns data
    getPositions()
      .then(resp => {
        const data = resp.data.job_titles;
        setJobTitleList(data);
      })

    getDepartments()
      .then(resp => {
        const data = resp.data.departments;
        setDepartmentList(data);
      })

    getIndustries()
      .then(resp => {
        const data = resp.data.industries;
        setIndustryList(data);
      })

    getCurrencies()
      .then(resp => {
        const data = resp.data.currencies;
        setCurrencyList(data);
      })

    getAbilities()
      .then(resp => {
        const data = resp.data.abilities;
        setSkillsList(data);
      })

    const user = localStorage.getItem('userId');

    if (user) {
      setUserId(user);
    }

    getExperiencesFromServer()
  }, []);

  const addExperience = () => {
    //we send random end date to backend if user it's still working
    const dataValid = startYear.length > 0 
      && startMonth
      && companyName
      && industry
      && department
      && jobTitle
      && jobDescription
      && netSalary
      && currency
      && skillsSelected.length > 0;

    if (dataValid) {
      const data: ExperienceApi = {
        from_date: new Date(+startYear, +startMonth.id),
        still_working: stillWorking,
        company: companyName,
        industry: industry,
        department: department,
        position: jobTitle,
        job_description: jobDescription,
        net_salary: netSalary,
        currency: currency,
        abilities: skillsSelected,
        user_id: userId,
      }

      if (endMonth && endYear) {
        data.to_date = new Date(+endYear, +endMonth?.id);
      } else {
        data.still_working = true;
      }
      
      postExperience(data)
        .then(resp => {
          resetOurFields();
          getExperiencesFromServer();
          setIsNewMenuOpen(false);
        })
    }
  };

  const updateExperience = () => {
    //we send random end date to backend if user it's still working
    const dataValid = selectedStartYear.length > 0 
      && selectedStartMonth
      && selectedCompany
      && selectedIndustry
      && selectedDepartment
      && selectedJobTitle
      && selectedDescription
      && selectedNetSalary
      && selectedCurrency
      && selectedSkills.length > 0;

    if (dataValid) {
      console.log('is valid data for exp still working');

      const data: ExperienceApi = {
        from_date: new Date(+selectedStartYear, +selectedStartMonth.id),
        still_working: selectedStillWorking,
        company: selectedCompany,
        industry: selectedIndustry,
        department: selectedDepartment,
        position: selectedJobTitle,
        job_description: selectedDescription,
        net_salary: selectedNetSalary,
        currency: selectedCurrency,
        abilities: selectedSkills,
        user_id: userId,
      }

      if (selectedEndMonth && selectedEndYear) {
        console.log('end date')
        data.to_date = new Date(+selectedEndYear, +selectedEndMonth?.id);
      } else {
        data.still_working = true;
      }
      
      updateExperienceById(selectedId, data)
        .then(resp => {
          resetSelectedFields();
          getExperiencesFromServer();
          setIsUpdateMenuOpen(false);
        })
    }
  };

  const getExperienceInfo = (id: string) => {
    getExperienceById(id)
      .then(resp => {
        setSelectedExperience(resp.data);
      })
  }

  const removeExperience = useCallback((id: string) => {
    deleteExperienceById(id)
      .then(resp => {
        getExperiencesFromServer();
      })
  }, []);

  const handleSkillsSelect = useCallback((name: string, skillsFor: SkillsFor) => {
    //adding new skill if is not already there
    if (skillsFor === SkillsFor.New) {
      if (!skillsSelected.includes(name)) {
        setSkillsSelected(state => [...state, name]);
      }
    } else if (skillsFor === SkillsFor.Update) {
      if (!selectedSkills.includes(name)) {
        setSelectedSkills(state => [...state, name]);
      }
    }

    setDropdownSkillsActive(false);
    setSearchInput('');
  }, [skillsSelected, selectedSkills]);
  
  return (
    <div
      className={cn(
        "pro",
        {
          "pro--inactive": false
        }
      )}
    >
      <h1 className="pro__title">
        If you have relevant work experience, add it here.
      </h1>

      <div className="pro__text">
        Candidates who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page.
      </div>

      {infoContainers.length > 0 && (
        <div className="pro__containers">
          {infoContainers.map(container => {
            const {
              from_date,
              to_date,
              still_working,
              company,
              industry,
              department,
              position,
              job_description,
              net_salary,
              currency,
              abilities,
              user_id,
              id,
            } = container;

            const startDate = new Date(from_date);
            const endDate = new Date(to_date);
            const startMonth: MonthType | undefined = monthsArray.find(month => +month.id === startDate.getMonth())
            const startYear = startDate.getFullYear();
            const endMonth: MonthType | undefined = monthsArray.find(month => +month.id === endDate.getMonth());
            const endYear = endDate.getFullYear();

            // on save we need a function to find the experience by id and modify it's data
            // we pass the id of the current container

            return (
              <div key={id} className="pro__container">
                <div className="pro__container-main-icon"></div>

                <div className="pro__container-content">
                  <div className="pro__container-job">
                    {position}
                  </div>

                  <div className="pro__container-company">
                    {company}
                  </div>

                  <div className="pro__container-date">
                    {`${startMonth?.name} ${startYear}`}
                    {' - '}
                    {still_working ? (
                      'Present'
                    ) : (
                      `${endMonth?.name} ${endYear}`
                    )}
                  </div>

                  <div className="pro__container-description">
                    {job_description}
                  </div>
                </div>

                <div className="pro__container-icons">
                  <div
                    className="pro__container-icon-container"
                    onClick={() => {
                      if (!isNewMenuOpen) {
                        setIsUpdateMenuOpen(true);
                      }

                      if (id) {
                        getExperienceInfo(id);
                      }
                    }}
                  >
                    <div className="pro__container-icon pro__container-icon--edit"></div>
                  </div>

                  <div
                    className="pro__container-icon-container"
                    onClick={() => {
                      if (id) {
                        removeExperience(id);
                      }
                    }}
                  >
                    <div className="pro__container-icon pro__container-icon--delete"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div
        className={cn(
          "pro__add-button",
          {
            "pro__add-button--empty": infoContainers.length < 1
          }
        )}
        onClick={() => {
          if (!isUpdateMenuOpen) {
            setIsNewMenuOpen(true);
            console.log('opening new menu')
          }
        }}
      >
        <div className="pro__add-button-icon"></div>

        <div className="pro__add-button-text">
          Add experience
        </div>
      </div>
      
      <div 
        className={cn(
          "pro__menu",
          {
            "pro__menu--active": isNewMenuOpen
          }
        )}
      >
        <div className="pro__menu-title">
          Add Work Experience
        </div>

        <div className="pro__menu-form">
          <label className='pro__label'>
            <div className="pro__label-title">
              Job Title / Position *
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(!dropdownJobTitleActive)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false);
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {jobTitle || 'Select position'}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownJobTitleActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {jobTitleList
                .filter(position => position.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(position => (
                  <div
                    key={position.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setJobTitle(position.name);
                      setSearchInput('');
                      setDropdownJobTitleActive(false);
                    }}
                  >
                    {position.name}
                  </div>
                ))
              }
            </div>
          </label>

          <div className="pro__label">
            <div className="pro__label-title">
              Company *
            </div>

            <input
              className="pro__input"
              type="text"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </div>

          <label className='pro__label'>
            <div className="pro__label-title">
              Industry *
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(!dropdownIndustryActive);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false);
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {industry || 'Select industry'}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownIndustryActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {industryList
                .filter(industry => industry.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(industry => (
                  <div
                    key={industry.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setIndustry(industry.name);
                      setSearchInput('');
                      setDropdownIndustryActive(false);
                    }}
                  >
                    {industry.name}
                  </div>
                ))
              }
            </div>
          </label>

          <label className='pro__label'>
            <div className="pro__label-title">
              Department *
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(!dropdownDepartmentActive);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false);
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {department || 'Select department'}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownDepartmentActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {departmentList
                .filter(department => department.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(department => (
                  <div
                    key={department.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setDepartment(department.name);
                      setSearchInput('');
                      setDropdownDepartmentActive(false);
                    }}
                  >
                    {department.name}
                  </div>
                ))
              }
            </div>
          </label>

          <div className="pro__checkbox-container">
            <input
              className={cn(
                'pro__checkbox',
                {
                  'pro__checkbox--active': stillWorking,
                }
              )}
              type="checkbox"
              checked={stillWorking}
              onChange={() => setStillWorking(!stillWorking)}
            />

            <div className="pro__label-title">
              I am currently working in this role
            </div>
          </div>

          <div className="pro__dates-container">
            <div className="pro__date-container">
              <div className="pro__label-title">
                Start Date *
              </div>

              <div className="pro__dates">
                <div className="pro__date">
                  <div
                    className='pro__input pro__select'
                    onClick={() => {
                      setDropdownJobTitleActive(false)
                      setDropdownIndustryActive(false);
                      setDropdownDepartmentActive(false);
                      setDropdownCurrencyActive(false);
                      setDropdownStartMonthActive(!dropdownStartMonthActive);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setDropdownSkillsActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="pro__select-left">
                      {startMonth?.name || 'Month'}
                    </div>
                    <div className="pro__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "pro__dropdown",
                    "pro__dropdown--dates",
                    {
                      "pro__dropdown--active": dropdownStartMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="pro__dropdown-item"
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
                
                <div className="pro__date">
                  <div
                    className='pro__input pro__select'
                    onClick={() => {
                      setDropdownJobTitleActive(false)
                      setDropdownIndustryActive(false);
                      setDropdownDepartmentActive(false);
                      setDropdownCurrencyActive(false);
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(!dropdownStartYearActive);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setDropdownSkillsActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="pro__select-left">
                      {startYear || 'Year'}
                    </div>

                    <div className="pro__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "pro__dropdown",
                    "pro__dropdown--dates",
                    {
                      "pro__dropdown--active": dropdownStartYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='pro__dropdown-input'
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
                          className="pro__dropdown-item"
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

            <div className="pro__date-container">
              <div className="pro__label-title">
                End Date *
              </div>

              {!stillWorking ? (
                <div className="pro__dates">
                  <div className="pro__date">
                    <div
                      className='pro__input pro__select'
                      onClick={() => {
                        setDropdownJobTitleActive(false)
                        setDropdownIndustryActive(false);
                        setDropdownDepartmentActive(false);
                        setDropdownCurrencyActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(!dropdownEndMonthActive);
                        setDropdownEndYearActive(false);
                        setDropdownSkillsActive(false);
                        setSearchInput('');
                      }}
                    >
                      <div className="pro__select-left">
                        {endMonth?.name || 'Month'}
                      </div>
                      <div className="pro__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "pro__dropdown",
                      "pro__dropdown--dates",
                      {
                        "pro__dropdown--active": dropdownEndMonthActive
                      }
                    )}>
                      {monthsArray
                        .map((month) => (
                          <div
                            key={month.id}
                            className="pro__dropdown-item"
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

                  <div className="pro__date">
                    <div
                      className='pro__input pro__select'
                      onClick={() => {
                        setDropdownJobTitleActive(false)
                        setDropdownIndustryActive(false);
                        setDropdownDepartmentActive(false);
                        setDropdownCurrencyActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(false);
                        setDropdownEndYearActive(!dropdownStartYearActive);
                        setDropdownSkillsActive(false)
                        setSearchInput('');
                      }}
                    >
                      <div className="pro__select-left">
                        {endYear || 'Year'}
                      </div>

                      <div className="pro__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "pro__dropdown",
                      "pro__dropdown--dates",
                      {
                        "pro__dropdown--active": dropdownEndYearActive
                      }
                    )}>
                      <input
                        type="text"
                        className='pro__dropdown-input'
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
                            className="pro__dropdown-item"
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
                <div className="pro__present">
                  Present
                </div>
              )}
            </div>
          </div>

          <div className="pro__label">
            <div className="pro__label-title">
              Job Description *
            </div>

            <textarea
              className="pro__textarea"
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value)
              }}
            />
          </div>

          <div className="pro__label">
            <div className="pro__label-title">
              Net Salary 
            </div>

            <input
              className="pro__input"
              type="number"
              value={netSalary}
              onChange={(e) => {
                setNetSalary(+e.target.value);
              }}
            />
          </div>

          <label className='pro__label'>
            <div className="pro__label-title">
              Currency 
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(!dropdownCurrencyActive);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false)
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {currency || 'Select currency'}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              "pro__dropdown--currency",
              {
                "pro__dropdown--active": dropdownCurrencyActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {currencyList
                .filter(currency => currency.code.toLowerCase()
                  .includes(searchInput)
                )
                .map(currency => (
                  <div
                    key={currency.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setCurrency(currency.code);
                      setSearchInput('');
                      setDropdownCurrencyActive(false);
                    }}
                  >
                    {currency.code}
                  </div>
                ))
              }
            </div>
          </label>
          
          <label className='pro__label'>
            <div className="pro__label-title">
              Skills 
            </div>
      
            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(!dropdownSkillsActive)
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {'Abilities and Skills'}
              </div>
      
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownSkillsActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery)
                }}
              />

              {skillsList
                .filter(skill => skill.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(skill => (
                  <div
                    key={skill.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      handleSkillsSelect(skill.name, SkillsFor.New);
                    }}
                  >
                    {skill.name}
                  </div>
                ))
              }
            </div>

            {skillsSelected.length > 0 && (
              <div className="pro__board">
                {skillsSelected.map(skillSelected => (
                  <div
                    key={skillSelected}
                    className="pro__board-item"
                  >
                    {skillSelected}

                    <div
                      className="pro__board-item-cross"
                      onClick={() => {
                        const newSkillsSelected = skillsSelected
                          .filter(skill => skill !== skillSelected);

                        setSkillsSelected(newSkillsSelected);
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>

        <div className="pro__buttons">
          <div 
            className="pro__button pro__button-delete"
            onClick={() => {
              setIsNewMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="pro__button pro__button-save"
            onClick={() => {
              addExperience();
            }}
          >
            Save
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "pro__menu",
          {
            "pro__menu--active": isUpdateMenuOpen
          }
        )}
      >
        <div className="pro__menu-title">
          update Work Experience
        </div>

        <div className="pro__menu-form">
          <label className='pro__label'>
            <div className="pro__label-title">
              Job Title / Position *
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(!dropdownJobTitleActive)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false);
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {selectedJobTitle}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownJobTitleActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {jobTitleList
                .filter(position => position.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(position => (
                  <div
                    key={position.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setSelectedJobTitle(position.name);
                      setSearchInput('');
                      setDropdownJobTitleActive(false);
                    }}
                  >
                    {position.name}
                  </div>
                ))
              }
            </div>
          </label>

          <div className="pro__label">
            <div className="pro__label-title">
              Company *
            </div>

            <input
              className="pro__input"
              type="text"
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
              }}
            />
          </div>

          <label className='pro__label'>
            <div className="pro__label-title">
              Industry *
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(!dropdownIndustryActive);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false);
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {selectedIndustry}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownIndustryActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {industryList
                .filter(industry => industry.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(industry => (
                  <div
                    key={industry.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setSelectedIndustry(industry.name);
                      setSearchInput('');
                      setDropdownIndustryActive(false);
                    }}
                  >
                    {industry.name}
                  </div>
                ))
              }
            </div>
          </label>

          <label className='pro__label'>
            <div className="pro__label-title">
              Department *
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(!dropdownDepartmentActive);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false);
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {selectedDepartment}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownDepartmentActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {departmentList
                .filter(department => department.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(department => (
                  <div
                    key={department.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setSelectedDepartment(department.name);
                      setSearchInput('');
                      setDropdownDepartmentActive(false);
                    }}
                  >
                    {department.name}
                  </div>
                ))
              }
            </div>
          </label>

          <div className="pro__checkbox-container">
            <input
              className={cn(
                'pro__checkbox',
                {
                  'pro__checkbox--active': selectedStillWorking,
                }
              )}
              type="checkbox"
              checked={selectedStillWorking}
              onChange={() => setSelectedStillWorking(!selectedStillWorking)}
            />

            <div className="pro__label-title">
              I am currently working in this role
            </div>
          </div>

          <div className="pro__dates-container">
            <div className="pro__date-container">
              <div className="pro__label-title">
                Start Date *
              </div>

              <div className="pro__dates">
                <div className="pro__date">
                  <div
                    className='pro__input pro__select'
                    onClick={() => {
                      setDropdownJobTitleActive(false)
                      setDropdownIndustryActive(false);
                      setDropdownDepartmentActive(false);
                      setDropdownCurrencyActive(false);
                      setDropdownStartMonthActive(!dropdownStartMonthActive);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setDropdownSkillsActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="pro__select-left">
                      {selectedStartMonth?.name}
                    </div>
                    <div className="pro__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "pro__dropdown",
                    "pro__dropdown--dates",
                    {
                      "pro__dropdown--active": dropdownStartMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="pro__dropdown-item"
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
                
                <div className="pro__date">
                  <div
                    className='pro__input pro__select'
                    onClick={() => {
                      setDropdownJobTitleActive(false)
                      setDropdownIndustryActive(false);
                      setDropdownDepartmentActive(false);
                      setDropdownCurrencyActive(false);
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(!dropdownStartYearActive);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setDropdownSkillsActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="pro__select-left">
                      {selectedStartYear}
                    </div>

                    <div className="pro__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "pro__dropdown",
                    "pro__dropdown--dates",
                    {
                      "pro__dropdown--active": dropdownStartYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='pro__dropdown-input'
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
                          className="pro__dropdown-item"
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

            <div className="pro__date-container">
              <div className="pro__label-title">
                End Date *
              </div>

              {!selectedStillWorking ? (
                <div className="pro__dates">
                  <div className="pro__date">
                    <div
                      className='pro__input pro__select'
                      onClick={() => {
                        setDropdownJobTitleActive(false)
                        setDropdownIndustryActive(false);
                        setDropdownDepartmentActive(false);
                        setDropdownCurrencyActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(!dropdownEndMonthActive);
                        setDropdownEndYearActive(false);
                        setDropdownSkillsActive(false);
                        setSearchInput('');
                      }}
                    >
                      <div className="pro__select-left">
                        {selectedEndMonth?.name || 'Month'}
                      </div>
                      <div className="pro__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "pro__dropdown",
                      "pro__dropdown--dates",
                      {
                        "pro__dropdown--active": dropdownEndMonthActive
                      }
                    )}>
                      {monthsArray
                        .map((month) => (
                          <div
                            key={month.id}
                            className="pro__dropdown-item"
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

                  <div className="pro__date">
                    <div
                      className='pro__input pro__select'
                      onClick={() => {
                        setDropdownJobTitleActive(false)
                        setDropdownIndustryActive(false);
                        setDropdownDepartmentActive(false);
                        setDropdownCurrencyActive(false);
                        setDropdownStartMonthActive(false);
                        setDropdownStartYearActive(false);
                        setDropdownEndMonthActive(false);
                        setDropdownEndYearActive(!dropdownStartYearActive);
                        setDropdownSkillsActive(false)
                        setSearchInput('');
                      }}
                    >
                      <div className="pro__select-left">
                        {selectedEndYear || 'Year'}
                      </div>

                      <div className="pro__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "pro__dropdown",
                      "pro__dropdown--dates",
                      {
                        "pro__dropdown--active": dropdownEndYearActive
                      }
                    )}>
                      <input
                        type="text"
                        className='pro__dropdown-input'
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
                            className="pro__dropdown-item"
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
                <div className="pro__present">
                  Present
                </div>
              )}
            </div>
          </div>

          <div className="pro__label">
            <div className="pro__label-title">
              Job Description *
            </div>

            <textarea
              className="pro__textarea"
              value={selectedDescription}
              onChange={(e) => {
                setSelectedDescription(e.target.value)
              }}
            />
          </div>

          <div className="pro__label">
            <div className="pro__label-title">
              Net Salary 
            </div>

            <input
              className="pro__input"
              type="number"
              value={selectedNetSalary}
              onChange={(e) => {
                setSelectedNetSalary(+e.target.value);
              }}
            />
          </div>

          <label className='pro__label'>
            <div className="pro__label-title">
              Currency
            </div>

            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(!dropdownCurrencyActive);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(false)
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {selectedCurrency}
              </div>
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              "pro__dropdown--currency",
              {
                "pro__dropdown--active": dropdownCurrencyActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {currencyList
                .filter(currency => currency.code.toLowerCase()
                  .includes(searchInput)
                )
                .map(currency => (
                  <div
                    key={currency.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      setSelectedCurrency(currency.code);
                      setSearchInput('');
                      setDropdownCurrencyActive(false);
                    }}
                  >
                    {currency.code}
                  </div>
                ))
              }
            </div>
          </label>
          
          <label className='pro__label'>
            <div className="pro__label-title">
              Skills 
            </div>
      
            <div
              className='pro__input pro__select'
              onClick={() => {
                setDropdownJobTitleActive(false)
                setDropdownIndustryActive(false);
                setDropdownDepartmentActive(false);
                setDropdownCurrencyActive(false);
                setDropdownStartMonthActive(false);
                setDropdownStartYearActive(false);
                setDropdownEndMonthActive(false);
                setDropdownEndYearActive(false);
                setDropdownSkillsActive(!dropdownSkillsActive)
                setSearchInput('');
              }}
            >
              <div className="pro__select-left">
                {'Abilities and Skills'}
              </div>
      
              <div className="pro__select-arrow"></div>
            </div>

            <div className={cn(
              "pro__dropdown",
              {
                "pro__dropdown--active": dropdownSkillsActive
              }
            )}>
              <input
                type="text"
                className='pro__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery)
                }}
              />

              {skillsList
                .filter(skill => skill.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(skill => (
                  <div
                    key={skill.id}
                    className="pro__dropdown-item"
                    onClick={() => {
                      handleSkillsSelect(skill.name, SkillsFor.Update);
                    }}
                  >
                    {skill.name}
                  </div>
                ))
              }
            </div>

            {selectedSkills.length > 0 && (
              <div className="pro__board">
                {selectedSkills.map(selectedSkill => (
                  <div
                    key={selectedSkill}
                    className="pro__board-item"
                  >
                    {selectedSkill}

                    <div
                      className="pro__board-item-cross"
                      onClick={() => {
                        const newSelectedSkills = selectedSkills
                          .filter(skill => skill !== selectedSkill);

                        setSelectedSkills(newSelectedSkills);
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>

        <div className="pro__buttons">
          <div 
            className="pro__button pro__button-delete"
            onClick={() => {
              setIsUpdateMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="pro__button pro__button-save"
            onClick={() => {
              updateExperience();
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  )
}