'use server';
import prisma from '../prismadb';

//get all Users
export const getSearch = async (searchTerm: string, categoryId: string) => {
  const results = await prisma.product.findMany({
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive',
      },
      ...(categoryId && { categoryId: categoryId }),
    },
    select: {
      id: true,
      title: true,
      desc: true,
      imageUrl: true,
      isFree: true,
      price: true,
      createdAt: true,
    },
  });

  return results;
};
