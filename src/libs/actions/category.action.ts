'use server';

import { CreateCategoryParams } from '@/types';
import prisma from '../prismadb';

//Create Category
export const addCategory = async ({ data }: any) => {
  try {
    const newCategory = await prisma.category.create({ data });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
    // return new Response(
    //   JSON.stringify({ message: 'Error creating category' }),
    //   {
    //     status: 500,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
  }
};

//Get All Category
export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    throw error;
  }
};
