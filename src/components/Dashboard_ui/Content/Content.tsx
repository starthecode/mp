import { getAllCount } from '@/libs/actions/extra.actions';
import React from 'react';

export default async function Content() {
  const dataCount = await getAllCount();
  return (
    <section>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
            <div className="inline-flex justify-center items-center">
              <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                Total Orders
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-200">
                {dataCount?.ordersCount}
              </h3>
            </div>

            <dl className="flex justify-center items-center ">
              <dd className="text-center">
                <span
                  className={`text-sm font-semibold ${
                    dataCount?.newOrders && dataCount?.newOrders > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {dataCount?.newOrders} New
                </span>
                <span className="block text-sm text-gray-500">Today</span>
              </dd>
            </dl>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
            <div className="inline-flex justify-center items-center">
              <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                Total Products
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-200">
                {dataCount?.productsCount}
              </h3>
            </div>

            <dl className="flex justify-center items-center divide-x divide-gray-200 dark:divide-gray-700">
              <dd className="text-center">
                <span
                  className={`text-sm font-semibold ${
                    dataCount?.newProducts && dataCount?.newProducts > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {dataCount?.newProducts} New
                </span>
                <span className="block text-sm text-gray-500">Today</span>
              </dd>
            </dl>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
            <div className="inline-flex justify-center items-center">
              <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                Total Users
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-gray-200">
                {dataCount?.usersCount}
              </h3>
            </div>

            <dl className="flex justify-center items-center">
              <dd className="text-center">
                <span
                  className={`text-sm font-semibold ${
                    dataCount?.newUsers && dataCount?.newUsers > 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {dataCount?.newUsers} New
                </span>
                <span className="block text-sm text-gray-500">Today</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
