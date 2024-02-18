import React, { useEffect, useState } from 'react';
import DownloadButton from './DownloadButton';
import { formatDate } from '@/libs/utils';
import Image from 'next/image';
import { getDownloadsByUserId } from '@/libs/actions/order.action';

type DownloadItem = {
  createdAt: string;
  product: {
    title: string;
    imageUrl: string;
    isFree: boolean;
    price: string;
    downloadLink: string;
  };
};

export default function UserDownloads({ userId }: any) {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDownloadsByUserId(userId);
      setDownloads(data);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  return (
    <section>
      <div className="flex gap-2">
        <div className="w-full">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Downloads
          </h3>
          <div>
            <div className="col-span-12">
              <div className="overflow-auto lg:overflow-visible ">
                <table className="table text-gray-400 border-separate space-y-6 text-sm w-full text-left">
                  <thead className="text-gray-500">
                    <tr>
                      <th className="py-3">Product Image</th>
                      <th className="py-3 text-left">Product Name</th>
                      <th className="py-3 text-left">Date</th>
                      <th className="py-3 text-left">Item Type</th>
                      <th className="py-3 text-left">Price</th>
                      <th className="py-3 text-left">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr className="w-full mt-20">
                        <td
                          colSpan={6}
                          className="text-lg font-medium text-center pt-[100px] pb-[100px]"
                        >
                          Loading...
                        </td>
                      </tr>
                    )}

                    {downloads &&
                      downloads.map((item, index) => (
                        <tr key={index.toString()}>
                          <td className="py-3">
                            <div className="flex align-items-center">
                              <Image
                                width={100}
                                height={100}
                                className="rounded-full h-12 w-12 object-cover"
                                src={`/assets/product/images/${item?.product?.imageUrl}`}
                                alt="product img"
                              />
                            </div>
                          </td>
                          <td className="py-3">{item.product.title}</td>
                          <td className="py-3">{formatDate(item.createdAt)}</td>
                          <td className="py-3 font-bold">
                            {item.product.isFree ? 'Free' : 'Paid'}
                          </td>
                          <td className="py-3 font-bold">
                            {item.product.isFree
                              ? 'Free'
                              : '$' + item.product.price}
                          </td>
                          <td className="py-3 ">
                            <DownloadButton dUrl={item.product.downloadLink} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
