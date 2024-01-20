'use client';
import { addCategory, getCategories } from '@/libs/actions/category.action';
import React from 'react';
import toast from 'react-hot-toast';

type DropdownProps = {
  field?: any;
  control: any;
  setValue: any;
  onChangeHandler?: () => void;
};

export default function ProductSidebar({
  field,
  control,
  setValue,
}: DropdownProps) {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [newCategory, setNewCategory] = React.useState('');

  const handleSubmit = async () => {
    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const category = await addCategory({
        data: {
          name: newCategory.trim(),
        },
      });

      if (category) {
        resolve();
        setNewCategory('');
        setCategories((prevState) => [...prevState, category]);
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Creating Category..',
      success: 'Created',
      error: 'Try Different Category Name',
    });
  };

  React.useEffect(() => {
    const getCats = async () => {
      const categoryList = await getCategories();
      if (categoryList) {
        setCategories(categoryList as any[]);
      }
    };
    getCats();
  }, []);

  const handleCheckboxChange = (selectedCategoryId: string) => {
    setValue('categoryId', selectedCategoryId);
  };

  return (
    <>
      <div className="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8 dark:border-gray-700">
        <a className="group grow block" href="">
          <h5 className="group-hover:text-gray-600 text-sm font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
            Title
          </h5>
          <p className="text-sm text-gray-500">UI/UX enthusiast</p>
        </a>

        <div className="grow">
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-2 border h-auto min-h-[200px] overflow-y-auto">
          <ul className="group grid items-center gap-3">
            {categories.length > 0 &&
              categories.map((cat) => (
                <li key={cat?.id}>
                  <label className="capitalize flex gap-2">
                    <input
                      type="checkbox"
                      value={cat?.id}
                      onChange={() => handleCheckboxChange(cat?.id)}
                      checked={field.value === cat?.id}
                    />
                    {cat?.name}
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          <input
            name="categoryName"
            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <button
            onClick={() =>
              React.startTransition(() => {
                handleSubmit(); // Call the asynchronous function within startTransition
              })
            }
            className="btn-secondary mt-3 float-end"
            type="button"
          >
            Add Category
          </button>
        </div>
      </div>
    </>
  );
}
