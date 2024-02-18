'use server';

import { CheckoutOrderParams, CreateOrderParams } from '@/types';
import prisma from '../prismadb';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const orderData: CreateOrderParams = {
    userId: order.userId,
    productId: order.productId,
    totalAmount: order?.price ? order?.price : 'free',
  };

  const newOrder = await prisma.order.create({ data: orderData });

  if (newOrder) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = order.isFree ? 0 : Number(order.price) * 100;

    const session = await stripe.checkout.sessions.create({
      customer_email: order.userEmail,

      billing_address_collection: 'required',

      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price as number,

            product_data: {
              name: order.productTitle,
              images: [
                `${process.env.NEXT_PUBLIC_SERVER_URL}${
                  'assets/product/images/' + order.productImg
                }`,
              ],
            },
          },

          quantity: 1,
        },
      ],
      metadata: {
        orderId: newOrder.id,
        productId: order.productId,
        buyerId: order.userId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?canceled=true`,
    });

    redirect(session.url!);
  } else {
    console.log('Something went wrong');
  }
};
