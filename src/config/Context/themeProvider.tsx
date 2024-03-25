import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { FC, ReactNode, createContext } from "react";
import { useState, useEffect } from 'react';
import getLPTheme from "../../theme/getLPTheme";

interface Props {
    children: ReactNode
}


export const ThemeContext = createContext({
    mode: "",
    showCustomTheme: true,
    toggleColorMode: () => { },
    LPtheme: {}
})

const defaultTheme = createTheme({});

const CustomThemeProvider: FC<Props> = ({ children }) => {

    const [mode, setMode] = React.useState<any>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));

    console.log(LPtheme)

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = {
        mode,
        showCustomTheme,
        toggleColorMode,
        LPtheme
    }

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}


export default CustomThemeProvider;  