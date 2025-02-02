"use client"
import React, { useContext, useMemo, useEffect, useState } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import { DataTableDemo } from '@/components/MainTable';
import Loading from '@/app/loading';

export default function Page() {
  const { data, loadPrices, hasPrices } = useContext(IpoCommonDataContext);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!hasPrices) {
      setIsLoading(true);
      loadPrices().finally(() => {
        setIsLoading(false);
      });
    }
  }, [hasPrices, loadPrices]);

  const ipoFilteredData = useMemo(() => 
    data.filter(item => item.ipoType === 'IPO'), 
    [data]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='max-h-full max-w-[80%] mx-auto m-3 p-2'>
      <DataTableDemo data={ipoFilteredData} />
    </div>
  );
}