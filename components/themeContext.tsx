import * as React from "react";
import {
    Theme,
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    mode: String;
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: createTheme({
        palette: {
            primary: {
                main: "#2ecc71",
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
    }),
    toggleTheme: () => {},
    mode: "light",
});

export default ThemeContext;
