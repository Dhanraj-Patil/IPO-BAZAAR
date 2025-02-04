"use client";
import { useState, useCallback, useEffect } from 'react';
import { IpoCommonDataContext } from './IpoCommonDataContext';
import axios from 'axios';

export function IpoCommonDataProvider({ children, initialData }) {
  const [data, setData] = useState(initialData);
  const [hasPrices, setHasPrices] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(false);

  // Background price fetching
  useEffect(() => {
    const fetchPricesInBackground = async () => {
      if (!hasPrices && !isPriceLoading) {
        setIsPriceLoading(true);
        try {
          const postData = {
            data: Array.isArray(data) ? data : [],
          };
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.post(`${apiUrl}/stock-prices`, postData);
          setData(response.data.stockPrices);
          setHasPrices(true);
        } catch (error) {
          console.error('Error loading prices:', error);
        } finally {
          setIsPriceLoading(false);
        }
      }
    };

    // Start background fetch after a short delay to prioritize homepage load
    const timeoutId = setTimeout(fetchPricesInBackground, 2000);
    return () => clearTimeout(timeoutId);
  }, [data, hasPrices, isPriceLoading]);

  // Keep the manual load function for immediate loading when needed
  const loadPrices = useCallback(async () => {
    if (!hasPrices && !isPriceLoading) {
      setIsPriceLoading(true);
      try {
        const postData = {
          data: Array.isArray(data) ? data : [],
        };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.post(`${apiUrl}/stock-prices`, postData);
        setData(response.data.stockPrices);
        setHasPrices(true);
      } catch (error) {
        console.error('Error loading prices:', error);
      } finally {
        setIsPriceLoading(false);
      }
    }
  }, [data, hasPrices, isPriceLoading]);

  return (
    <IpoCommonDataContext.Provider value={{ data, loadPrices, hasPrices, isPriceLoading }}>
      {children}
    </IpoCommonDataContext.Provider>
  );
}