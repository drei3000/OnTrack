import React, { createContext, useContext, useState } from "react";

// Define themes
const themes = {
        dark: {
          backgroundColor: "#101010",
          textColor: "white",
          secondaryTextColor: "gray",
          cardBackgroundColor: "#1E1E1E",
          progressColor: "lightgreen",
          unfilledProgressColor: "#333",
        },
        light: {
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          secondaryTextColor: "#555555",
          cardBackgroundColor: "#F5F5F5",
          progressColor: "#4CAF50",
          unfilledProgressColor: "#DDD",
        },
};

// Create the context
const ThemeContext = createContext({
        isDarkMode: true,
        toggleTheme: () => {},
        currentTheme: themes.dark,
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [isDarkMode, setIsDarkMode] = useState(true);
        const currentTheme = isDarkMode ? themes.dark : themes.light;
      
        const toggleTheme = () => {
          console.log("Toggling theme...");
          setIsDarkMode((prevMode) => !prevMode);
        };
      
        return (
          <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentTheme }}>
            {children}
          </ThemeContext.Provider>
        );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);