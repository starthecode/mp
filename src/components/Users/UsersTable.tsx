'use client';
import React from 'react';
import { formatDate } from '@/libs/utils';
import NextPrevButtons from '../NextPrevButtons';
import Loader from '../Loader';
import { getAllUsers } from '@/libs/actions/user.actions';
import Image from 'next/image';

export default function UsersTable() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState<any>([]);
  const [countIndex, setCountIndex] = React.useState<number>();

  const limit = 10;

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await getAllUsers({
          limit,
          page,
        });

        if (fetchedOrders) {
          setAllUsers(fetchedOrders?.data);
          setCountIndex(fetchedOrders?.pagination.total);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, page]);
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <section>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Users
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add user, edit and more.
                    </p>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 relative overflow-hidden">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="ps-6 py-3 text-start">
                        <label
                          htmlFor="hs-at-with-checkboxes-main"
                          className="flex"
                        >
                          <input
                            type="checkbox"
                            className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            id="hs-at-with-checkboxes-main"
                          />
                          <span className="sr-only">Checkbox</span>
                        </label>
                      </th>

                      <th
                        scope="col"
                        className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                      >
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Name
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Roles
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Status
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Created
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  {loading ? (
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="h-px w-px whitespace-nowrap">
                          <span className="flex justify-center items-center loader_css my-10">
                            <Loader />
                          </span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {allUsers &&
                        allUsers?.map((user: any) => (
                          <tr key={user?.id}>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="ps-6 py-3">
                                <label
                                  htmlFor="hs-at-with-checkboxes-6"
                                  className="flex"
                                >
                                  <input
                                    type="checkbox"
                                    className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                    id="hs-at-with-checkboxes-6"
                                  />
                                  <span className="sr-only">Checkbox</span>
                                </label>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                <div className="flex items-center gap-x-3">
                                  <Image
                                    width={20}
                                    height={20}
                                    className="inline-block w-auto h-auto rounded-full bg-gray-300 p-1"
                                    src={user?.image}
                                    alt="Image Description"
                                  />
                                  <div className="grow">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                      {user?.name}
                                    </span>
                                    <span className="block text-sm text-gray-500">
                                      {user?.email}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="h-px w-72 whitespace-nowrap">
                              <div className="px-6 py-3 w-full flex gap-1">
                                {user?.roles &&
                                  user?.roles.map(
                                    (role: any, index: number) => (
                                      <span
                                        className="capitalize text-sm font-semibold text-gray-800 dark:text-gray-200"
                                        key={role}
                                      >
                                        {index === user?.roles.length - 1
                                          ? role
                                          : `${role}, `}
                                      </span>
                                    )
                                  )}
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                  </svg>
                                  Active
                                </span>
                              </div>
                            </td>

                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="text-sm text-gray-500">
                                  {formatDate(user?.createdAt)}
                                </span>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-1.5">
                                <a
                                  className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  href={`/users/${user?.id}`}
                                >
                                  Edit
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        6
                      </span>{' '}
                      results
                    </p>
                  </div>

                  <NextPrevButtons
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    page={page}
                    limit={limit}
                    countIndex={countIndex}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
