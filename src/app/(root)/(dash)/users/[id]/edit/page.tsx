import UserForm from '@/components/Users/UserForm';
import { getUserById } from '@/libs/actions/user.actions';
import { SearchParamProps } from '@/types';
import React from 'react';

export default async function UserEdit({ params: { id } }: SearchParamProps) {
  const user = await getUserById(id);

  return <UserForm user={user} userId={id} type={'Update'} />;
}
