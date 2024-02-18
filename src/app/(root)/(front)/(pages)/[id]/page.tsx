import Item from '@/components/Cards/Item';
import { SearchParamProps } from '@/types';
import React from 'react';

export default function SinglePage(searchParams: SearchParamProps) {
  return (
    <>
      <Item categoryName={searchParams?.params?.id} />
    </>
  );
}
