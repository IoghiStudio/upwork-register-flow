import './HomeHeader.scss';
import Link from 'next/link';

export const HomeHeader = () => {
  return (
    <div className="homeheader">
      <div className="homeheader__logo"></div>

      <div className="homeheader__top">
        <div className="homeheader__menu"></div>

        <div className="homeheader__right">
          <Link
            href='/'
            className="homeheader__signin"
          >
            Sign In
          </Link>

          <Link
            href='/signup'
            className="homeheader__signup"
          >
            Sign Up
          </Link>

          <div className="homeheader__language">
            <div className="homeheader__language-text">
              English
            </div>

            <div className="homeheader__language-icon"></div>
          </div>
        </div>
      </div>

      <div className="homeheader__headline">
        <Link href={'/candidates'} className="homeheader__headline-text homeheader__candidates">
          candidates
        </Link>

        <div className="homeheader__headline-text homeheader__companies">
          companies
        </div>
      </div>
    </div>
  )
}