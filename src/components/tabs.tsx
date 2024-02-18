'use client';
import { useEffect, useRef, useState } from 'react';

import { tabsLinks } from '@/constants';
import UserAccountForm from './UserAccountForm';
import UserDownloads from './UserDownloads';
import Image from 'next/image';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function Tabs({ data, userId }: any) {
  const [activeTab, setActiveTab] = useState('downloads');
  const [isTabActive, setIsTabActive] = useState(false);

  const router = useRouter();
  const pathname = useSearchParams();

  const tabName: any = pathname.get('tab');

  useEffect(() => {
    setActiveTab(tabName);
  }, [tabName]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsTabActive(!isTabActive);
    router.push(`/account?tab=${tab}`);
  };

  return (
    <div className="mt-32">
      <div className="py-8 px-8 max-w-sm mx-auto space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <Image
          width={120}
          height={120}
          className="flex mx-auto rounded-full sm:mx-0 sm:shrink-0"
          src={data?.image}
          alt="user profile"
        />
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5 flex flex-col mb-3">
            <h2 className="text-2xl text-black font-semibold">{data?.name}</h2>
            <p className="text-slate-500 font-medium">{`${
              data?.username ? '@' + data?.username : 'N/A'
            }`}</p>
          </div>
          <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            Edit Profile
          </button>
        </div>
      </div>

      <ul className="flex gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {tabsLinks.map((tab: any, index: any) => (
          <li key={index}>
            <span
              onClick={() => handleTabClick(tab.path)}
              className={` cursor-pointer inline-flex items-center text-xs gap-1 px-3 py-2 text-gray-500 rounded-full w-full ${
                activeTab === tab.path
                  ? 'bg-slate-300 font-bold'
                  : 'bg-transparent'
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: tab.icon }}></span>
              {tab.label}
            </span>
          </li>
        ))}
      </ul>
      <div className="p-6 mt-5 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {activeTab === 'downloads' && (
          <>
            <UserDownloads userId={userId} />
          </>
        )}

        {activeTab === 'account' && (
          <>
            <UserAccountForm data={data} />
          </>
        )}
      </div>
    </div>
  );
}
