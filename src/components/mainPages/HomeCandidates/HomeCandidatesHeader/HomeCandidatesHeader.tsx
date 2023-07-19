import './HomeCandidatesHeader.scss';
import Link from 'next/link';

export const HomeCandidatesHeader = () => {
  return (
    <div className="header">
      <div className="header__logo"></div>

      <div className="header__top">
        <div className="header__menu"></div>

        <div className="header__right">
          <Link
            href='/candidates/signin'
            className="header__signin"
          >
            Sign In
          </Link>

          <Link
            href='/candidates/signup'
            className="header__signup"
          >
            Sign Up
          </Link>

          <div className="header__language">
            <div className="header__language-text">
              English
            </div>

            <div className="header__language-icon"></div>
          </div>
        </div>
      </div>

      <div className="header__info">
        <div className="header__video"></div>

        <div className="header__details">
          <div className="header__title">
            <div>
              WHY IS THE BEST
            </div>

            <div className='header__title-weird'>
              RECRUITMENT PLATFORM
            </div>

            <div className='header__title-weird-2'>
              IN THE WORLD?
            </div>
          </div>

          <p className="header__text">
            She clutched the matron by the arm, and forcing her into a chair by the bedside, was about to speak, when looking round, she caught sight of the two old women bending forward in the attitude of eager listeners.
          </p>

          <div className="header__buttons">
            <div className="header__button header__button--video">
              PLAY VIDEO
            </div>
            
            <div className="header__button">
              GET STARTED
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}