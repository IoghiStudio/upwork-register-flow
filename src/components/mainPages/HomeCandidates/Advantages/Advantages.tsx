import './Advantages.scss';
import cn from 'classnames';

const list = [
  {
    id: 1,
    title: 'MORE THAN 30 MILLION COMPANIES IN ENROLMENT',
    text: 'Get your chance to display your CV in front of more than 30 million companies that are searching for candidates all around the world.',
    textplaceholder: 'Up to 4 rows for the text',
    icon: 'domain',
    reversed: false,
  },
  {
    id: 2,
    title: 'MORE THAN 30 MILLION COMPANIES IN ENROLMENT',
    text: 'Get your chance to display your CV in front of more than 30 million companies that are searching for candidates all around the world.',
    textplaceholder: 'Up to 4 rows for the text',
    icon: 'domain',
    reversed: true,
  },
  {
    id: 3,
    title: 'MORE THAN 30 MILLION COMPANIES IN ENROLMENT',
    text: 'Get your chance to display your CV in front of more than 30 million companies that are searching for candidates all around the world.',
    textplaceholder: 'Up to 4 rows for the text',
    icon: 'domain',
    reversed: false,
  },
  {
    id: 4,
    title: 'MORE THAN 30 MILLION COMPANIES IN ENROLMENT',
    text: 'Get your chance to display your CV in front of more than 30 million companies that are searching for candidates all around the world.',
    textplaceholder: 'Up to 4 rows for the text',
    icon: 'domain',
    reversed: true,
  }
];


export const Advantages = () => {
  return (
    <div className="advantages">
      <div className="advantages__top">
        <h1 className="advantages__top-title">
          <div className='advantages__top-title-top'>Lots of </div> Advantages
        </h1>

        <p className="advantages__top-text">
          She was bouncing away, when a cry from the two women, who had turned towards the bed, caused her to look round.
        </p>
      </div>

      <div className="advantages__list">
        {list.map(item => {
          const {
            id,
            title,
            text,
            textplaceholder,
            icon,
            reversed
          } = item;

          return (
            <div key={id} className="advantages__item">
              <div className={cn(
                "advantages__icon-container",
                {
                  "advantages__icon-container--reversed": reversed,
                }
              )}>
                <div className={cn(
                  "advantages__icon",
                  `advantages__icon--${icon}`
                )}></div>
              </div>

              <div className="advantages__info">
                <h3 className={cn(
                    "advantages__title",
                    {
                      "advantages__title--reversed": reversed
                    }
                  )}>
                  {title}
                </h3>

                <p className={cn(
                  "advantages__text",
                  {
                    "advantages__text--reversed": reversed
                  }
                )}>
                  {text}
                </p>

                <p className={cn(
                  "advantages__text",
                  {
                    "advantages__text--reversed": reversed
                  }
                )}>
                  {textplaceholder}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}