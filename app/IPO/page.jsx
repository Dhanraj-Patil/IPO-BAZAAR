// app/IPO/page.jsx
"use client"
import React, { useContext, useMemo, useEffect } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import { DataTableDemo } from '@/components/MainTable';
import Loading from '@/app/loading';

export default function Page() {
  const { data, loadPrices, hasPrices, isPriceLoading } = useContext(IpoCommonDataContext);
  
  useEffect(() => {
    if (!hasPrices && !isPriceLoading) {
      loadPrices();
    }
  }, [hasPrices, isPriceLoading, loadPrices]);

  const ipoFilteredData = useMemo(() => 
    data.filter(item => item.ipoType === 'IPO'), 
    [data]
  );

  if (isPriceLoading && !hasPrices) {
    return <Loading />;
  }

  return (
    <div className='max-h-full max-w-[80%] mx-auto m-3 p-2'>
      <DataTableDemo data={ipoFilteredData} />
    </div>
  );
}