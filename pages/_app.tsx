import CustomThemeProvider from "@/components/themeContextProvider";
import "@/styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import AuthContextProvider from "@/components/authContextProvider";

const { GOOGLE_CLIENT_ID } = process.env;

export default function MyApp({ Component, pageProps }: any) {
    return (
        <GoogleOAuthProvider clientId="865291496981-ucmqd3vihq4i32b563a7hntb7988r89o.apps.googleusercontent.com">
            <AuthContextProvider>
                <CustomThemeProvider>
                    <CssBaseline />
                    <Component {...pageProps} />
                </CustomThemeProvider>
            </AuthContextProvider>
        </GoogleOAuthProvider>
    );
}
