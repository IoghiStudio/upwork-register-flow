import './HowTo.scss';
import { Advantage } from '@/types/Advantage';

const advantages: Advantage[] = [
  {
    id: 1,
    title: 'FIRST ADVANTAGE',
    text: 'This sounded a very good reason, and Alice was quite pleased to know it. \'I never thought of that before!\' she said.'
  },
  {
    id: 2,
    title: 'SECOND ADVANTAGE',
    text: 'This sounded a very good reason, and Alice was quite pleased to know it. \'I never thought of that before!\' she said.'
  },
  {
    id: 3,
    title: 'THIRD ADVANTAGE',
    text: 'This sounded a very good reason, and Alice was quite pleased to know it. \'I never thought of that before!\' she said.'
  }
] 

export const HowTo = () => {
  return (
    <div className="howto">
      <div className="howto__top">
        <div className="howto__info">
          <h1 className="howto__title">
            <span className='howto__title-thin'>TIPS & TRICKS:</span> HOW
          </h1>

          <h1 className="howto__title">
            TO DO YOUR VIDEO?
          </h1>

          <p className="howto__text">
            The police think maybe it was the gas. Maybe the pilot light on the stove went out or a burner was left on, leaking gas, and the gas rose
          </p>

          <div className="howto__button">
            CANDIDATE HANDBOOK
          </div>
        </div>

        <div className="howto__video"></div>
      </div>

      <div className="howto__advantages">
        {advantages.slice(0, 3).map(advantage => {
          const { id, title, text } = advantage;

          return (
            <div key={id} className="howto__advantage">
              <h3 className="howto__advantage-title">
                {title}
              </h3>

              <p className="howto__advantage-text">
                {text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  )
}