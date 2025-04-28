import { ReactNode } from "react";

export type AppProviderProps = {
  children: ReactNode;
};

export type StoreProviderProps = {
  children: ReactNode;
};

export interface AppData {
  userData: Record<string, any>;
  userActions: Record<string, any>;
}
