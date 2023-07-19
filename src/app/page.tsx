'use client';
import './page.scss';
import { Counter } from '@/components/mainPages/HomePage/Counter';
import { HomeHeader } from '@/components/mainPages/HomePage/HomeHeader';
import { Reviews } from '@/components/mainPages/HomePage/Reviews';
import { News } from '@/components/mainPages/HomePage/News';

export default function Home() {
  return (
    <div className='home'>
      <div className="home__header">
        <HomeHeader />
      </div>

      <div className="home__counter">
        <Counter />
      </div>

      <div className="home__reviews">
        <Reviews />
      </div>

      <div className="home__news">
        <News />
      </div>
    </div>
  )
}
