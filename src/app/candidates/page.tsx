'use client';
import { Advantages } from '@/components/mainPages/HomeCandidates/Advantages';
import { Features } from '@/components/mainPages/HomeCandidates/Features';
import { HomeCandidatesHeader } from '@/components/mainPages/HomeCandidates/HomeCandidatesHeader';
import { HowTo } from '@/components/mainPages/HomeCandidates/HowTo';
import { Pricing } from '@/components/mainPages/HomeCandidates/Pricing';
import { Subscribe } from '@/components/mainPages/HomeCandidates/Subscribe/Subscribe';
import { Testimonials } from '@/components/mainPages/HomeCandidates/Testimonials';


export default function Candidates() {
  return (
    <div className="candidates">
      <HomeCandidatesHeader />
      <Advantages />
      <Testimonials />
      <Features />
      <HowTo />
      <Pricing />
      <Subscribe />
    </div>
  )
}