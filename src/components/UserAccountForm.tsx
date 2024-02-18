'use client';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { userFormSchema } from '@/libs/validator';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import { updateUserByAccount } from '@/libs/actions/user.actions';

//Zod Validator
type UserData = z.infer<typeof userFormSchema>;

export default function UserAccountForm({ data }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      username: data?.username || '',
    },
  });

  const onInvalid = (errors: any) => console.error(errors);

  async function onSubmit(data: UserData) {
    const updatedUser = await updateUserByAccount({
      data,
    });

    if (updatedUser && !updatedUser.error) {
      toast.success('Account Details Updated');
      router.refresh();
    } else if (updatedUser.error) {
      toast.error('Username not available');
    } else {
      toast.error('Something went wrong');
    }
  }

  return (
    <>
      <div className="">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Account Details
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6"
          encType="multipart/form-data"
        >
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-4">
              <div className="space-y-5 lg:space-y-8">
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="flex gap-4 w-full">
                    <div className="space-y-2 w-full flex flex-col">
                      <label
                        htmlFor="af-submit-app-project-name"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Full Name
                      </label>
                      <input
                        {...register('name', { required: true })}
                        placeholder="Your fullname"
                        disabled
                        name="name"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div className="space-y-2 w-full flex flex-col">
                      <label
                        htmlFor="af-submit-project-url"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Email
                      </label>

                      <input
                        {...register('email', { required: true })}
                        disabled
                        name="email"
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="https://example.so"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-full flex flex-col max-w-60">
                    <label
                      htmlFor="af-submit-project-url"
                      className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                    >
                      Username
                    </label>

                    <input
                      {...register('username', { required: true })}
                      name="username"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="https://example.so"
                    />
                    {errors?.username && (
                      <p className="text-red-600 text-sm">
                        {errors?.username?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-5 flex justify-start gap-x-2">
                    <button
                      type="submit"
                      className=" mt-5 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
