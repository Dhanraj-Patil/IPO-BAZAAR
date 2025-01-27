"use client";
import React, { useContext, useMemo } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import { DataTableDemo } from '@/components/MainTable';

export default function Page() {
  const ipoData = useContext(IpoCommonDataContext);
  
  const ipoFilteredData = useMemo(() => 
    ipoData.filter(item => item.ipoType === 'SME-IPO'), 
    [ipoData]
  );

  return (
    <div className='max-h-full max-w-[80%] mx-auto m-3 p-2'>
      <DataTableDemo data={ipoFilteredData} />
    </div>
  );
}