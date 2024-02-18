'use server';

import { CreateOrderParams, UpdateOrderParams } from '@/types';

import prisma from '../prismadb';

export const createOrder = async (order: CreateOrderParams) => {
  try {
    const newOrder = await prisma.order.create({ data: order });
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (
  orderId: string,
  orderUpdation: UpdateOrderParams
) => {
  try {
    const newOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: orderUpdation,
    });
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
};

// export const getAllOrders = async () => {
//   try {
//     const orderDetails = await prisma.order.findMany({
//       include: {
//         product: true,
//         user: true,
//       },
//     });

//     return JSON.parse(JSON.stringify(orderDetails));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllOrders = async ({ limit, page }: any) => {
  try {
    const [orders, count] = await prisma.$transaction([
      prisma.order.findMany({
        skip: (page - 1) * limit,
        take: limit,

        orderBy: { createdAt: 'desc' },
        include: {
          product: true,
          user: true,
        },
      }),
      prisma.order.count(),
    ]);

    return {
      pagination: {
        total: count,
      },
      data: orders,
    };
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getOrder = async (order: CreateOrderParams) => {
  try {
    const orderDetails = await prisma.order.findFirst({
      where: { productId: order.productId, userId: order.userId },
      select: {
        id: true,
        userId: true,
        productId: true,
        transactionId: true,
        status: true,
        // Add any other fields you want to update here
      },
    });

    return JSON.parse(JSON.stringify(orderDetails));
  } catch (error) {
    console.log(error);
  }
};

export const getDownloadsByUserId = async (userId: string) => {
  try {
    const orderDetails = await prisma.order.findMany({
      where: {
        userId: userId,
        status: 'complete',
      },

      include: {
        product: userId ? true : false,
      },
    });

    return JSON.parse(JSON.stringify(orderDetails));
  } catch (error) {
    console.log(error);
  }
};

//get single download order details
export const getDownloadById = async (id: string) => {
  try {
    const orderDetails = await prisma.order.findFirst({
      where: { id },
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

export const getOrderDetailsById = async (id: string) => {
  try {
    const orderDetails = await prisma.order.findFirst({
      where: { transactionId: id },
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
