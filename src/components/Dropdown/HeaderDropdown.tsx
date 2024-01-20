'use client';
import { ProfileLinks } from '@/constants';
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

  console.log(showDropdown);

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
            <Image
              className="p-1 rounded-full"
              fill
              sizes="(max-width: 40px) 100vw, 33vw"
              src={data?.user?.image}
              alt={data?.user?.name}
            />
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
            <ul>
              {ProfileLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.route}>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></span>
                    &nbsp;{item.label}
                  </a>
                </li>
              ))}
            </ul>

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
