'use client';
import { ProfileLinks } from '@/constants';
import { isAdmin } from '@/libs/utils';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function HeaderDropdown({ data }: any) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdown = React.useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const router = useRouter();

  function handleDropdown(e: any) {
    if (dropdown.current && !dropdown.current?.contains(e.target)) {
      setShowDropdown(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleDropdown, !showDropdown);

    return () => {
      document.removeEventListener('click', handleDropdown, !showDropdown);
    };
  }, [showDropdown]);

  async function logoutHandle() {
    await signOut({ redirect: false }).then(() => {
      router.push('/');
      router.refresh(); // Redirect to the dashboard page after signing out
    });
  }

  return (
    <>
      <div className="flex gap-2 items-center">
        {pathName != '/' && (
          <Link
            href="/"
            className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Link>
        )}

        <div className="profile" onClick={() => setShowDropdown((b) => !b)}>
          <div className="user">
            <h3>Welcome {data?.user?.name.split(' ')[0]}</h3>
          </div>
          <div className="img-box bg-slate-300">
            {!!data?.user?.image && (
              <Image
                src={data?.user?.image}
                className="p-1 rounded-full"
                fill
                sizes="(max-width: 40px) 100vw, 33vw"
                alt="profile logo"
              />
            )}
          </div>
        </div>
        {showDropdown && (
          <div className={`menu`} ref={dropdown}>
            <div className="py-3 px-3 bg-gray-100 rounded-t-lg dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Signed in as
              </p>
              <p className="text-xs font-medium text-gray-800 dark:text-gray-300">
                {data?.user?.email}
              </p>
            </div>
            {isAdmin(data?.user) ? (
              <ul>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="flex items-center px-2">
                  <span>
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {' '}
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />{' '}
                      <path d="M12 12v9" /> <path d="m8 17 4 4 4-4" />{' '}
                    </svg>
                  </span>
                  <Link href={'/account/?tab=downloads'}>My Downloads</Link>
                </li>
                <li className="flex items-center px-2">
                  <span>
                    <svg
                      className="flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {' '}
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />{' '}
                      <circle cx="9" cy="7" r="4" />{' '}
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />{' '}
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />{' '}
                    </svg>
                  </span>
                  <Link href={'/account/?tab=account'}>Account</Link>
                </li>
                <li className="flex items-center px-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width="20"
                      height="20"
                    >
                      {' '}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                      />{' '}
                    </svg>
                  </span>
                  <Link href={'/help'}>Help</Link>
                </li>
              </ul>
            )}

            <button onClick={logoutHandle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
