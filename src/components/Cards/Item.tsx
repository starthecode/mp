'use client';
import { getProducts } from '@/libs/actions/product.action';
import React from 'react';
import { getCategory } from '@/libs/actions/category.action';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProductsTable from '../products/ProductsTable';
import ShopCards from '../products/ShopCards';

export default function Item({ categoryName }: string | any) {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState<any>([]);
  const [countIndex, setCountIndex] = React.useState<number>();

  const { data: session } = useSession();

  const pathname = usePathname();

  let postsPerPage = 0;
  if (pathname === '/products') {
    postsPerPage = 10;
  } else {
    postsPerPage = 4;
  }
  React.useEffect(() => {
    const fetchProducts = async () => {
      let categoryId = null;
      setLoading(true);
      try {
        if (categoryName) {
          categoryId = await getCategory(categoryName);
        }

        const fetchedProducts = await getProducts(
          postsPerPage,
          categoryId?.id,
          page
        );

        if (fetchedProducts) {
          setAllProducts(fetchedProducts?.data);
          setCountIndex(fetchedProducts?.pagination.total);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [postsPerPage, categoryName, page]);
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      {pathname === '/products' && session?.user?.roles[1] === 'admin' ? (
        <ProductsTable
          products={allProducts}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page={page}
          countIndex={countIndex}
          loading={loading}
          categoryName={categoryName}
        />
      ) : (
        <ShopCards
          products={allProducts}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page={page}
          countIndex={countIndex}
          loading={loading}
          categoryName={categoryName}
        />
      )}
    </>
  );
}
