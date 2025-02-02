"use client";
import { useState, useCallback } from 'react';
import { IpoCommonDataContext } from './IpoCommonDataContext';
import axios from 'axios';

export function IpoCommonDataProvider({ children, initialData }) {
  const [data, setData] = useState(initialData);
  const [hasPrices, setHasPrices] = useState(false);

  const loadPrices = useCallback(async () => {
    if (!hasPrices) {
      try {
        const postData = {
          data: Array.isArray(data) ? data : [],
        };
        const response = await axios.post('http://localhost:3000/api/stock-prices', postData);
        setData(response.data.stockPrices);
        setHasPrices(true);
      } catch (error) {
        console.error('Error loading prices:', error);
      }
    }
  }, [data, hasPrices]);

  return (
    <IpoCommonDataContext.Provider value={{ data, loadPrices, hasPrices }}>
      {children}
    </IpoCommonDataContext.Provider>
  );
}
