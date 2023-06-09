import React, {useState, useContext, createContext} from 'react';

const themeContext = createContext<ThemeMethods>({darkTheme: false, setTheme: undefined});

export function OverallThemeProvider({children}: any) {
    const theme = useThemeProvider();

    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>;
}

export const useThemeContext = () => useContext(themeContext);

interface ThemeMethods {
    darkTheme: boolean;
    setTheme: any;
}

function useThemeProvider() {
    const [darkTheme, setTheme] = useState<boolean>(false);








    return {
        darkTheme,
        setTheme,
    };
}
