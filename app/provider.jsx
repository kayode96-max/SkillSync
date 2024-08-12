"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { UserDataProvider } from "./context/UserDataContext";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserDataProvider>{children}</UserDataProvider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
