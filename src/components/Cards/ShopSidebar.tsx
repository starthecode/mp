'use client';
import { CreateOrderParams, IOrder, IProduct } from '@/types';
import { useSession } from 'next-auth/react';

import React from 'react';
import LoginComponent from '../LoginComponent';
import { createOrder, getOrder } from '@/libs/actions/order.action';
import Checkout from '../Checkout';

export default function ShopSidebar({ extraDetails }: IOrder) {
  const [downloadStart, setDownloadStart] = React.useState<Boolean>(false);
  const [orderDetails, setOrderdetails] = React.useState<{
    id: string;
    numOfDownload: number;
  }>({});
  const { data: session } = useSession();

  const order: CreateOrderParams = {
    userId: session?.user.id || '',
    productId: extraDetails?.id,
    totalAmount: extraDetails?.price ? extraDetails?.price : 'free',
    numOfDownload: 1,
  };

  // React.useEffect(() => {
  //   const getOrderdata = async () => {

  //   };

  //   getOrderdata();
  // }, [extraDetails?.id]);

  async function handleOrder() {
    setDownloadStart(true);
    const orderData = await getOrder(extraDetails?.id as any);
    let orderId = '';
    let updateDownloadNum = 0;
    if (orderData) {
      orderId = orderData?.id as string;

      updateDownloadNum = orderData?.numOfDownload + order.numOfDownload;
    }

    try {
      const newOrder = await createOrder(orderId, updateDownloadNum, order);
      if (newOrder) {
        const downloadLink = extraDetails?.downloadLink;
        if (downloadLink) {
          const anchor = document.createElement('a');
          anchor.href = downloadLink;
          anchor.download = ''; // Optional: set the default download filename
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }
        setDownloadStart(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const downloadText = downloadStart ? 'Please Wait' : 'Download Free';

  if (!session) {
    return;
  }

  return (
    <div className="lg:col-span-1 lg:w-full lg:h-full lg:bg-gradient-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-slate-800">
      <div className="sticky top-0 start-0 py-8 lg:ps-4">
        <div className="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8 dark:border-gray-700">
          <div className="group grow block">
            <p className="text-sm text-gray-500">Price</p>
            <h3 className="group-hover:text-gray-600 text-xl font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
              {extraDetails?.isFree ? 'Free' : `$${extraDetails?.price}`}
            </h3>
          </div>

          {!session ? (
            <span className="flex gap-2">
              Please, <LoginComponent /> &{' '}
              {extraDetails?.isFree ? 'download free' : 'Buy'}
            </span>
          ) : (
            <div className="grow">
              <div className="flex justify-end">
                {extraDetails?.isFree ? (
                  <button
                    onClick={handleOrder}
                    type="button"
                    className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    {downloadText}
                  </button>
                ) : (
                  <Checkout product={extraDetails} userId={session?.user?.id} />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <a className="group flex items-center gap-x-6" href="#">
            <div className="grow">
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                5 Reasons to Not start a UX Designer Career in 2022/2023
              </span>
            </div>

            <div className="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img
                className="w-full h-full absolute top-0 start-0 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt="Image Description"
              />
            </div>
          </a>

          <a className="group flex items-center gap-x-6" href="#">
            <div className="grow">
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                If your UX Portfolio has this 20% Well Done, it Will Give You an
                80% Result
              </span>
            </div>

            <div className="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img
                className="w-full h-full absolute top-0 start-0 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt="Image Description"
              />
            </div>
          </a>

          <a className="group flex items-center gap-x-6" href="#">
            <div className="grow">
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-500">
                7 Principles of Icon Design
              </span>
            </div>

            <div className="flex-shrink-0 relative rounded-lg overflow-hidden w-20 h-20">
              <img
                className="w-full h-full absolute top-0 start-0 object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt="Image Description"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
