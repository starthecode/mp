import React from 'react';
import Image from 'next/image';
import NavItems from './NavItems';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm py-3 md:py-0">
      <nav className=" w-full mx-auto px-4 md:px-6 lg:px-8" aria-label="Global">
        <div className="flex relative w-full items-center justify-between">
          <a
            className="flex items-center w-[200px] gap-2 text-black text-md font-semibold outline-none no-underline dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="/"
            aria-label="Brand"
          >
            <Image
              src="/assets/imgs/application-logo.png"
              width={30}
              height={30}
              alt={'logo'}
              className="w-auto h-auto"
            />
            Experimental App
          </a>

          <NavItems session={session} />
        </div>
      </nav>
    </header>
  );
}
