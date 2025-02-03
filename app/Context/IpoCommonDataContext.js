// app/Context/IpoCommonDataContext.js
"use client";
import { createContext } from "react";

export const IpoCommonDataContext = createContext({
  data: [],
  loadPrices: async () => {},
  hasPrices: false,
  isPriceLoading: false  // Add this to track background loading
});