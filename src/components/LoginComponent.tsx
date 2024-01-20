'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function LoginComponent() {
  const router = useRouter();
  const pathName = usePathname();
  function submitForLogin() {
    window.localStorage.setItem('path', pathName);
    router.push('/login');
  }

  return (
    <div>
      <button
        type="button"
        className="text-blue-500 flex gap-1 text-md font-medium"
        onClick={submitForLogin}
      >
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
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Login
      </button>

      {/* <button
        className="py-1 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        href="/login"
      >
        Log in
      </button> */}
    </div>
  );
}
