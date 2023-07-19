'use client';
import {
  useState,
  useEffect,
  useCallback
} from 'react';
import './Certifications.scss';
import cn from 'classnames';
import { createYearsArray } from '@/utils/createYearArray';
import { getMonthsArray } from '@/utils/getMonthsArray';
import { CertificationApi } from '@/types/CertificationApi';
import { 
  deleteCertificationById,
  getCertifications,
  getCertificationById,
  postCertification,
  updateCertificationById,
} from '@/services/api/certification.service';
import { MonthType } from '@/types/MonthType';

const yearsArray = createYearsArray(2023, 1960);
const monthsArray: MonthType[] = getMonthsArray();

// const fakeContainers = [
//   {
//     id: 1,
//     month: Months.March,
//     year: 2023,
//     institution: 'Mate Academy',
//     title: 'Fullstack Developer',
//     description: 'A lot of practical ..a lot of great experiences',
//   },
//   {
//     id: 2,
//     month: Months.September,
//     year: 2021,
//     institution: 'Unity',
//     title: 'Game Developer',
//     description: 'A lot of practical ..a lot of great experiences',
//   },
//   {
//     id: 3,
//     month: Months.July,
//     year: 2019,
//     institution: 'Microsoft',
//     title: 'Software Engineer',
//     description: 'A lot of practical ..a lot of great experiences',
//   },
// ];

