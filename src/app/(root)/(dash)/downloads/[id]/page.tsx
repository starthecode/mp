import DownloadButton from '@/components/DownloadButton';
import { getDownloadById } from '@/libs/actions/order.action';
import { formatDate } from '@/libs/utils';
import { SearchParamProps } from '@/types';
import React from 'react';

export default async function DownloadPage({
  params: { id },
}: SearchParamProps) {
  const downloadDetails = await getDownloadById(id);

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {downloadDetails.product.title}
          </h2>
        </div>

        <div className="inline-flex gap-x-2">
          <DownloadButton dUrl={downloadDetails?.product?.downloadLink} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="grid space-y-3">
            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Billed to:
              </dt>
              <dd className="text-gray-800 dark:text-gray-200">
                <a
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  {downloadDetails?.user?.email}
                </a>
              </dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Billing details:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                <span className="block font-semibold">Sara Williams</span>
                <address className="not-italic font-normal">
                  280 Suzanne Throughway,
                  <br />
                  Breannabury, OR 45801,
                  <br />
                  United States
                  <br />
                </address>
              </dd>
            </dl>
          </div>
        </div>

        <div>
          <div className="grid space-y-3">
            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Invoice number:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200 uppercase">
                {downloadDetails?.id}
              </dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Currency:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                USD - US Dollar
              </dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Date:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                {formatDate(downloadDetails.createdAt)}
              </dd>
            </dl>

            <dl className="grid sm:flex gap-x-3 text-sm">
              <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                Billing method:
              </dt>
              <dd className="font-medium text-gray-800 dark:text-gray-200">
                Card
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
        <div className="hidden sm:grid sm:grid-cols-5">
          <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
            Item
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">
            Qty
          </div>
          <div className="text-start text-xs font-medium text-gray-500 uppercase">
            Item Type
          </div>
          <div className="text-end text-xs font-medium text-gray-500 uppercase">
            Amount
          </div>
        </div>

        <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          <div className="col-span-full sm:col-span-2">
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item
            </h5>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {downloadDetails?.product?.title}
            </p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Qty
            </h5>
            <p className="text-gray-800 dark:text-gray-200">1</p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Item Type
            </h5>
            <p className="text-gray-800 dark:text-gray-200">
              {downloadDetails?.totalAmount === 'free' ? 'Free' : 'Paid'}
            </p>
          </div>
          <div>
            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
              Amount
            </h5>
            <p className="sm:text-end text-gray-800 dark:text-gray-200">
              {downloadDetails?.totalAmount === 'free'
                ? '$0'
                : '$' + downloadDetails?.totalAmount}
            </p>
          </div>
        </div>

        <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

        <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
      </div>

      <div className="mt-8 flex sm:justify-end">
        <div className="w-full max-w-2xl sm:text-end space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Subotal:</dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                {downloadDetails?.totalAmount === 'free'
                  ? '$0'
                  : '$' + downloadDetails?.totalAmount}
              </dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Total:</dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                {downloadDetails?.totalAmount === 'free'
                  ? '$0'
                  : '$' + downloadDetails?.totalAmount}
              </dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500">Amount paid:</dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-gray-200">
                {downloadDetails?.totalAmount === 'free'
                  ? '$0'
                  : '$' + downloadDetails?.totalAmount}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
