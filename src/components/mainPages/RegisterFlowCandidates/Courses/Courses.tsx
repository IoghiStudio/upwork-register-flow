'use client';
import {
  useState,
  useEffect,
  useCallback
} from 'react';
import './Courses.scss';
import cn from 'classnames';
import { createYearsArray } from '@/utils/createYearArray';
import { getMonthsArray } from '@/utils/getMonthsArray';
import { MonthType } from '@/types/MonthType';
import { CourseApi } from '@/types/CourseApi';
import {
  getCourses, 
  getCourseById,
  postCourse,
  updateCourseById,
  deleteCourseById
} from '@/services/api/courses.service';

const yearsArray = createYearsArray(2023, 1960);
const monthsArray: MonthType[] = getMonthsArray();

// const fakeContainers = [
//   {
//     id: 1,
//     startMonth: Months.October,
//     startYear: 2021,
//     endMonth: Months.April,
//     endYear: 2023,
//     institution: 'Mate Academy',
//     description: 'A lot of practical ..a lot of great experiences',
//   },
//   {
//     id: 2,
//     startMonth: Months.September,
//     startYear: 2017,
//     endMonth: Months.March,
//     endYear: 2021,
//     institution: 'Unity',
//     description: 'A lot of practical ..a lot of great experiences',
//   },
//   {
//     id: 3,
//     startMonth: Months.August,
//     startYear: 2014,
//     endMonth: Months.May,
//     endYear: 2017,
//     institution: 'Microsoft',
//     description: 'A lot of practical ..a lot of great experiences',
//   },
// ];

