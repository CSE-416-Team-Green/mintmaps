import * as React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleSignInButton = () => {
    React.useEffect(() => {}, []);

    const onSuccess = () => {};
    return (
        <GoogleOAuthProvider clientId="386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com">
            <GoogleLogin onSuccess={onSuccess} />{" "}
        </GoogleOAuthProvider>
    );
};

export default GoogleSignInButton;
