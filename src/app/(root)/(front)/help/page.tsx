import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import React from 'react';

import EmailForm from '@/components/mails/EmailForm';
//Zod Validator

export default async function HelpPage() {
  const session = await getServerSession(authOptions);

  return <EmailForm session={session} />;
}
