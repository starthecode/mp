import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Tabs from '@/components/tabs';
import { getUserById } from '@/libs/actions/user.actions';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const userId = session?.user?.id as string;

  const data = await getUserById(userId);

  return <Tabs data={data} userId={userId} />;
}
