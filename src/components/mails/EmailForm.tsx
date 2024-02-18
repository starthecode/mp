'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { emailSchema } from '@/libs/validator';
import { sendHelpEmail } from '@/libs/actions/email.action';
import Loader from '../Loader';

type EmailData = z.infer<typeof emailSchema>;

export default function EmailForm({ session }: any) {
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: session?.user?.email || '',
      subject: '',
      message: '',
    },
  });

  const onInvalid = (errors: any) => console.error(errors);

  async function onSubmit(data: EmailData) {
    setIsLoading(true);

    const mailSent = await sendHelpEmail(data);

    if (mailSent) {
      reset();
      toast.success('Mail sent successully');
      setIsLoading(false);
    } else {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  }

  return (
    <section className="block mt-40">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-5xl font-semibold mb-2">How can we help?</h2>
        <p className="font-medium text-slate-400 text-md">
          If you have any question, issue, reach out to us for help
        </p>
      </div>

      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="space-y-8"
        >
          <div className="space-y-2 w-full flex flex-col">
            <label
              htmlFor="af-submit-app-project-name"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
            >
              Email
            </label>
            <input
              {...register('email', { required: true })}
              placeholder="Your email"
              name="email"
              className="py-2 px-3 pe-11 block w-full bg-gray-50 border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
            {errors?.email && (
              <p className="text-red-600 text-sm">{errors?.email?.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full flex flex-col">
            <label
              htmlFor="af-submit-app-project-name"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
            >
              Subject
            </label>
            <input
              {...register('subject', { required: true })}
              placeholder="Subject"
              name="subject"
              className="py-2 px-3 pe-11 block w-full bg-gray-50 border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            />
            {errors?.subject && (
              <p className="text-red-600 text-sm">{errors?.subject?.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full flex flex-col">
            <label
              htmlFor="af-submit-app-project-name"
              className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
            >
              Message
            </label>
            <textarea
              {...register('message', { required: true })}
              name="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
            {errors?.message && (
              <p className="text-red-600 text-sm">{errors?.message?.message}</p>
            )}
          </div>

          <button
            disabled={isLoading && true}
            type="submit"
            className="flex gap-1 items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-violet-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message{' '}
            {!isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                ></path>
              </svg>
            ) : (
              <div className="svg_css">
                <Loader />
              </div>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
