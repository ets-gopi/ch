"use client";
import { useAppContext } from "@/hooks/useAppContext";
import { AppData } from "@/types/chat";
import React from "react";

const ChatRoom = () => {
  const appData: AppData = useAppContext();
  return <div>ChatRoom</div>;
};

export default ChatRoom;
