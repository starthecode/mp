'use client';
import React from 'react';
import Select, { Options } from 'react-select';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userDefaultValues } from '@/constants';
import { userFormSchema } from '@/libs/validator';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';
import toast from 'react-hot-toast';
import { updateUser } from '@/libs/actions/user.actions';
import MultiSelect from '../MultiSelect';

interface FormData {
  selectedOptions: string[];
}

const options = [
  {
    value: 'user',
    label: 'User',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
];

type UserFormProps = {
  type: 'Add' | 'Update';
  userId: string;
  user: IUser;
};

type UserData = z.infer<typeof userFormSchema>;

export default function UserForm({ type, user, userId }: UserFormProps) {
  const router = useRouter();

  const initialValues =
    user && type === 'Update'
      ? {
          ...user,
        }
      : userDefaultValues;
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialValues,
  });

  const onInvalid = (errors: any) => console.error(errors);

  async function onSubmit(data: FormData) {
    //Create
    if (type === 'Update') {
      const updatedUser = await updateUser({
        id: userId,
        data,
      });

      if (updatedUser) {
        toast.success('User Updated');
        reset();
        router.push('/users/');
      } else {
        toast.error('Something went wrong');
      }
    }
  }

  return (
    <>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6"
          encType="multipart/form-data"
        >
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-4">
              <div className="space-y-5 lg:space-y-8">
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">{user?.email}</div>
                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-category"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Role
                      </label>
                      <MultiSelect
                        name="selectedOptions"
                        options={options}
                        control={control}
                      />
                      {errors.selectedOptions && (
                        <span className="error text-red-600 pt-1 flex">
                          {errors.selectedOptions.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center gap-x-2">
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
