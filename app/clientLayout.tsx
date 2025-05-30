"use client";

import { store } from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
