import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { IProduct } from '@/types';

import { genDownloadUrl, setPathName } from '@/libs/utils';
import { checkoutOrder } from '@/libs/actions/checkout.action';

export default function Checkout({
  pathName,
  transactionId,
  status,
  product,
  userId,
  userEmail,
}: {
  pathName: string;
  transactionId: string | undefined | null;
  status: string;
  product: IProduct;
  userId: string;
  userEmail: string;
}) {
  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [clientSecret, setClientSecret] = React.useState('');

  const buttonText =
    transactionId && status == 'complete' ? 'Download' : 'Buy & Download';

  const onCheckout = async () => {
    if (transactionId && status == 'complete') {
      genDownloadUrl(product?.downloadLink);
    } else {
      setPathName(pathName); //set pathname in localstorage
      const order = {
        productTitle: product.title,
        productId: product.id,
        price: product?.price as string,
        isFree: product.isFree,
        userId,
        userEmail: userEmail,
        productImg: product?.imageUrl,
      };
      await checkoutOrder(order);
    }
  };

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <>
      <form action={onCheckout} method="post">
        <button
          className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          type="submit"
          role="link"
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
          {buttonText}
        </button>
      </form>
    </>
  );
}
