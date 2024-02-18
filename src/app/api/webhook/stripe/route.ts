import stripe from 'stripe';
import { NextResponse } from 'next/server';
import {
  createOrder,
  getOrder,
  updateOrder,
} from '@/libs/actions/order.action';
import { sendEmail } from '@/libs/actions/email.action';

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
    const type = 'NewOrder';
    const {
      id,
      amount_total,
      customer_details,
      metadata,
      status,
      created,
      payment_method_types,
    } = stripeOrder.data.object;

    const data = {
      orderId: metadata?.orderId,
      productId: metadata?.productId,
      invoiceDate: created,
      customerName: customer_details?.name,
      email: customer_details?.email,
      address: customer_details?.address as any,
      totalAmount: amount_total ? (amount_total / 100).toString() : 'Free',
      status: 'Paid',
      subject: 'Invoice Receipt',
      message: 'Your Download is Ready',
    };

    await sendEmail(type, data);

    const orderUpdation = {
      transactionId: id,
      productId: metadata?.productId || '',
      userId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      status: status as string,
    };

    const updateOrderData = await updateOrder(
      metadata?.orderId as string,
      orderUpdation
    );

    return NextResponse.json({ message: 'OK', order: updateOrderData });
  }

  return new Response('', { status: 200 });
}
