import React from 'react';
import Loader from '../Loader';
import Image from 'next/image';
import Link from 'next/link';

const limit = 4;

export default function ShopCards({
  products,
  handleNextPage,
  handlePrevPage,
  page,
  countIndex,
  loading,
  categoryName,
}: any) {
  return (
    <section>
      <div className="flex justify-between items-center mt-10 mb-5 px-8">
        <div className="w-full flex">
          <h2 className="text-lg font-semibold">Latest Downloads</h2>
        </div>
        {/* Paginations */}
        <div className="flex gap-2 w-full justify-end">
          <div className="div">
            <button
              className="flex gap-1 w-fit items-center border border-slate-300 rounded-full px-2 py-1 text-sm font-medium"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="w-4 h-4 rotate-180"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />{' '}
              </svg>
              Previous
            </button>
          </div>

          <div>
            <button
              disabled={page * limit >= (countIndex ?? Infinity)}
              onClick={handleNextPage}
              className="flex gap-1 w-fit items-center border border-slate-300 rounded-full px-2 py-1 text-sm font-medium"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="w-4 h-4"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />{' '}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center loader_css">
          <Loader />
        </div>
      ) : (
        <div className="text-start grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6 pb-4">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div
                key={product.id}
                className="relative rounded-xl bg-slate-100 shadow-sm border border-slate-200/50"
              >
                {/* Your existing card structure goes here */}
                <div>
                  <div className="relative pt-[50%] overflow-hidden">
                    <span className="absolute z-10 top-1 right-2 bg-teal-600 text-white text-sm  px-2 py-1 rounded-xl">
                      {product?.isFree ? 'Free' : '$' + product?.price}
                    </span>
                    <Image
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fill
                      className="w-auto h-auto p-4 bg-slate-100 absolute top-0 start-0 object-cover rounded-t-xl dark:hidden"
                      src={`/assets/product/images/${product?.imageUrl}`}
                      alt={product?.title}
                    />
                  </div>
                  <div className="flex justify-between py-1 pb-3 px-4 rounded-b-xl bg-slate-100/70">
                    <div>
                      <h3 className="text-sm text-gray-900 font-medium dark:text-white">
                        {product?.title.length > 35
                          ? `${product?.title.substring(0, 30)}...`
                          : product?.title}
                      </h3>
                      {/* Category Name */}
                      <p className="mt-0.5 text-sm text-gray-400 dark:text-gray-500">
                        {product?.category?.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Link
                        href={`/shop/product/${product.id}`}
                        className="text-xs bg-blue-600 rounded-xl px-3 py-1 text-white"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="flex w-full h-40 text-center justify-center items-center">
              No Products Found in -{' '}
              <b className="capitalize"> {categoryName}</b>
            </span>
          )}
        </div>
      )}
    </section>
  );
}
