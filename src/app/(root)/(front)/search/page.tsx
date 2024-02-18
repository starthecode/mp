'use client';
import { getSearch } from '@/libs/actions/search.action';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type searchProps = {
  id: string;
  title: string;
  desc: string;
  imageUrl: string;
  isFree: boolean;
  price: string | null;
  createdAt: Date;
};

export default function Search() {
  const [searchResults, setSearchResults] = React.useState<searchProps[]>([]);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    // Extract search parameters from the URL
    const searchTerm = searchParams.get('s');
    const category = searchParams.get('category');

    // Fetch search results based on the parameters
    const fetchSearchResults = async () => {
      const results = await getSearch(searchTerm as string, category as string); // Implement this function

      setSearchResults(results);
    };

    fetchSearchResults();
  }, [searchParams]);

  return (
    <div className="w-full flex items-start flex-col justify-start">
      <h2 className="my-10 w-full text-left">
        Found - <b>{searchResults.length}</b> Response
      </h2>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 justify-start items-start">
          {searchResults.map((result) => (
            <div key={result.id}>
              {/* Your existing card structure goes here */}
              <Link
                href={`/shop/product/${result?.id}`}
                className="relative rounded-xl before:absolute before:inset-0 before:z-10 before:border before:border-gray-200 before:rounded-xl before:transition before:hover:border-2 before:hover:border-blue-600 before:hover:shadow-lg dark:bg-[#151c2f] dark:before:border-gray-700 dark:before:hover:border-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <div className="relative pt-[50%]">
                  <Image
                    sizes="(max-width: 768px) 100vw, 33vw"
                    fill
                    className="w-auto h-auto absolute top-0 start-0 object-cover rounded-t-xl dark:hidden"
                    src={`/assets/product/images/${result?.imageUrl}`}
                    alt={result?.title}
                  />
                </div>
                <div className="bg-white py-3.5 px-4 rounded-b-xl dark:bg-slate-900">
                  <h3 className="text-sm text-gray-900 font-medium dark:text-white">
                    {result?.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}
