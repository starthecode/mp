import ProductForm from '@/components/products/ProductForm';
import ProductSidebar from '@/components/products/ProductSidebar';
import React from 'react';

export default function AddProduct() {
  const product: any = [];
  return <ProductForm type="Add" product={product} />;
}
