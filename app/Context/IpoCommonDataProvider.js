"use client";

import { IpoCommonDataContext } from './IpoCommonDataContext';

export function IpoCommonDataProvider({ children, initialData }) {
  return (
    <IpoCommonDataContext.Provider value={initialData}>
      {children}
    </IpoCommonDataContext.Provider>
  );
}