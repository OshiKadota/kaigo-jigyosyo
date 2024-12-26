"use client";

import React, { createContext, useState, ReactNode } from "react";
import { useLocal } from "./useLocal";

export const QnConnectContext = createContext<any>(null);

export const QnConnectProvider = ({ children }: { children: ReactNode }) => {
  const { onClickSideMenuControllButton, isSideMenuOpen } = useLocal();

  return (
    <QnConnectContext.Provider
      value={{ onClickSideMenuControllButton, isSideMenuOpen }}
    >
      {children}
    </QnConnectContext.Provider>
  );
};
