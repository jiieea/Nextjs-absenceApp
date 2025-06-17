'use client';
import React from 'react';
import Header from '../../molecule/header/header';

import { usePathname } from 'next/navigation';
import { publicPaths } from '@/middleware';
import Sidebar from  '../../molecule/sidebar/Sidebar';


interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper(props: Readonly<WrapperProps>) {
  const { children } = props;
  const pathname = usePathname();
  const isPublicPath = publicPaths.includes(pathname);
  return (
    <body className="font-poppins font-bold text-primary">
      {!isPublicPath && (
        <>
          <Header />
          <Sidebar />
        </>
      )}
      <main className={`${!isPublicPath && 'mt-20 ml-64'}`}>{children}</main>
    </body>
  );
}

export default Wrapper;
