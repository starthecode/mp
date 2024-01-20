'use server';

import { CreateUserParams, UpdateUserParams } from '@/types';

import { revalidatePath } from 'next/cache';
import prisma from '../prismadb';
import { NextResponse } from 'next/server';

//get all Users
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      let error_response = {
        status: 'fail',
        message: 'No data Found',
      };
    }
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
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
        email: true,
        role: true,
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
