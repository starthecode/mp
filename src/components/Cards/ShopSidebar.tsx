'use client';
import { CreateOrderParams, IOrder, IProduct, productDetails } from '@/types';
import { useSession } from 'next-auth/react';

import React from 'react';
import LoginComponent from '../LoginComponent';
import { createOrder, getOrder } from '@/libs/actions/order.action';
import Checkout from '../Checkout';
import { genDownloadUrl } from '@/libs/utils';
import { usePathname } from 'next/navigation';

interface ShopSidebarProps {
  extraDetails: productDetails;
}

export default function ShopSidebar({ extraDetails }: ShopSidebarProps) {
  const [downloadStart, setDownloadStart] = React.useState<Boolean>(false);
  const [orderData, setOrderData] = React.useState<IProduct | null>(null);
  const pathName = usePathname();
  const { data: session } = useSession();

  const order: CreateOrderParams = {
    userId: session?.user.id || '',
    productId: extraDetails?.id,
    totalAmount: extraDetails?.price ? extraDetails?.price : 'free',
    status: extraDetails?.price ? '' : 'completed',
  };

  React.useEffect(() => {
    const fetchOrderData = async () => {
      if (session?.user?.id) {
        const data = await getOrder(order);
        setOrderData(data);
      }
    };

    fetchOrderData();

    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, extraDetails?.id]);

  async function handleOrder() {
    setDownloadStart(true);
    // const orderData = await getOrder(extraDetails?.id as string);
    if (
      orderData?.userId === session?.user.id &&
      orderData?.productId === extraDetails?.id
    ) {
      genDownloadUrl(extraDetails?.downloadLink);
      setDownloadStart(false);
    } else {
      try {
        const newOrder = await createOrder(order);
        if (newOrder) {
          genDownloadUrl(extraDetails?.downloadLink);
          setDownloadStart(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const downloadText = downloadStart ? 'Please Wait' : 'Download Free';

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
                  <Checkout
                    pathName={pathName}
                    transactionId={orderData?.transactionId}
                    status={orderData?.status}
                    product={extraDetails}
                    userId={session?.user?.id as string}
                    userEmail={session?.user?.email as string}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
