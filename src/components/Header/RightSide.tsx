import Link from 'next/link';
import React from 'react';
import HeaderDropdown from '../Dropdown/HeaderDropdown';
import { UserSessionParams } from '@/types';
import LoginComponent from '../LoginComponent';

export default async function RightSide({ session }: UserSessionParams) {
  return (
    <div className="pt-3 md:pt-0">
      {session ? <HeaderDropdown data={session} /> : <LoginComponent />}
    </div>
  );
}
