import Home from "@/pages/home";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#2ecc71",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}