"use client";
import React, { useContext } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import { DataTableDemo } from '@/components/MainTable';

export default function Page() {
  const ipoData = useContext(IpoCommonDataContext);
  const ipoFilteredData = ipoData.filter(item => item.ipoType === 'IPO');

  return (
    <div className='max-h-full max-w-[80%] mx-auto m-3 p-2'>
      <DataTableDemo data={ipoFilteredData} />
    </div>
  );
}
