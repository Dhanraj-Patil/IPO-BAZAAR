// app/SME/page.jsx
"use client"
import React, { useContext, useMemo, useEffect } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import { DataTableDemo } from '@/components/MainTable';

export default function Page() {
  const { data, loadPrices, hasPrices, isPriceLoading } = useContext(IpoCommonDataContext);
  
  useEffect(() => {
    if (!hasPrices && !isPriceLoading) {
      loadPrices();
    }
  }, [hasPrices, isPriceLoading, loadPrices]);

  const ipoFilteredData = useMemo(() => 
    data.filter(item => item.ipoType === 'SME-IPO'), 
    [data]
  );

  return (
    <div className='max-h-full max-w-[80%] mx-auto m-3 p-2'>
      <DataTableDemo data={ipoFilteredData} isPriceLoading={isPriceLoading && !hasPrices} />
    </div>
  );
}