'use server';

import { CreateUserParams, UpdateUserAccount, UpdateUserParams } from '@/types';

import { revalidatePath } from 'next/cache';
import prisma from '../prismadb';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

//get all Users

export const getAllUsers = async ({ limit, page }: any) => {
  try {
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,

        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({}),
    ]);

    return {
      pagination: {
        total: count,
      },
      data: users,
    };
  } catch (error) {
    console.error('Error:', error);
  }
};

//get User by ID
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        image: true,
        roles: true,
      },
    });

    if (!user) {
      let error_response = {
        status: 'fail',
        message: 'No data Found',
      };
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

// //Create New User
// export const createUser = async (user: CreateUserParams) => {
//   try {
//     await connectToDatabase();
//     const newUser = await User.create(user);
//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error) {
//     handleError(error);
//   }
// };

//Update user details
export async function updateUser({ data, id }: UpdateUserParams) {
  const rolesValues = data.selectedOptions.map((option) => option.value);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: { roles: rolesValues },
    });

    if (!updatedUser) throw new Error('User update failed');
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}

//
export async function updateUserByAccount({ data }: UpdateUserAccount) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: data?.email,
      },
      data: { username: data.username },
    });

    if (!updatedUser) throw new Error('User update failed');
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const errorResponse = {
        error: `'prisma_error:' ${e.message}`,
      };
      return JSON.parse(JSON.stringify(errorResponse));
    }
    return JSON.parse(JSON.stringify({ error: true }));
  }
}

// //Delete user with events
// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId });

//     if (!userToDelete) {
//       throw new Error('User not found');
//     }

//     // Unlink relationships
//     await Promise.all([
//       // Update the 'events' collection to remove references to the user
//       Event.updateMany(
//         { _id: { $in: userToDelete.events } },
//         { $pull: { organizer: userToDelete._id } }
//       ),

//       // Update the 'orders' collection to remove references to the user
//       Order.updateMany(
//         { _id: { $in: userToDelete.orders } },
//         { $unset: { buyer: 1 } }
//       ),
//     ]);

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath('/');

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }
