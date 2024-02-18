'use client';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { productDefaultValues } from '@/constants';
import { productFormSchema } from '@/libs/validator';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types';
import toast from 'react-hot-toast';
import { createProduct } from '@/libs/actions/product.action';
import ProductSidebar from './ProductSidebar';
import { uploadFile } from '@/libs/actions/upload.action';

type ProducFormProps = {
  type: 'Add' | 'Update';
  product: IProduct;
};

//Zod Validator
type ProductData = z.infer<typeof productFormSchema>;

export default function ProductForm({ type, product }: ProducFormProps) {
  // const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [newDownload, setNewDownload] = React.useState<File | null>(null);
  const [updatedDownload, setUpdatedDownload] = React.useState<String | null>(
    ''
  );

  const [updatedImgLink, setUpdatedImgLink] = React.useState<String | null>('');

  const router = useRouter();

  const initialValues =
    product && type === 'Update'
      ? {
          ...product,
        }
      : productDefaultValues;
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues,
  });

  const onInvalid = (errors: any) => console.error(errors);

  async function onSubmit(product: ProductData) {
    //Create
    if (type === 'Add') {
      const formData = new FormData();

      if (product.downloadLink && product.downloadLink.name) {
        formData.append('downloadLink', product.downloadLink);
      }

      if (product.imageUrl && product.imageUrl.name) {
        formData.append('imageUrl', product.imageUrl);
      }

      // Upload both files simultaneously
      const fileResponse = await uploadFile({
        formData,
      });

      if (fileResponse) {
        console.log(fileResponse);

        // Update product object with filenames
        if (fileResponse.imageUrl) {
          product.imageUrl = fileResponse.imageUrl.fileName;
        }

        if (fileResponse.downloadLink) {
          product.downloadLink = fileResponse.downloadLink.fileName;
        }
      }

      const newProduct = await createProduct({
        data: product,
      });

      if (newProduct) {
        toast.success('Product Created');
        reset();
        router.push('/products/');
      } else {
        toast.error('Something went wrong');
      }
    }

    //Update
    // if (type === 'Update') {
    //   if (!event?._id) {
    //     router.back();
    //     return;
    //   }

    // try {
    //   const updatedEvent = await updateEvent({
    //     userId,
    //     event: { ...data, _id: event?._id },
    //     path: `/events/${event?.id}`,
    //   });
    //   if (updatedEvent) {
    //     reset();
    //     router.push(`/events/${updatedEvent._id}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // React.useEffect(() => {
  //   // Check if the upload is done and reset the file input
  //   if (updatedDownload && fileInputRef.current) {
  //     fileInputRef.current.value = '';

  //     setNewDownload(null);
  //   }
  // }, [updatedDownload]);

  return (
    <>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6"
          encType="multipart/form-data"
        >
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-4">
              <div className="space-y-5 lg:space-y-8">
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-project-name"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Product Name
                      </label>
                      <input
                        {...register('title', { required: true })}
                        placeholder="Product title"
                        name="title"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                      {errors?.title && (
                        <p className="text-red-600 text-sm">
                          {errors?.title?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-project-url"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Demo URL
                      </label>

                      <input
                        {...register('url', { required: true })}
                        name="url"
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="https://example.so"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-upload-images"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Preview image
                      </label>

                      <label
                        htmlFor="af-submit-app-upload-images"
                        className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700"
                      >
                        <Controller
                          name="imageUrl"
                          control={control}
                          defaultValue={undefined} // Set the default value if needed
                          render={({ field: { onChange, value, ...rest } }) => (
                            <input
                              type="file"
                              {...rest}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setValue('imageUrl', file as any);
                                }
                              }}
                            />
                          )}
                        />
                        <svg
                          className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                          ></path>
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                        </svg>
                        <span className="mt-2 block text-sm text-gray-800 dark:text-gray-200">
                          Browse your device or{' '}
                          <span className="group-hover:text-blue-700 text-blue-600">
                            drag n drop
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          Maximum file size is 2 MB
                        </span>
                      </label>
                    </div>

                    {/* <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-category"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Category
                      </label>

                      <Controller
                        name="categoryId"
                        control={control}
                        defaultValue="" // Set the default value if needed
                        render={({ field }) => (
                          <select
                            {...field}
                            className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            <option value="Ecommerce">Ecommerce</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketplace">Marketplace</option>
                            <option value="Social">Social</option>
                            <option value="Others">Others</option>
                          </select>
                        )}
                      />
                    </div> */}

                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-category"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Price
                      </label>
                      <input
                        {...register('price')}
                        name="price"
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label>
                        <input
                          {...register('isFree')}
                          name="isFree"
                          type="checkbox"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                        Is Free
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="af-submit-app-description"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Details
                      </label>

                      <textarea
                        {...register('desc')}
                        name="desc"
                        className="py-2 px-3 block h-[200px] w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
                      ></textarea>
                    </div>
                  </div>

                  {/* <div className="mt-5 flex justify-center gap-x-2">
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Submit
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Sidebar --> */}
          <div className="lg:col-span-1 lg:w-full lg:h-full lg:bg-gradient-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-slate-800">
            <div className="relative top-0 start-0 py-8 lg:ps-4 ">
              <Controller
                name="categoryId"
                control={control}
                defaultValue="" // Set the default value if needed
                render={({ field }) => (
                  <ProductSidebar
                    setValue={setValue}
                    control={control}
                    field={field}
                  />
                )}
              />
              {/* Download Link */}
              <div className="space-y-2 pt-4">
                <label
                  htmlFor="af-submit-app-upload-images"
                  className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                >
                  Upload Product Download
                </label>

                <label
                  htmlFor="af-submit-app-upload-images"
                  className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700"
                >
                  <Controller
                    name="downloadLink"
                    control={control}
                    defaultValue={undefined} // Set the default value if needed
                    render={({ field: { onChange, value, ...rest } }) => (
                      <input
                        type="file"
                        {...rest}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setValue('downloadLink', file as any);
                          }
                        }}
                      />
                    )}
                  />
                  {errors?.downloadLink && (
                    <p className="text-red-600 text-sm">
                      {errors?.downloadLink?.message as string}
                    </p>
                  )}
                </label>
                {/* <button
                  onClick={() =>
                    React.startTransition(() => {
                      handleUpload(); // Call the asynchronous function within startTransition
                    })
                  }
                  className="btn-secondary mt-3 float-end"
                  type="button"
                >
                  Upload Zip File
                </button> */}
              </div>
            </div>
          </div>

          {/* <!-- End Sidebar --> */}
        </form>
      </div>
    </>
  );
}
