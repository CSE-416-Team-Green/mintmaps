import * as React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import AuthContext from "./authContext";

const GoogleSignInButton = () => {
    React.useEffect(() => {}, []);

    const authContext = React.useContext(AuthContext);

    const onSuccess = async (res: any) => {
        const token = res.credential;

        console.log(res);

        try {
            const response = await axios.post("/api/loginGoogle", {
                token: token,
            });

            const data = response.data.data;

            const userDetails = {
                email: data.email,
                accountType: data.accountType,
                admin: data.admin,
            };
            authContext.onLoggingIn(userDetails);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };
    return <GoogleLogin onSuccess={onSuccess} />;
};

export default GoogleSignInButton;
