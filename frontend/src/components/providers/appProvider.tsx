"use client";
import { AppContext } from "@/context/appContext";
import { AppProviderProps, AppData } from "@/types/chat";

// create a app provider component.
export const AppProvider = ({ children }: AppProviderProps) => {
  const appData: AppData = { userData: {}, userActions: {} };
  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
