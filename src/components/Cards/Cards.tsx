import React from 'react';
import Item from './Item';
import { getProducts } from '@/libs/actions/product.action';

export default async function Cards() {
  const productsData = await getProducts();
  return <Item productsData={productsData} />;
}
