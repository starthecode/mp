'use server';

import { AddProductParams } from '@/types';
import prisma from '../prismadb';

export const createProduct = async (data: AddProductParams) => {
  try {
    // const organizer = await prisma.findById(userId);
    // if (!organizer) {
    //   throw new Error('Organizer not found');
    // }
    const newProduct = await prisma.product.create(data);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getProducts = async (
  postsPerPage: number,
  categoryId: string,
  page: any
) => {
  try {
    const [products, count] = await prisma.$transaction([
      prisma.product.findMany({
        where: {
          categoryId,
        },

        skip: (page - 1) * postsPerPage,
        take: postsPerPage,

        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          imageUrl: true,
          isFree: true,
          price: true,
          category: true,
        },
      }),
      prisma.product.count({
        where: {
          categoryId,
        },
      }),
    ]);

    return {
      pagination: {
        total: count,
      },
      data: products,
    };
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
};
