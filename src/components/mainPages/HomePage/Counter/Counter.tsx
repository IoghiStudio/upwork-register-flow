import './Counter.scss';

const counterCards = [
  {
    id: 1,
    number: 123.45,
    title: 'TITLE 1',
    text: 'She gave my mother such a turn, that i have always been convinced I am indebted to Miss Betsey for having been born on Fryday.'
  },
  {
    id: 2,
    number: 18,
    title: 'TITLE 1',
    text: 'She gave my mother such a turn, that i have always been convinced I am indebted to Miss Betsey for having been born on Fryday.'
  },
  
  {
    id: 3,
    number: 223499,
    title: 'TITLE 1',
    text: 'She gave my mother such a turn, that i have always been convinced I am indebted to Miss Betsey for having been born on Fryday.'
  },
]

export const Counter = () => {
  return (
    <div className="counter">
      <h1 className="counter__title">
        The counter title here!
      </h1>

      <div className="counter__cards">
        {counterCards.map(card => {
          const {
            id,
            number,
            title,
            text
          } = card;

          return (
            <div key={id} className="counter__card">
              {number > 10000 ? (
                <div className="counter__number">
                  {`${Math.floor(number / 1000)}K`}
                </div>
              ) : (
                <div className="counter__number">
                  {number}
                </div>
              )}

              <div className="counter__card-title"> {title} </div>
              <div className="counter__text"> {text} </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}