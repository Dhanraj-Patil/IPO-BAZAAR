import React from 'react'
import { useContext } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import MainTable from '@/components/MainTable';
export default function page() {
  const ipoData = useContext(IpoCommonDataContext);
  return (
    <div>
      <MainTable ipoData={ipoData} />
    </div>
  )
}
