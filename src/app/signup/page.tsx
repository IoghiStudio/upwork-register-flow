'use client';
import './page.scss';
import { useState, useEffect } from 'react';
import { RegisterCompany } from '@/components/mainPages/Register/RegisterCompany';

export default function SignUpCompany() {
  return (
    <div className="signup">
      <RegisterCompany />
    </div>
  )
}