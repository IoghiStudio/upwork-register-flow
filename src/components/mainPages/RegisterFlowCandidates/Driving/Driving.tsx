'use client';
import {
  useState,
  useEffect,
  useCallback
} from 'react';
import cn from 'classnames';
import './Driving.scss';
import { createYearsArray } from '@/utils/createYearArray';
import { Months } from '@/types/Months';
import { getMonthsArray } from '@/utils/getMonthsArray';
import { DrivingPermitApi } from '@/types/DrivingPermitApi';
import { MonthType } from '@/types/MonthType';
import { getDrivingPermits, postDrivingPermit } from '@/services/api/driving.service';

const yearsArray = createYearsArray(2023, 1960);
const monthsArray: MonthType[] = getMonthsArray();

// const fakeContainers = [
//   {
//     id: 1,
//     category: 'B',
//     month: Months.September,
//     year: 1987
//   },
//   {
//     id: 2,
//     category: 'CE',
//     month: Months.July,
//     year: 2023
//   },
// ];

export const Driving = () => {
  //api dropdown
  const [categoryList, setCategoryList] = useState([]);

  const [category, setCategory] = useState<string>('');
  const [month, setMonth] = useState<MonthType | null>(null);
  const [year, setYear] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const [infoContainers, setInfoContainers] = useState<DrivingPermitApi[]>([]);
  const [drivingDropdownActiveId, setDrivingDropdownActiveId] = useState<number>(0);
  const [monthDropdownActiveId, setMonthDropdownActiveId] = useState<number>(0);
  const [yearDropdownActiveId, setYearDropdownActiveId] = useState<number>(0);
  const [searchInput, setSearchInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleCategorySelect = useCallback((name: string, id?: string) => {
    setCategory(name);
    setDrivingDropdownActiveId(0);
  }, []);


  const resetFields = useCallback(() => {
    setMonth(null);
    setYear('');
    setCategory('');
  }, []);

  const getPermitsFromServer = useCallback(() => {
    getDrivingPermits()
      .then(resp => {
        const data: DrivingPermitApi[] = resp.data.courses;
        //log for development
        console.log(data);
        setInfoContainers(data);
      })
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('userId');

    if (user) {
      setUserId(user);
    }

    getPermitsFromServer()
  }, []);

  const addPermit = () => {
    console.log('add func')
    const dataValid = year.length > 0 
      && month
      && category
      && userId;

    if (dataValid && month) {
      //log for development
      console.log('valid data', userId);

      const data = {
        category,
        date_of_acquisition: new Date(+year, +month?.id),
        user_id: userId,
      }

      postDrivingPermit(data)
        .then(resp => {
          //log for development
          console.log('resp from post', resp);

          resetFields();
          getPermitsFromServer();
          setIsMenuOpen(false);
        })
    }
  }

  return (
    <div className="drive">
      <h1 className="drive__title">
        Having a work permit might bring you advantages
      </h1>

      <div className="drive__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo iure et earum saepe odit nisi dolore magni est officia voluptas.
      </div>

      <div className="drive__container">
        <div className="drive__container-top">
          <div className="drive__container-title">
            Category
          </div>

          <div className="drive__container-title drive__container-title--second">
            Date of acquisition
          </div>
        </div>

        {infoContainers.map(container => {
          const {
            id,
            category,
            date_of_acquisition,
          } = container;

          const myDate = new Date(date_of_acquisition);
          const month = myDate.getMonth();
          const year = myDate.getFullYear();

          return (
            <div key={id} className="drive__container-permit">
              <div className="drive__container-item">
                <div className="drive__category-dropdown">
                  <label className='drive__label'>
                    <div
                      className='drive__input drive__select'
                      onClick={() => {
                        setMonthDropdownActiveId(0);
                        setYearDropdownActiveId(0);

                        if (drivingDropdownActiveId === id) {
                          setDrivingDropdownActiveId(0);
                          return;
                        }

                        setDrivingDropdownActiveId(id);
                      }}
                    >
                      <div className="drive__select-left">
                        {category || 'Category'}
                      </div>

                      <div className="drive__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "drive__dropdown",
                      {
                        "drive__dropdown--active": drivingDropdownActiveId === id
                      }
                    )}>
                      {categoryList
                        .map((category) => (
                          <div
                            // key={category.id}
                            className="drive__dropdown-item"
                            onClick={() => {
                              // post/update category of that user permit
                              setDrivingDropdownActiveId(0)
                            }}
                          >
                            {/* {lang.name} */}
                          </div>
                        ))
                      }
                    </div>
                  </label>
                </div>
              </div>

              <div className="drive__container-dates">
                <div className="drive__container-item drive__container-item--date">
                  <div className="drive__date-dropdown">
                    <div className="drive__label">
                      <div className="drive__date">
                        <div
                          className='drive__input drive__select'
                          onClick={() => {
                            setDrivingDropdownActiveId(0);
                            setYearDropdownActiveId(0);

                            if (monthDropdownActiveId === id) {
                              setMonthDropdownActiveId(0);
                              return;
                            }

                            setMonthDropdownActiveId(id);
                          }}
                        >
                          <div className="drive__select-left">
                            {month || 'Month'}
                          </div>
                          <div className="drive__select-arrow"></div>
                        </div>

                        <div className={cn(
                          "drive__dropdown",
                          {
                            "drive__dropdown--active": monthDropdownActiveId === id
                          }
                        )}>
                          {monthsArray
                            .map((month, i) => (
                              <div
                                key={i}
                                className="drive__dropdown-item"
                                onClick={() => {
                                  // post/update month of that user permit
                                  setMonthDropdownActiveId(0)
                                }}
                              >
                                {month}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="drive__container-item drive__container-item--date">
                  <div className="drive__date-dropdown">
                    <div className="drive__label">
                      <div className="drive__date">
                        <div
                          className='drive__input drive__select'
                          onClick={() => {
                            setDrivingDropdownActiveId(0);
                            setMonthDropdownActiveId(0);

                            if (yearDropdownActiveId === id) {
                              setYearDropdownActiveId(0);
                              return;
                            }

                            setYearDropdownActiveId(id);
                          }}
                        >
                          <div className="drive__select-left">
                            {year || 'Month'}
                          </div>
                          <div className="drive__select-arrow"></div>
                        </div>

                        <div className={cn(
                          "drive__dropdown",
                          {
                            "drive__dropdown--active": yearDropdownActiveId === id
                          }
                        )}>
                          <input
                            type="text"
                            className='drive__dropdown-input'
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
                            .map((month, i) => (
                              <div
                                key={i}
                                className="drive__dropdown-item"
                                onClick={() => {
                                  // post/update year of that user permit
                                  setYearDropdownActiveId(0)
                                }}
                              >
                                {month}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drive__delete-icon-container">
                <div className="drive__delete-icon"></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="drive__add-button">
        <div className="drive__add-button-icon"></div>

        <div className="drive__add-button-text">
          Add drive permit
        </div>
      </div>
    </div>
  )
}