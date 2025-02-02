"use client";
import { createContext } from "react";

export const IpoCommonDataContext = createContext({
  data: [],
  loadPrices: async () => {},
  hasPrices: false
});