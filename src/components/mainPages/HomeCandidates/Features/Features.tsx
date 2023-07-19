import { FeatureArticle } from '@/types/FeatureArticle';
import './Features.scss';
import cn from 'classnames';

const featuresArticels: FeatureArticle[] = [
  {
    id: 1,
    title: 'Video Your Work',
    classModifier: 'video',
    text: '«Auteur» is a word that I would argue is thrown around too much when it comes to video games.'
  },
  {
    id: 2,
    title: 'Direct contact',
    classModifier: 'contact',
    text: '«Auteur» is a word that I would argue is thrown around too much when it comes to video games.'
  },
  {
    id: 3,
    title: 'Professional CV',
    classModifier: 'cv',
    text: '«Auteur» is a word that I would argue is thrown around too much when it comes to video games.'
  },
  {
    id: 4,
    title: 'Unlock the world',
    classModifier: 'world',
    text: '«Auteur» is a word that I would argue is thrown around too much when it comes to video games.'
  },
  {
    id: 5,
    title: 'Rich portfolio',
    classModifier: 'portfolio',
    text: '«Auteur» is a word that I would argue is thrown around too much when it comes to video games.'
  },
  {
    id: 6,
    title: 'One more here',
    classModifier: 'safe',
    text: '«Auteur» is a word that I would argue is thrown around too much when it comes to video games.'
  },
]

export const Features = () => {
  return (
    <div className="features">
      <h1 className="features__top-title">
        Key Features
      </h1>

      <div className="features__articles">
        <div className="features__articles-1">
          <div className="features__article features__article-1">
            <div className="features__article-top">
              <div className={cn(
                "features__icon",
                `features__icon--${featuresArticels[0].classModifier}`
              )}></div>
              <h2 className="features__title">{featuresArticels[0].title}</h2>
            </div>
            <p className="features__text">{featuresArticels[0].text}</p>
          </div>

          <div className="features__logo-container">
            <div className="features__logo"></div>
            <div className="features__stick features__stick-1"></div>
            <div className="features__stick features__stick-2"></div>
            <div className="features__stick features__stick-3"></div>
            <div className="features__stick features__stick-4"></div>
            <div className="features__stick features__stick-5"></div>
            <div className="features__stick features__stick-6"></div>
          </div>

          <div className="features__article features__article-2">
            <div className="features__article-top">
              <div className={cn(
                "features__icon",
                `features__icon--${featuresArticels[1].classModifier}`
              )}></div>
              <h2 className="features__title">{featuresArticels[1].title}</h2>
            </div>
            <p className="features__text">{featuresArticels[1].text}</p>
          </div>
        </div>

        <div className="features__articles-bottom">
          <div className="features__articles-2">
            <div className="features__article features__article-3">
              <div className="features__article-top features__article-top-3">
                <div className={cn(
                  "features__icon",
                  `features__icon--${featuresArticels[2].classModifier}`
                )}></div>
                <h2 className="features__title">{featuresArticels[2].title}</h2>
              </div>
              <p className="features__text">{featuresArticels[2].text}</p>
            </div>

            <div className="features__article features__article-4">
              <div className="features__article-top features__article-top-4">
                <div className={cn(
                  "features__icon",
                  `features__icon--${featuresArticels[3].classModifier}`
                )}></div>
                <h2 className="features__title">{featuresArticels[3].title}</h2>
              </div>
              <p className="features__text">{featuresArticels[3].text}</p>
            </div>
          </div>

          <div className="features__articles-3">
            <div className="features__article features__article-5">
              <div className="features__article-top features__article-top-5">
                <div className={cn(
                  "features__icon",
                  `features__icon--${featuresArticels[4].classModifier}`
                )}></div>
                <h2 className="features__title">{featuresArticels[4].title}</h2>
              </div>
              <p className="features__text">{featuresArticels[4].text}</p>
            </div>
            <div className="features__article features__article-6">
              <div className="features__article-top features__article-top-6">
                <div className={cn(
                  "features__icon",
                  `features__icon--${featuresArticels[5].classModifier}`
                )}></div>
                <h2 className="features__title">{featuresArticels[5].title}</h2>
              </div>
              <p className="features__text">{featuresArticels[5].text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}