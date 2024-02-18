'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function HeaderArea() {
  const pathname = usePathname();

  let currentPageName = '' as string | undefined;

  if (pathname === '/') {
    return null;
  } else if (pathname.includes('/shop/product/')) {
    currentPageName = 'product';
  } else if (
    pathname.includes('/account') ||
    pathname.includes('/help') ||
    pathname.includes('/success')
  ) {
    return null;
  } else {
    currentPageName = pathname.split('/').pop();
  }

  return (
    <div className="container px-8 pt-28">
      <div className="page-banner">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6">
            {/* <nav aria-label="Breadcrumb">
              <ul className="breadcrumb justify-content-center py-0 bg-transparent">
                <li className="breadcrumb-item">
                  <a href="index.html">{pathname}</a>
                </li>
                <li className="breadcrumb-item active">Services</li>
              </ul>
            </nav> */}
            <h1 className="text-left text-3xl capitalize">{currentPageName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
