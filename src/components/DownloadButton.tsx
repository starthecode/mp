'use client';
import { genDownloadUrl } from '@/libs/utils';
import React from 'react';

type linkProps = {
  dUrl: string;
};

export default function DownloadButton({ dUrl }: linkProps) {
  return (
    <button
      onClick={() => genDownloadUrl(dUrl)}
      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-violet-600 text-white shadow-sm align-middle hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      Download
    </button>
  );
}
