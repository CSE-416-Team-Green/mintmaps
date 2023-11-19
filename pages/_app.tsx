import CustomThemeProvider from "@/components/themeContextProvider";
import "@/styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";


export default function MyApp({ Component, pageProps }: any) {
    return (
        <CustomThemeProvider>
            <CssBaseline/>
            <Component {...pageProps} />
        </CustomThemeProvider>
    );
}
