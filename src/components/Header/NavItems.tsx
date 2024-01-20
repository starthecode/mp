'use client';

import { headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';
import RightSide from './RightSide';

export default function NavItems({ session }: any) {
  const [active, setActive] = React.useState(false);

  function handleClick() {
    active ? setActive(false) : setActive(true);
  }

  return (
    <>
      <div className="md:hidden">
        <button
          onClick={handleClick}
          type="button"
          className="hs-collapse-toggle flex justify-center items-center w-9 h-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-collapse="#navbar-collapse-with-animation"
          aria-controls="navbar-collapse-with-animation"
          aria-label="Toggle navigation"
        >
          <svg
            className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="black"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
          <svg
            className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div
        className={`hs-collapse ${
          active ? 'w-full absolute top-[50px] z-10 bg-white' : 'hidden'
        } overflow-hidden transition-all duration-300 basis-full grow md:block`}
      >
        <div className="overflow-hidden overflow-y-auto max-h-[75vh]">
          <div className="flex flex-col gap-x-0 mt-5 divide-y divide-dashed divide-gray-200 md:flex-row md:items-center md:justify-end md:gap-x-7 md:mt-0 md:ps-7 md:divide-y-0 md:divide-solid dark:divide-gray-700">
            {headerLinks &&
              headerLinks.map((link, index) => (
                <Link
                  key={index}
                  className="font-medium text-gray-500 hover:text-gray-400 py-3 md:py-6 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href={link.route}
                >
                  {link.label}
                </Link>
              ))}

            {/*
            <div className="group static md:absolute] md:hover] py-3 md:py-4">
              <button
                type="button"
                className="flex items-center w-full text-gray-500 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Resources
                <svg
                  className="flex-shrink-0 ms-2 w-4 h-4"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div className="transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] group-hover:opacity-100 opacity-0 w-full group-hover:block hidden absolute z-10 top-full start-0 min-w-[15rem] bg-white md:shadow-2xl rounded-lg py-2 md:p-4 dark:bg-gray-800 dark:divide-gray-700 before:absolute before:-top-5 before:start-0 before:w-full before:h-5">
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col mx-1 md:mx-0">
                    <a
                      className="group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-1"
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
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      <div className="grow">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          Support Docs
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          Explore advice and explanations for all of Prelines
                          features.
                        </p>
                      </div>
                    </a>

                    <a
                      className="group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-1"
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
                        <rect width="7" height="7" x="14" y="3" rx="1" />
                        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                      </svg>
                      <div className="grow">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          Integrations
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          Discover the huge range of tools that Preline
                          integrates with.
                        </p>
                      </div>
                    </a>

                    <a
                      className="group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-1"
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
                        <path d="m7 11 2-2-2-2" />
                        <path d="M11 13h4" />
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />
                      </svg>
                      <div className="grow">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          API Reference
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          Build custom integrations with our first-class API.
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="flex flex-col mx-1 md:mx-0">
                    <a
                      className="group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-1"
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                      <div className="grow">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          Help Center
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          Learn how to install, set up, and use Preline.
                        </p>
                      </div>
                    </a>

                    <a
                      className="group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-1"
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
                        <circle cx="12" cy="12" r="4" />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                      </svg>
                      <div className="grow">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          Developer Hub
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          Learn how to integrate or build on top of Preline.
                        </p>
                      </div>
                    </a>

                    <a
                      className="group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 mt-1"
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <div className="grow">
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                          Community Forum
                        </p>
                        <p className="text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                          Learn, share, and connect with other Preline users.
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="flex flex-col pt-4 md:pt-0 mx-1 md:mx-0">
                    <span className="text-sm font-semibold uppercase text-gray-800 dark:text-gray-200">
                      Customer stories
                    </span>

                    <a
                      className="group mt-2 p-3 flex gap-x-5 items-center rounded-xl hover:bg-gray-100 dark:hover:bg-slate-500/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600"
                      href="#"
                    >
                   img
                      <div className="grow">
                        <p className="text-sm text-gray-800 dark:text-slate-400">
                          Preline Projects has proved to be most efficient cloud
                          based project tracking and bug tracking tool.
                        </p>
                        <p className="mt-3 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-400 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600">
                          Learn more
                          <svg
                            className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1"
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
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}

            <RightSide session={session} />
          </div>
        </div>
      </div>
    </>
  );
}
