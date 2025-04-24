'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const changeTheme = (e: { matches: boolean }) => {
            if (e.matches) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', changeTheme);
        return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener('change', changeTheme);
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <body className={'app ' + theme}>
                {children}
            </body>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};