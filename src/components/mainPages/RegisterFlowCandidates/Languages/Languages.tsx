'use client';
import {
  useState,
  useEffect,
  useCallback
} from 'react';
import { NationalityApi } from '@/types/NationalityApi';
import cn from 'classnames';
import './Languages.scss';
import { getNationality } from '@/services/api/nationality.service';
import { LanguageApi } from '@/types/LanguageApi';
import { 
  getLanguages, 
  postLanguage, 
  updateLanguageById 
} from '@/services/api/languages.service';

export type LevelType = "NATIVE" | "ADVANCED" | "INTERMEDIATE" | "BEGINNER";

// enum LanguageLevels {
//   Native,
//   Advanced,
//   Intermediare,
//   Beginner,
// }

const languageLevels: LevelType[] = [
  'NATIVE',
  'ADVANCED',
  'INTERMEDIATE',
  'BEGINNER',
];

// const fakeContainers = [
//   {
//     id: 1,
//     language: 'French',
//     level: 'Advanced'
//   },

//   {
//     id: 2,
//     language: 'I know',
//     level: 'My level'
//   },
// ];

export const Languages = () => {
  //this is the languages used for dropdown not the Languages of the user
  const [nationalityList, setNationalityList] = useState<NationalityApi[]>([]);

  const [language, setLanguage] = useState<string>('');
  const [level, setLevel] = useState<LevelType | ''>('');
  const [userId, setUserId] = useState<string>('');

  const [englishLevel, setEnglishLevel] = useState<string>('Beginner');

  const [infoContainers, setInfoContainers] = useState<LanguageApi[]>([]);

  
  const [searchInput, setSearchInput] = useState<string>('');
  const [languageDropdownActiveId, setLanguageDropdownActiveId] = useState<string>('');
  const [levelDropdownActiveId, setLevelDropdownActiveId] = useState<string>('');
  const [englishDropdownActive, setEnglishDropdownActive] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLanguageSelect = useCallback((id: string, name: string) => {
    setLanguage(name);
    setLanguageDropdownActiveId('');
    setSearchInput('');
  }, []);

  const resetFields = useCallback(() => {
    setLanguage('');
    setLevel('');
  }, []);

  const getLanguagesFromServer = useCallback(() => {
    getLanguages()
      .then(resp => {
        const data: LanguageApi[] = resp.data.languages;
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

    getLanguagesFromServer();

    //drodpwons data
    getNationality()
      .then(resp => {
        setNationalityList(resp.data.languages);
      })
  }, []);

  const addLanguage = () => {
    console.log('add func')
    const dataValid = language 
      && level
      && userId;

    if (dataValid) {
      //log for development
      console.log('valid data', userId);

      const data = {
        language,
        level,
        user_id: userId,
      }

      postLanguage(data)
        .then(resp => {
          //log for development
          console.log('resp from post', resp);

          resetFields();
          getLanguagesFromServer();
          setIsMenuOpen(false);
        })
    }
  }

  return (
    <div className="lang">
      <h1 className="lang__title">
        Looking good. Next, tell us which languages you speak.
      </h1>

      <div className="lang__text">
        VideoWorkers is global, so companies are often interested to know what languages you speak. English is a must, but do you speak any other languages?
      </div>

      <div className="lang__container">
        <div className="lang__container-top">
          <div className="lang__container-title">
            Language
          </div>

          <div className="lang__container-title">
            Proficiency
          </div>
        </div>

        <div className="lang__container-english">
          <div className="lang__container-item">
            <div className="lang__container-english-text">
              English (all profiles include this)
            </div>
          </div>

          <div className="lang__container-item">
            <div className="lang__level-dropdown">
              <div className="lang__label">
                <div
                  className='lang__input lang__select'
                  onClick={() => {
                    setLanguageDropdownActiveId('');
                    setLevelDropdownActiveId('');

                    if (englishDropdownActive) {
                      setEnglishDropdownActive(false);
                      return;
                    }

                    setEnglishDropdownActive(true);
                  }}
                >
                  <div className="lang__select-left">
                    {'Beginner' || 'My level'}
                  </div>
                  <div className="lang__select-arrow"></div>
                </div>

                <div className={cn(
                  "lang__dropdown",
                  "lang__dropdown--level",
                  {
                    "lang__dropdown--active": englishDropdownActive
                  }
                )}>
                  {languageLevels
                    .map((month, i) => (
                      <div
                        key={i}
                        className="lang__dropdown-item"
                        onClick={() => {
                          // nothing yet
                          setEnglishDropdownActive(false);
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

        {/* //iterate over the languages api from that user */}
        {/* //modify this one by its id */}
        {infoContainers.map(container => {
          const {
            id,
            language,
            level
          } = container;

          return (
            <div key={id} className="lang__container-language">
              <div className="lang__container-item">
                <div className="lang__language-dropdown">
                  <label className='lang__label'>
                    <div
                      className='lang__input lang__select'
                      onClick={() => {
                        setLevelDropdownActiveId('');
                        setEnglishDropdownActive(false);

                        if (languageDropdownActiveId === id) {
                          setLanguageDropdownActiveId('');
                          return;
                        }

                        setLanguageDropdownActiveId(id || '');
                      }}
                    >
                      <div className="lang__select-left">
                        {language || 'I know'}
                      </div>
                      <div className="lang__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "lang__dropdown",
                      "lang__dropdown--language",
                      {
                        "lang__dropdown--active": languageDropdownActiveId === id
                      }
                    )}>
                      <input
                        type="text"
                        className='lang__dropdown-input'
                        value={searchInput}
                        onChange={(e) => {
                          const inputQuery = e.target.value.toLowerCase();
                          setSearchInput(inputQuery);
                        }}
                      />

                      {nationalityList
                        .filter(nationality => nationality.name.toLowerCase()
                          .includes(searchInput)
                        )
                        .map(lang => (
                          <div
                            key={lang.id}
                            className="lang__dropdown-item"
                            onClick={() => {
                              handleLanguageSelect(lang.id, lang.name);
                            }}
                          >
                            {lang.name}
                          </div>
                        ))
                      }
                    </div>
                  </label>
                </div>
              </div>

              <div className="lang__container-item lang__container-item--second">
                <div className="lang__level-dropdown">
                  <div className="lang__label">
                    <div
                      className='lang__input lang__select'
                      onClick={() => {
                        setLanguageDropdownActiveId('');
                        setEnglishDropdownActive(false);

                        if (levelDropdownActiveId === id) {
                          setLevelDropdownActiveId('');
                          return;
                        }

                        setLevelDropdownActiveId(id || '');
                      }}
                    >
                      <div className="lang__select-left">
                        {level || 'My level'}
                      </div>
                      <div className="lang__select-arrow"></div>
                    </div>

                    <div className={cn(
                      "lang__dropdown",
                      "lang__dropdown--level",
                      {
                        "lang__dropdown--active": levelDropdownActiveId === id
                      }
                    )}>
                      {languageLevels
                        .map((level, i) => (
                          <div
                            key={i}
                            className="lang__dropdown-item"
                            onClick={() => {
                              // nothing yet
                              setLevelDropdownActiveId('');
                            }}
                          >
                            {level}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="lang__delete-icon-container">
                <div className="lang__delete-icon"></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="lang__add-button">
        <div className="lang__add-button-icon"></div>

        <div
          className="lang__add-button-text"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
        >
          Add a language
        </div>
      </div>

      <div 
        className={cn(
          "lang__menu",
          {
            "lang__menu--active": isMenuOpen
          }
        )}
      >
        <div className="lang__menu-title">
          Add language
        </div>

        <div className="lang__menu-form">
          {/* <label className='lang__label'>
            <div
              className='lang__input lang__select'
              onClick={() => {
                setLevelDropdownActiveId('');
                setEnglishDropdownActive(false);

                // if (languageDropdownActiveId === id) {
                //   setLanguageDropdownActiveId('');
                //   return;
                // }

                // setLanguageDropdownActiveId(id || '');
              }}
            >
              <div className="lang__select-left">
                {language || 'I know'}
              </div>
              <div className="lang__select-arrow"></div>
            </div>

            <div className={cn(
              "lang__dropdown",
              "lang__dropdown--language",
              {
                "lang__dropdown--active": languageDropdownActiveId === id
              }
            )}>
              <input
                type="text"
                className='lang__dropdown-input'
                value={searchInput}
                onChange={(e) => {
                  const inputQuery = e.target.value.toLowerCase();
                  setSearchInput(inputQuery);
                }}
              />

              {nationalityList
                .filter(nationality => nationality.name.toLowerCase()
                  .includes(searchInput)
                )
                .map(lang => (
                  <div
                    key={lang.id}
                    className="lang__dropdown-item"
                    onClick={() => {
                      handleLanguageSelect(lang.id, lang.name);
                    }}
                  >
                    {lang.name}
                  </div>
                ))
              }
            </div>
          </label>
          
          <div className="lang__label">
            <div
              className='lang__input lang__select'
              onClick={() => {
                setLanguageDropdownActiveId('');
                setEnglishDropdownActive(false);

                if (levelDropdownActiveId === id) {
                  setLevelDropdownActiveId('');
                  return;
                }

                setLevelDropdownActiveId(id || '');
              }}
            >
              <div className="lang__select-left">
                {level || 'My level'}
              </div>
              <div className="lang__select-arrow"></div>
            </div>

            <div className={cn(
              "lang__dropdown",
              "lang__dropdown--level",
              {
                "lang__dropdown--active": levelDropdownActiveId === id
              }
            )}>
              {languageLevels
                .map((level, i) => (
                  <div
                    key={i}
                    className="lang__dropdown-item"
                    onClick={() => {
                      // nothing yet
                      setLevelDropdownActiveId('');
                    }}
                  >
                    {level}
                  </div>
                ))
              }
            </div>
          </div> */}
        </div>

        <div className="lang__buttons">
          <div 
            className="lang__button lang__button-delete"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Delete
          </div>

          <div 
            className="lang__button lang__button-save"
            onClick={() => {
              addLanguage();
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  )
}