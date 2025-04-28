"use client";
import { AppData } from "@/types/chat";
import { createContext } from "react";

const defaultAppData: AppData = {
  userData: {},
  userActions: {},
};

// create a context for appData.
export const AppContext = createContext(defaultAppData);
