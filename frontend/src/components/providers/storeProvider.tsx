"use client";
import { makeStore, AppStore } from "@/lib/redux/store";
import { StoreProviderProps } from "@/types/chat";
import { useRef } from "react";
import { Provider } from "react-redux";
//create an store provider component.
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};
