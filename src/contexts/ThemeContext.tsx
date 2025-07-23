"use client";

import React, { createContext, ReactNode, useState } from "react";

// interface state and setState
interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

// Context config
export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
});

// Parent component for context
interface IThemeProvider {
  children: ReactNode;
}

function ThemeProvider({ children }: IThemeProvider) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
