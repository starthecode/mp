'use client';
import { getCategories } from '@/libs/actions/category.action';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Category {
  id: string;
  name: string;
}

export default function SearchBarContainer() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [categories, setCategories] = React.useState<Category[]>([]);

  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Build the search query based on input and selected category
    const searchQuery = selectedCategory ? `category=${selectedCategory}&` : '';
    const finalQuery = `${searchQuery}s=${searchTerm}`;

    // Redirect to the search page with the constructed query
    router.push(`/search?${finalQuery}`);
  };

  // Fetch categories on component mount
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories: Array<{ id: string; name: string }> =
          await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        // Handle errors gracefully
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section className="flex w-full justify-center items-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex w-auto bg-white shadow rounded-lg justify-center items-center px-5 py-4"
          role="search"
        >
          <div className="">
            <input
              type="search"
              placeholder="Search anything..."
              name="s"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
            />
          </div>
          <div className="select_mate" data-mate-select="active">
            <select
              className="text-sm"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category state
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option
                  className="capitalize"
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}
