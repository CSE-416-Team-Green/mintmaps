import * as React from "react";
import {
    Theme,
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

import ThemeContext from "./themeContext";

interface CustomThemeProviderProps {
    children: React.ReactNode;
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    mode: String;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
    children,
}) => {
    const [darkMode, setDarkMode] = React.useState(false);
    const [mode, setMode] = React.useState("light");

    const theme = createTheme({
        palette: {
            primary: {
                main: "#2ecc71",
            },
            mode: darkMode ? "dark" : "light",
            background: {
                default: darkMode ? "#242322" : "#fff",
            },
            text: {
                primary: darkMode ? "#fff" : "#000000",
                secondary: darkMode ? "#fff" : "#000000",
            },
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        // Styles for contained buttons
                        backgroundColor: "#2ecc71", // Custom color
                        "&:hover": {
                            backgroundColor: "#27ae60", // Darker shade for hover state
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#2ecc71",
                    },
                },
            },
        },
    });

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        setMode((m) => (m === "light" ? "dark" : "light"));
    };

    const contextValue: ThemeContextType = {
        theme,
        toggleTheme,
        mode,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export default CustomThemeProvider;
