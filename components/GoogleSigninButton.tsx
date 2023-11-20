import * as React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const GoogleSignInButton = () => {
    React.useEffect(() => {}, []);

    const onSuccess = async (res: any) => {
        const token = res.credential;

        console.log(res);

        try {
            const response = await axios.post("/api/loginGoogle", {
                token: token,
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };
    return <GoogleLogin onSuccess={onSuccess} />;
};

export default GoogleSignInButton;
