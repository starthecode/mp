import { formatDate } from '@/libs/utils';
import { IProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NextPrevButtons from '../NextPrevButtons';
import Loader from '../Loader';

const limit = 10;

export default function ProductsTable({
  products,
  handleNextPage,
  handlePrevPage,
  page,
  countIndex,
  loading,
}: any) {
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
                      Products
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add products, edit and more.
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <Link
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="/products/add"
                      >
                        <svg
                          className="flex-shrink-0 w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Add product
                      </Link>
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                            Product Type
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Price
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Category
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
                      {products &&
                        products?.map((product: any, index: string) => (
                          <tr key={index}>
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
                                    src={`/assets/product/images/${product?.imageUrl}`}
                                    alt="Image"
                                  />
                                  <div className="grow">
                                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                      {product?.title}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="h-px w-72 whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                  {product?.isFree ? 'Free' : 'Paid'}
                                </span>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span
                                  className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium  rounded-full  ${
                                    product?.isFree
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500'
                                      : 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500 '
                                  }`}
                                >
                                  ${product?.price ? product?.price : '0'}
                                </span>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <div className="flex items-center gap-x-3">
                                  <span className="text-sm text-gray-500 capitalize">
                                    {product?.category?.name}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="text-sm text-gray-500">
                                  {formatDate(product?.createdAt)}
                                </span>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-1.5">
                                <a
                                  className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  href="#"
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
