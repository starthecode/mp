import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder, getOrder } from '@/libs/actions/order.action';

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let stripeOrder;

  try {
    stripeOrder = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  // Get the ID and type
  const orderType = stripeOrder.type;

  // CREATE
  if (orderType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = stripeOrder.data.object;

    const order = {
      transactionId: id,
      productId: metadata?.productId || '',
      userId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  return new Response('', { status: 200 });
}