export const Courses = () => {
  const [coursesList, setCoursesList] = useState<CourseApi[]>([]);

  const [startMonth, setStartMonth] = useState<MonthType | null>();
  const [startYear, setStartYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<MonthType | null>();
  const [endYear, setEndYear] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [userId, setUserId] = useState('');

  const [isNewMenuOpen, setIsNewMenuOpen] = useState<boolean>(false);
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState<boolean>(false);
  const [dropdownStartMonthActive, setDropdownStartMonthActive] = useState(false);
  const [dropdownStartYearActive, setDropdownStartYearActive] = useState(false);
  const [dropdownEndMonthActive, setDropdownEndMonthActive] = useState(false);
  const [dropdownEndYearActive, setDropdownEndYearActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');


  //could not use and modify selectedCourse inside menu so i had to save every key in states
  const [selectedCourse, setSelectedCourse] = useState<CourseApi>();
  const [selectedStartMonth, setSelectedStartMonth] = useState<MonthType | null>();
  const [selectedStartYear, setSelectedStartYear] = useState<string>('');
  const [selectedEndMonth, setSelectedEndMonth] = useState<MonthType | null>();
  const [selectedEndYear, setSelectedEndYear] = useState<string>('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [selectedDescription, setSelectedDescription] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    if (!selectedCourse) {
      return;
    }
    // if we add course we trigger this func to update selectedStates
    const startDate = new Date(selectedCourse.start_date);
    const endDate = new Date(selectedCourse.end_date);
    const startMonth: MonthType | undefined = monthsArray.find(month => +month.id === startDate.getMonth())
    const endMonth: MonthType | undefined = monthsArray.find(month => +month.id === endDate.getMonth())
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    setSelectedStartMonth(startMonth)
    setSelectedEndMonth(endMonth)
    setSelectedStartYear(String(startYear))
    setSelectedEndYear(String(endYear))
    setSelectedInstitution(selectedCourse.institution)
    setSelectedDescription(selectedCourse.description)
    if (selectedCourse.id) {
      // the id is there but its optional and need extra check for ts 
      setSelectedId(selectedCourse.id)
    }
  } , [selectedCourse])

  const resetFields = useCallback(() => {
    setStartMonth(null);
    setStartYear('');
    setEndMonth(null);
    setEndYear('');
    setInstitution('');
    setDescription('');
  }, []);

  const resetSelectedFields = useCallback(() => {
    setSelectedStartMonth(null);
    setSelectedStartYear('');
    setSelectedEndMonth(null);
    setSelectedEndYear('');
    setSelectedInstitution('');
    setSelectedDescription('');
    setSelectedId('');
  }, []);

  const getCoursesFromServer = useCallback(() => {
    getCourses()
      .then(resp => {
        const data: CourseApi[] = resp.data.courses;
        setCoursesList(data);
      })
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('userId');

    if (user) {
      setUserId(user);
    }

    getCoursesFromServer()
  }, []);

  const addCourse = () => {
    const dataValid = startYear.length > 0 
      && endYear.length > 0
      && startMonth
      && endMonth
      && institution
      && userId;

    if (dataValid && startMonth && endMonth && startYear && endYear) {
      const data = {
        start_date: new Date(+startYear, +startMonth?.id),
        end_date: new Date(+endYear, +endMonth?.id),
        institution: institution,
        description: description,
        user_id: userId,
      }

      postCourse(data)
        .then(resp => {
          resetFields();
          getCoursesFromServer();
          setIsNewMenuOpen(false);
        })
    }
  }

  const updateCourse = () => {
    const dataValid = selectedStartYear.length > 0 
      && selectedEndYear.length > 0
      && selectedStartMonth
      && selectedEndMonth
      && selectedInstitution
      && selectedDescription
      && userId;

      
    if (dataValid 
      && selectedStartMonth 
      && selectedEndMonth 
      && selectedStartYear 
      && selectedEndYear
    ) {
      const data = {
        start_date: new Date(+selectedStartYear, +selectedStartMonth?.id),
        end_date: new Date(+selectedEndYear, +selectedEndMonth?.id),
        institution: selectedInstitution,
        description: selectedDescription,
        user_id: userId,
      }

      updateCourseById(selectedId, data)
        .then(resp => {
          resetSelectedFields();
          getCoursesFromServer();
          setIsUpdateMenuOpen(false);
        })
    }
  }

  const getCourseInfo = (id: string) => {
    getCourseById(id)
      .then(resp => {
        console.log(resp.data);
        setSelectedCourse(resp.data);
      })
  }

  const removeCourse = useCallback((id: string) => {
    deleteCourseById(id)
      .then(resp => {
        console.log(resp);

        getCoursesFromServer();
      })
  }, []);

  return (
    <div  className={cn(
      "courses",
      {
        "courses--inactive": false
      }
    )}>
      <h1 className="courses__title">
        You took them, you have advantages now lorem lorem lorem
      </h1>

      <div className="courses__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo pe odit nisi dolore magni est officia voluptas.
      </div>

      <div className="courses__container">
        <div className="courses__container-top">
          <div className="courses__container-title">
            Trainings & Courses
          </div>
        </div>
      </div>

      <div className="courses__courses">
        {coursesList.map(course => {
          const {
            id,
            start_date,
            end_date,
            institution,
            description,
          } = course;

          const startDate = new Date(start_date);
          const endDate = new Date(end_date);
          const startMonth: MonthType | undefined = monthsArray.find(month => +month.id === startDate.getMonth())
          const endMonth: MonthType | undefined = monthsArray.find(month => +month.id === endDate.getMonth())
          const startYear = startDate.getFullYear();
          const endYear = endDate.getFullYear();

          return (
            <div key={id} className="courses__course">
              <div className="courses__course-left">
                <div className="courses__course-institution">
                  {institution}
                </div>
              </div>

              <div className="courses__course-right">
                <div className="courses__course-date">
                  {`${startMonth?.name} ${startYear}`}
                </div>

                <div className="courses__course-date">
                  {`${endMonth?.name} ${endYear}`}
                </div>

                <div
                  className="courses__icon-container courses__icon-container--delete"
                  onClick={() => {
                    if (id) {
                      removeCourse(id);
                    }
                  }}
                >
                  <div className="courses__icon courses__icon--delete"></div>
                </div>

                <div
                    className="courses__icon-container courses__icon-container--edit"
                    onClick={() => {
                      if(!isNewMenuOpen) {
                        setIsUpdateMenuOpen(true);

                        if (id) {
                          getCourseInfo(id)
                        }
                      }
                    }}
                  >
                  <div className="courses__icon courses__icon--edit"></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="courses__add-button">
        <div className="courses__add-button-icon"></div>

        <div
          className="courses__add-button-text"
          onClick={() => {
            if (!isUpdateMenuOpen) {
              setIsNewMenuOpen(true);
            }
          }}
        >
          Add course / training
        </div>
      </div>

      <div 
        className={cn(
          "courses__menu",
          {
            "courses__menu--active": isNewMenuOpen
          }
        )}
      >
        <div className="courses__menu-title">
          add Trainings & Courses
        </div>

        <div className="courses__menu-form">
          <div className="courses__dates-container">
            <div className="courses__date-container">
              <div className="courses__label-title">
                Start Date *
              </div>

              <div className="courses__dates">
                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(!dropdownStartMonthActive);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {startMonth?.name || 'Month'}
                    </div>
                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownStartMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="courses__dropdown-item"
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
                
                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(!dropdownStartYearActive);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {startYear || 'Year'}
                    </div>

                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownStartYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='courses__dropdown-input'
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
                          className="courses__dropdown-item"
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

            <div className="courses__date-container">
              <div className="courses__label-title">
                End Date *
              </div>

              <div className="courses__dates">
                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(!dropdownEndMonthActive);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {endMonth?.name || 'Month'}
                    </div>
                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownEndMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="courses__dropdown-item"
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

                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(!dropdownStartYearActive);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {endYear || 'Year'}
                    </div>

                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownEndYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='courses__dropdown-input'
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
                          className="courses__dropdown-item"
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
            </div>
          </div>

          <div className="courses__label">
            <div className="courses__label-title">
              Institution *
            </div>

            <input
              className="courses__input"
              type="text"
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value);
              }}
            />
          </div>
          
          <div className="courses__label">
            <div className="courses__label-title">
              Description
            </div>

            <textarea
              className="courses__textarea"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="courses__buttons">
          <div 
            className="courses__button courses__button-delete"
            onClick={() => {
              setIsNewMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="courses__button courses__button-save"
            onClick={() => {
              addCourse();
            }}
          >
            Save
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "courses__menu",
          {
            "courses__menu--active": isUpdateMenuOpen
          }
        )}
      >
        <div className="courses__menu-title">
          update Trainings & Courses
        </div>

        <div className="courses__menu-form">
          <div className="courses__dates-container">
            <div className="courses__date-container">
              <div className="courses__label-title">
                Start Date *
              </div>

              <div className="courses__dates">
                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(!dropdownStartMonthActive);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {selectedStartMonth?.name}
                    </div>
                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownStartMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="courses__dropdown-item"
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
                
                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(!dropdownStartYearActive);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {selectedStartYear}
                    </div>

                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownStartYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='courses__dropdown-input'
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
                          className="courses__dropdown-item"
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

            <div className="courses__date-container">
              <div className="courses__label-title">
                End Date *
              </div>

              <div className="courses__dates">
                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(!dropdownEndMonthActive);
                      setDropdownEndYearActive(false);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {selectedEndMonth?.name}
                    </div>
                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownEndMonthActive
                    }
                  )}>
                    {monthsArray
                      .map((month) => (
                        <div
                          key={month.id}
                          className="courses__dropdown-item"
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

                <div className="courses__date">
                  <div
                    className='courses__input courses__select'
                    onClick={() => {
                      setDropdownStartMonthActive(false);
                      setDropdownStartYearActive(false);
                      setDropdownEndMonthActive(false);
                      setDropdownEndYearActive(!dropdownStartYearActive);
                      setSearchInput('');
                    }}
                  >
                    <div className="courses__select-left">
                      {selectedEndYear}
                    </div>

                    <div className="courses__select-arrow"></div>
                  </div>

                  <div className={cn(
                    "courses__dropdown",
                    "courses__dropdown--dates",
                    {
                      "courses__dropdown--active": dropdownEndYearActive
                    }
                  )}>
                    <input
                      type="text"
                      className='courses__dropdown-input'
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
                          className="courses__dropdown-item"
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
            </div>
          </div>

          <div className="courses__label">
            <div className="courses__label-title">
              Institution *
            </div>

            <input
              className="courses__input"
              type="text"
              value={selectedInstitution}
              onChange={(e) => {
                setSelectedInstitution(e.target.value);
              }}
            />
          </div>
          
          <div className="courses__label">
            <div className="courses__label-title">
              Description
            </div>

            <textarea
              className="courses__textarea"
              value={selectedDescription}
              onChange={(e) => {
                setSelectedDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="courses__buttons">
          <div 
            className="courses__button courses__button-delete"
            onClick={() => {
              setIsUpdateMenuOpen(false);
            }}
          >
            Go back
          </div>

          <div 
            className="courses__button courses__button-save"
            onClick={() => {
              updateCourse();
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  )
}