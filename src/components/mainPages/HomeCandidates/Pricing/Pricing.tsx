import Link from 'next/link';
import './Pricing.scss';

const benefits = [
  {
    id: 1,
    text: 'Professional CV tailored for your desired job'
  },
  {
    id: 2,
    text: 'Unlimited number of videos linked to your CV'
  },
  {
    id: 3,
    text: 'Unlimited number of portfolio items'
  },
  {
    id: 4,
    text: 'Set visibility by Country or Worldwide'
  },
];

export const Pricing = () => {
  return (
    <div className="pricing">
      <div className="pricing__content">
        <div className="pricing__top">
          <div className="pricing__top-header">
            Pricing
          </div>

          <div className="pricing__top-info">
            <h3 className="pricing__top-title">
              A simple and inclusive plan
            </h3>

            <p className="pricing__top-text">
              With our affordable pricing plan, you gain access to a comprehensive set of tools and resources designed to maximize your chances of landing your dream job.
            </p>

            <p className="pricing__top-text">
              Showcase your skills with professional videos, create impressive portfolios, and generate eye-catching CVs that grab the attention of employers.
            </p>

            <p className="pricing__top-text">
            Plus, enjoy direct communication with companies, bypassing expensive manpower agencies and negotiating salaries on your terms.
            </p>
          </div>
        </div>

        <div className="pricing__bottom">
          <div className="pricing__bottom-content">
            <div className="pricing__bottom-header">
              <span className='pricing__dollar'>
                $
              </span>

              <span className='pricing__price'>
                1.99
              </span>
              /month
            </div>

            <div className="pricing__headline">
              For the first 3 months
            </div>

            <div className="pricing__midline">
              $8.99/month after trial ends. Cancel anytime.
            </div>

            <div className="pricing__divider"></div>

            <h3 className="pricing__bottom-title">
              <div>
                {'CREATE YOU '}
                <span className='pricing__bottom-title--italic'>
                  VideoWorkers
                </span>
              </div>

              <div>
                PROFILE AND GET IN FRONT OF
              </div>
            
              <div>
                MILLIONS OF COMPANIES
              </div>
            </h3>

            <div className="pricing__benefits">
              {benefits.map(({id, text}) => (
                <div key={id} className="pricing__benefit">
                  <div className="pricing__benefit-icon"></div>
                  <div className="pricing__benefit-text">
                    {text}
                  </div>
                </div>
              ))}
            </div>

            <Link href='/candidates/signup' className="pricing__button">
              Start your 90-day trial
            </Link>

            <div className="pricing__bottomline pricing__bottomline--mob-tab">
              {'Already have an account? '}
              <Link
                href='/candidates/signin'
                className='pricing__bottomline-link'
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pricing__bottomline pricing__bottomline--desktop">
        {'Already have an account? '}
        <Link
          href='/candidates/signin'
          className='pricing__bottomline-link'
        >
          Log In
        </Link>
      </div>
    </div>
  )
}