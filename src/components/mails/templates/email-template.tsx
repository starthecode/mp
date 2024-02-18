import { EmailHelpParams } from '@/types';
import Image from 'next/image';
import * as React from 'react';

interface EmailTemplateProps {
  data: EmailHelpParams;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  data,
}) => (
  <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
    <main className="mt-8">
      <h2 className="text-gray-700 dark:text-gray-200">Hi Admin,</h2>

      <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
        Got email from -<span className="font-semibold ">{data?.email}</span>.
      </p>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        <b>Subject -</b> <br />
        {data?.subject}
      </p>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        <b>Message -</b> <br />
        {data?.message}
      </p>
    </main>
  </section>
);
