import prisma from '../prismadb';

export const getAllCount = async () => {
  const today = new Date();
  const todaysDate = today.toISOString().slice(0, 10);

  try {
    const [orders, ordersCount, products, productsCount, users, usersCount] =
      await prisma.$transaction([
        prisma.order.count({
          where: {
            createdAt: {
              gte: new Date(todaysDate),
            },
          },
        }),
        prisma.order.count(),
        prisma.product.count({
          where: {
            createdAt: {
              gte: new Date(todaysDate),
            },
          },
        }),
        prisma.product.count(),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(todaysDate),
            },
          },
        }),
        prisma.user.count(),
      ]);

    return {
      newOrders: orders,
      ordersCount: ordersCount,
      newProducts: products,
      productsCount: productsCount,
      newUsers: users,
      usersCount: usersCount,
    };
  } catch (error) {
    console.error('Error:', error);
  }
};