export const Certifications = () => {
  const [certificationsList, setCertificationsList] = useState<CertificationApi[]>([]);

  const [month, setMonth] = useState<MonthType | null>();
  const [year, setYear] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [userId, setUserId] = useState('');


  const [isNewMenuOpen, setIsNewMenuOpen] = useState<boolean>(false);
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<boolean>(false);
  const [dropdownMonthActive, setDropdownMonthActive] = useState(false);
  const [dropdownYearActive, setDropdownYearActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');

    //could not use and modify selectedCertification inside menu so i had to save every key in states
    const [selectedCertification, setSelectedCertification] = useState<CertificationApi>();
    const [selectedMonth, setSelectedMonth] = useState<MonthType | null>();
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [selectedInstitution, setSelectedInstitution] = useState<string>('');
    const [selectedDescription, setSelectedDescription] = useState<string>('');
    const [selectedId, setSelectedId] = useState<string>('');

    useEffect(() => {
      if (!selectedCertification) {
        return;
      }
      // if we add Certification we trigger this func to update selectedStates
      const date = new Date(selectedCertification.date);
      const month: MonthType | undefined = monthsArray.find(month => +month.id === date.getMonth())
      const year = date.getFullYear();
  
      setSelectedMonth(month)
      setSelectedYear(String(year))
      setSelectedTitle(selectedCertification.certification_title)
      setSelectedInstitution(selectedCertification.institution_released)
      setSelectedDescription(selectedCertification.description)
      if (selectedCertification.id) {
        // the id is there but its optional and need extra check for ts 
        setSelectedId(selectedCertification.id)
      }
    } , [selectedCertification])

  const resetFields = useCallback(() => {
    setMonth(null);
    setYear('');
    setInstitution('');
    setTitle('');
    setDescription('');
  }, []);

  const resetSelectedFields = useCallback(() => {
    setSelectedMonth(null);
    setSelectedYear('');
    setSelectedTitle('');
    setSelectedInstitution('');
    setSelectedDescription('');
    setSelectedId('');
  }, []);

  const getCertificationsFromServer = useCallback(() => {
    getCertifications()
      .then(resp => {
        const data: CertificationApi[] = resp.data.certifications;
        setCertificationsList(data);
      })
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('userId');

    if (user) {
      setUserId(user);
    }

    getCertificationsFromServer()
  }, [])

  const addCertification = () => {
    const dataValid = year.length > 0 
      && month
      && institution
      && title
      && userId;

    if (dataValid && month) {
      const data = {
        date: new Date(+year, +month?.id),
        institution_released: institution,
        certification_title: title,
        description: description,
        user_id: userId,
      }

      postCertification(data)
        .then(resp => {
          resetFields();
          getCertificationsFromServer();
          setIsNewMenuOpen(false);
        })
    }
  }

  
  const updateCertification = () => {
    // console.log('inside func updateById')
    const dataValid = selectedYear.length > 0 
      && selectedMonth
      && selectedInstitution
      && selectedDescription
      && userId;

      
    if (dataValid 
      && selectedMonth 
      && selectedYear 
    ) {
      // console.log('inside isValid updateById')
      const data = {
        date: new Date(+selectedYear, +selectedMonth?.id),
        certification_title: selectedTitle,
        institution_released: selectedInstitution,
        description: selectedDescription,
        user_id: userId,
      }

      updateCertificationById(selectedId, data)
        .then(resp => {
          // console.log('inside updateById')
          resetSelectedFields();
          getCertificationsFromServer();
          setIsUpdateMenuOpen(false);
        })
    }
  }

  const getCertificationInfo = (id: string) => {
    getCertificationById(id)
      .then(resp => {
        console.log(resp.data);
        setSelectedCertification(resp.data);
      })
  }

  const removeCertification = useCallback((id: string) => {
    deleteCertificationById(id)
      .then(resp => {
        console.log(resp);

        getCertificationsFromServer();
      })
  }, []);

  return (
    <div  className={cn(
      "cert",
      {
        "cert--inactive": false
      }
    )}>
      <h1 className="cert__title">
        Certifications might bring you advantages
      </h1>

      <div className="cert__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo pe odit nisi dolore magni est officia voluptas.
      </div>

      <div className="cert__container">
        <div className="cert__container-top">
          <div className="cert__container-title">
            Certifications
          </div>
        </div>
      </div>

      <div className="cert__certifications">
        {certificationsList.map(certificate => {
          const {
            id,
            date,
            certification_title,
            institution_released,
            description,
          } = certificate;

          const myDate = new Date(date);
          const month: MonthType | undefined = monthsArray.find(month => +month.id === myDate.getMonth())
          const year = myDate.getFullYear();

          return (
            <div key={id} className="cert__certificate">
              <div className="cert__certificate-left">
                <div className="cert__certificate-title">
                  {certification_title}
                </div>

                <div className="cert__certificate-institution">
                  {institution_released}
                </div>
              </div>

              <div className="cert__certificate-right">
                <div className="cert__certificate-date">
                  {`${month?.name} ${year}`}
                </div>

                <div
                  className="cert__icon-container cert__icon-container--delete"
                  onClick={() => {
                    if (id) {
                      removeCertification(id);
                    }
                  }}
                >
                  <div className="cert__icon cert__icon--delete"></div>
                </div>

                <div
                  className="cert__icon-container cert__icon-container--edit"
                  onClick={() => {
                    if(!isNewMenuOpen) {
                      setIsUpdateMenuOpen(true);

                      if (id) {
                        getCertificationInfo(id)
                      }
                    }
                  }}
                >
                  <div className="cert__icon cert__icon--edit"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="cert__add-button">
        <div className="cert__add-button-icon"></div>

        <div
          className="cert__add-button-text"
          onClick={() => {
            if (!isUpdateMenuOpen) {
              setIsNewMenuOpen(true);
            }
          }}
        >
          Add certificate
        </div>
      </div>

      <div 
        className={cn(
          "cert__menu",
          {
            "cert__menu--active": isNewMenuOpen
          }
        )}
      >
        <div className="cert__menu-title">
          add Certificate
        </div>

        <div className="cert__menu-form">
          <div className="cert__date-container">
            <div className="cert__label-title">
              Date Optioned *
            </div>

            <div className="cert__dates">
              <div className="cert__date">
                <div
                  className='cert__input cert__select'
                  onClick={() => {
                    setDropdownMonthActive(!dropdownMonthActive);
                    setDropdownYearActive(false);
                  }}
                >
                  <div className="cert__select-left">
                    {month?.name || 'Month'}
                  </div>
                  <div className="cert__select-arrow"></div>
                </div>

                <div className={cn(
                  "cert__dropdown",
                  "cert__dropdown--dates",
                  {
                    "cert__dropdown--active": dropdownMonthActive
                  }
                )}>
                  {monthsArray
                    .map((month) => (
                      <div
                        key={month.id}
                        className="cert__dropdown-item"
                        onClick={() => {
                          setMonth(month);
                          setDropdownMonthActive(false);
                        }}
                      >
                        {month.name}
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="cert__date">
                <div
                  className='cert__input cert__select'
                  onClick={() => {
                    setDropdownMonthActive(false);
                    setDropdownYearActive(!dropdownYearActive);
                    setSearchInput('');
                  }}
                >
                  <div className="cert__select-left">
                    {year || 'Year'}
                  </div>

                  <div className="cert__select-arrow"></div>
                </div>

                <div className={cn(
                  "cert__dropdown",
                  "cert__dropdown--dates",
                  {
                    "cert__dropdown--active": dropdownYearActive
                  }
                )}>
                  <input
                    type="text"
                    className='cert__dropdown-input'
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
                        className="cert__dropdown-item"
                        onClick={() => {
                          setYear(year);
                          setDropdownYearActive(false);
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

          <div className="cert__label">
            <div className="cert__label-title">
              Institution Released *
            </div>

            <input
              className="cert__input"
              type="text"
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value);
              }}
            />
          </div>

          <div className="cert__label">
            <div className="cert__label-title">
              Certification Title / Position *
            </div>

            <input
              className="cert__input"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          
          <div className="cert__label">
            <div className="cert__label-title">
              Description
            </div>

            <textarea
              className="cert__textarea"
              value={description}
              onChange={e => {
                setDescription(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="cert__buttons">
          <div 
            className="cert__button cert__button-delete"
            onClick={() => {
              setIsNewMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="cert__button cert__button-save"
            onClick={() => {
              addCertification();
            }}
          >
            Save
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "cert__menu",
          {
            "cert__menu--active": isUpdateMenuOpen
          }
        )}
      >
        <div className="cert__menu-title">
          update Certificate
        </div>

        <div className="cert__menu-form">
          <div className="cert__date-container">
            <div className="cert__label-title">
              Date Optioned *
            </div>

            <div className="cert__dates">
              <div className="cert__date">
                <div
                  className='cert__input cert__select'
                  onClick={() => {
                    setDropdownMonthActive(!dropdownMonthActive);
                    setDropdownYearActive(false);
                  }}
                >
                  <div className="cert__select-left">
                    {selectedMonth?.name}
                  </div>
                  <div className="cert__select-arrow"></div>
                </div>

                <div className={cn(
                  "cert__dropdown",
                  "cert__dropdown--dates",
                  {
                    "cert__dropdown--active": dropdownMonthActive
                  }
                )}>
                  {monthsArray
                    .map((month) => (
                      <div
                        key={month.id}
                        className="cert__dropdown-item"
                        onClick={() => {
                          setSelectedMonth(month);
                          setDropdownMonthActive(false);
                        }}
                      >
                        {month.name}
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="cert__date">
                <div
                  className='cert__input cert__select'
                  onClick={() => {
                    setDropdownMonthActive(false);
                    setDropdownYearActive(!dropdownYearActive);
                    setSearchInput('');
                  }}
                >
                  <div className="cert__select-left">
                    {selectedYear}
                  </div>

                  <div className="cert__select-arrow"></div>
                </div>

                <div className={cn(
                  "cert__dropdown",
                  "cert__dropdown--dates",
                  {
                    "cert__dropdown--active": dropdownYearActive
                  }
                )}>
                  <input
                    type="text"
                    className='cert__dropdown-input'
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
                        className="cert__dropdown-item"
                        onClick={() => {
                          setSelectedYear(year);
                          setDropdownYearActive(false);
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

          <div className="cert__label">
            <div className="cert__label-title">
              Institution Released *
            </div>

            <input
              className="cert__input"
              type="text"
              value={selectedInstitution}
              onChange={(e) => {
                setSelectedInstitution(e.target.value);
              }}
            />
          </div>

          <div className="cert__label">
            <div className="cert__label-title">
              Certification Title / Position *
            </div>

            <input
              className="cert__input"
              type="text"
              value={selectedTitle}
              onChange={(e) => {
                setSelectedTitle(e.target.value);
              }}
            />
          </div>
          
          <div className="cert__label">
            <div className="cert__label-title">
              Description
            </div>

            <textarea
              className="cert__textarea"
              value={selectedDescription}
              onChange={e => {
                setSelectedDescription(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="cert__buttons">
          <div 
            className="cert__button cert__button-delete"
            onClick={() => {
              setIsUpdateMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="cert__button cert__button-save"
            onClick={() => {
              updateCertification();
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  )
}