'use client';
import { useEffect, useState } from 'react';
import './Testimonials.scss'
import cn from 'classnames';
import { TestimonialCardInterface } from '@/types/TestimonialCard';

const testimonials: TestimonialCardInterface[] = [
  {
    id: 1,
    image: '',
    name: 'Shrimp Shrimpescu',
    country: 'Australia',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
  {
    id: 2,
    image: '',
    name: 'Benson Woody',
    country: 'Germany',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
  {
    id: 3,
    image: '',
    name: 'Mitch Frankenstein',
    country: 'America',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
  {
    id: 4,
    image: '',
    name: 'Mordecai',
    country: 'Italy',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
  {
    id: 5,
    image: '',
    name: 'Despicable me',
    country: 'Infractoria',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
  {
    id: 6,
    image: '',
    name: 'Minions Jhon',
    country: 'Australia',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
  {
    id: 7,
    image: '',
    name: 'Rigby',
    country: 'Spain',
    info: 'As we passed, I remarked a beautiful church-spire rising above some old elms in the park; and before them, in the midst of a lawn, and some outhouses, an old red house with tall chimneys covered with ivy.',
  },
];

export const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<TestimonialCardInterface>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setActiveTestimonial(testimonials[index]);
  }, [])
  
  useEffect(() => {
    setActiveTestimonial(testimonials[index]);
  }, [index])
  
  return (
    <div className="test">
      <h1 className="test__title">
        Testimonials
      </h1>

      <div className="test__text">
        <span className='test__text-part-1'>
          Still need convincing?
        </span>

        <span className='test__text-part-2'>
          {' Check out what people are saying'}
        </span>

        <span className='test__text-part-3'>
          {' about VideoWorkers.'}
        </span>
      </div>

      <div className="test__customers">
        {[0,1,2,3,4,5,6].map(pic => (
          <div
            key={pic}
            className={cn(
              "test__userpic",
              {
                "test__userpic--active": index === pic
              }
            )}
          ></div>
        ))}
      </div>

      <div className="test__divider"></div>

      <div className="test__card">
        <div className="test__top">
          <div
            className="test__arrow"
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              } else {
                setIndex(testimonials.length - 1)
              }
              console.log(index)
            }}
          ></div>

          <div className="test__image"></div>
          
          <div 
            className="test__arrow test__arrow--right"
            onClick={() => {
              if (index < testimonials.length - 1) {
                setIndex(index + 1);
              } else {
                setIndex(0)
              }
              console.log(index)
            }}
          ></div>
        </div>

        <div className="test__name">
          {activeTestimonial.name}
        </div>
        
        <div className="test__country">
          {activeTestimonial.country}
        </div>

        <div className="test__info">
          {activeTestimonial.info}
        </div>
      </div>
    </div>
  )
}