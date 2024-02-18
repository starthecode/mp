'use client';
import { getOrderDetailsById } from '@/libs/actions/order.action';
import { SearchParamProps } from '@/types';
import Link from 'next/link';
import React from 'react';
import { formatDate } from '@/libs/utils';
import DownloadButton from '@/components/DownloadButton';
import { redirect } from 'next/navigation';
export default function SuccessPage({ params: { id } }: SearchParamProps) {
  const [invoiceDetails, setInvoiceDetails] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const details = await getOrderDetailsById(id);
        details && setInvoiceDetails(details);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
        // Redirect to home or show error message as per your requirement
        redirect('/');
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  if (!invoiceDetails || !invoiceDetails.transactionId) {
    return 'Loading...'; // or show an error message
  }

  return (
    <div className="container mt-44">
      <div className="w-full h-screen relative flex justify-center">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex justify-center mb-5">
            <Link
              className="bg-transparent border border-violet-400 px-2 py-1 rounded-full inline-flex items-center gap-x-1 text-sm text-violet-600 hover:text-violet-200 focus:outline-none focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500 dark:focus:text-blue-500"
              href="/account?tab=downloads"
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              My Downloads
            </Link>
          </div>
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-gray-800">
            <div className="relative overflow-hidden min-h-[8rem] bg-violet-600 text-center rounded-t-xl">
              <figure className="absolute inset-x-0 bottom-0 -mb-px">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1920 100.1"
                >
                  <path
                    fill="currentColor"
                    className="fill-white dark:fill-gray-800"
                    d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                  ></path>
                </svg>
              </figure>
            </div>

            <div className="relative z-10 -mt-12">
              <span className="mx-auto flex justify-center items-center w-[62px] h-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                <svg
                  className="flex-shrink-0 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                </svg>
              </span>
            </div>

            <div className="p-4 sm:p-7 overflow-y-auto">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {invoiceDetails?.product?.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Invoice #{invoiceDetails?.id}
                </p>
              </div>

              <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div>
                  <span className="block text-xs uppercase text-gray-500">
                    Amount paid:
                  </span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    ${invoiceDetails?.totalAmount}
                  </span>
                </div>

                <div>
                  <span className="block text-xs uppercase text-gray-500">
                    Date paid:
                  </span>
                  <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    {formatDate(invoiceDetails?.createdAt)}
                  </span>
                </div>

                <div>
                  <span className="block text-xs uppercase text-gray-500">
                    Payment method:
                  </span>
                  <div className="flex items-center gap-x-2">
                    <svg
                      className="w-5 h-5"
                      width="400"
                      height="248"
                      viewBox="0 0 400 248"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0)">
                        <path
                          d="M254 220.8H146V26.4H254V220.8Z"
                          fill="#FF5F00"
                        />
                        <path
                          d="M152.8 123.6C152.8 84.2 171.2 49 200 26.4C178.2 9.2 151.4 0 123.6 0C55.4 0 0 55.4 0 123.6C0 191.8 55.4 247.2 123.6 247.2C151.4 247.2 178.2 238 200 220.8C171.2 198.2 152.8 163 152.8 123.6Z"
                          fill="#EB001B"
                        />
                        <path
                          d="M400 123.6C400 191.8 344.6 247.2 276.4 247.2C248.6 247.2 221.8 238 200 220.8C228.8 198.2 247.2 163 247.2 123.6C247.2 84.2 228.8 49 200 26.4C221.8 9.2 248.6 0 276.4 0C344.6 0 400 55.4 400 123.6Z"
                          fill="#F79E1B"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="400" height="247.2" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                      •••• 4242
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-10">
                <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">
                  Summary
                </h4>

                <ul className="mt-3 flex flex-col">
                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Payment to Front</span>
                      <span>${invoiceDetails?.totalAmount}</span>
                    </div>
                  </li>

                  <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-800 dark:border-gray-700 dark:text-gray-200">
                    <div className="flex items-center justify-between w-full">
                      <span>Amount paid</span>
                      <span>${invoiceDetails?.totalAmount}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-5 flex justify-center gap-x-2">
                <DownloadButton dUrl={invoiceDetails?.product?.downloadLink} />
              </div>

              <div className="mt-5 sm:mt-10">
                <p className="text-sm text-gray-500">
                  If you have any questions, please mail at -{' '}
                  <span className="inline-flex items-center text-xs gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
                    help@experimentalapp.com
                  </span>{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
