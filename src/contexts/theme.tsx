import { createContext, useContext, useState } from "react";

const themeContext = createContext<ThemeMethods>({
  darkTheme: false,
  setTheme: undefined,
});

export function OverallThemeProvider({ children }: any) {
  const theme = useThemeProvider();

  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
}

export const useThemeContext = () => useContext(themeContext);

interface ThemeMethods {
  darkTheme: boolean;
  setTheme: any;
}

function useThemeProvider() {
  const themeChecker = (): boolean => {
    const data = localStorage.getItem("theme");
    if (data !== null) {
      return new RegExp("true").test(data);
    }
    return false;
  };
  const [darkTheme, setTheme] = useState<boolean>(themeChecker());

  return {
    darkTheme,
    setTheme,
  };
}
