import { IProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ItemsProps = {
  productsData: IProduct;
  // emptyTitle: string;
  // emptyStateSubtext: string;
  // limit: number;
  // page: number | string;
  // totalPages?: number;
  // collectionType?: 'Events_organized' | 'My_tickets' | 'All_Events';
  // urlParamName?: string;
};

export default function Item({ productsData }: ItemsProps) {
  // Create a map to store products based on their category ID
  const productsByCategory: Record<string, IProduct[]> = {};

  // Populate the map
  productsData.forEach((product: IProduct) => {
    const categoryId = product?.category?.id;

    if (categoryId) {
      if (!productsByCategory[categoryId]) {
        productsByCategory[categoryId] = [];
      }

      productsByCategory[categoryId].push(product);
    }
  });

  return (
    <>
      {Object.keys(productsByCategory).map((categoryId) => (
        <div
          key={categoryId}
          className="text-start grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 xl:gap-2"
        >
          {/* Display category name if needed */}
          <h2 className="text-gray-800 capitalize hover:text-gray-600 text-lg font-semibold dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            {productsByCategory[categoryId][0]?.category?.name}
          </h2>
          <div className="text-start grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
            {productsByCategory[categoryId].map((product) => (
              <div key={product.id}>
                {/* Your existing card structure goes here */}
                <Link
                  href={`/shop/product/${product?.id}`}
                  className="relative rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-blue-600 before:hover:shadow-lg dark:bg-[#151c2f] dark:before:border-gray-700 dark:before:hover:border-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <div className="relative pt-[50%]">
                    <Image
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fill
                      className="w-auto h-auto absolute top-0 start-0 object-cover rounded-t-xl dark:hidden"
                      src={`/assets/product/images/${product?.imageUrl}`}
                      alt={product?.title}
                    />
                  </div>
                  <div className="bg-white py-3.5 px-4 rounded-b-xl dark:bg-slate-900">
                    <h3 className="text-sm text-gray-900 font-medium dark:text-white">
                      {product?.title}
                    </h3>
                    {/* Category Name */}
                    <p className="mt-0.5 text-sm text-gray-400 dark:text-gray-500">
                      {product?.category?.name}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
