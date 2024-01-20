'use server';

import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from '@/types';
import { redirect } from 'next/navigation';
import prisma from '../prismadb';
import Stripe from 'stripe';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price as number,
            product_data: {
              name: order.productTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: order.productId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?canceled=true`,
    });
    redirect(session.url!);
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (
  id: string,
  numOfDownload: number,
  order: CreateOrderParams
) => {
  console.log(order);

  return false;

  try {
    if (!id) {
      const newOrder = await prisma.order.create({ data: order });

      return JSON.parse(JSON.stringify(newOrder));
    } else {
      const updatedOrder = await prisma.order.update({
        where: { id },

        data: {
          numOfDownload,
        },
      });

      return JSON.parse(JSON.stringify(updatedOrder));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async () => {
  try {
    const orderDetails = await prisma.order.findMany({
      include: {
        product: true,
        user: true,
      },
    });

    return JSON.parse(JSON.stringify(orderDetails));
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (productId: string) => {
  try {
    const orderDetails = await prisma.order.findFirst({
      where: { productId },
      select: {
        id: true,
        numOfDownload: true,
        // Add any other fields you want to update here
      },
    });

    return JSON.parse(JSON.stringify(orderDetails));
  } catch (error) {
    console.log(error);
  }
};

// GET ORDERS BY EVENT
// export async function getOrdersByEvent({
//   searchString,
//   eventId,
// }: GetOrdersByEventParams) {
//   try {
//     await connectToDatabase();

//     if (!eventId) throw new Error('Event ID is required');
//     const eventObjectId = new ObjectId(eventId);

//     const orders = await Order.aggregate([
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'buyer',
//           foreignField: '_id',
//           as: 'buyer',
//         },
//       },
//       {
//         $unwind: '$buyer',
//       },
//       {
//         $lookup: {
//           from: 'events',
//           localField: 'event',
//           foreignField: '_id',
//           as: 'event',
//         },
//       },
//       {
//         $unwind: '$event',
//       },
//       {
//         $project: {
//           _id: 1,
//           totalAmount: 1,
//           createdAt: 1,
//           eventTitle: '$event.title',
//           eventId: '$event._id',
//           buyer: {
//             $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
//           },
//         },
//       },
//       {
//         $match: {
//           $and: [
//             { eventId: eventObjectId },
//             { buyer: { $regex: RegExp(searchString, 'i') } },
//           ],
//         },
//       },
//     ]);

//     return JSON.parse(JSON.stringify(orders));
//   } catch (error) {
//     console.log(error);
//   }
// }

// // GET ORDERS BY USER
// export async function getOrdersByUser({
//   userId,
//   limit = 3,
//   page,
// }: GetOrdersByUserParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = { buyer: userId };

//     const orders = await Order.distinct('event._id')
//       .find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)
//       .populate({
//         path: 'event',
//         model: Event,
//         populate: {
//           path: 'organizer',
//           model: User,
//           select: '_id name',
//         },
//       });

//     const ordersCount = await Order.distinct('event._id').countDocuments(
//       conditions
//     );

//     return {
//       data: JSON.parse(JSON.stringify(orders)),
//       totalPages: Math.ceil(ordersCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
