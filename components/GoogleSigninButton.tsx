import * as React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import AuthContext from "./authContext";
import { useRouter } from "next/navigation";
const GoogleSignInButton = () => {
    React.useEffect(() => {}, []);

    const authContext = React.useContext(AuthContext);
    const router = useRouter();

    const onSuccess = async (res: any) => {
        const token = res.credential;

        console.log(res);

        try {
            const response = await axios.post("/api/loginGoogle", {
                token: token,
            });

            if (response.status === 200) {
                const data = response.data.data;

                const userDetails = {
                    userId: data._id,
                    email: data.email,
                    accountType: data.accountType,
                    admin: data.admin,
                };
                authContext.onLoggingIn(userDetails);
                router.push("/home");
            }
        } catch (err) {
            console.error(err);
        }
    };
    return <GoogleLogin onSuccess={onSuccess} />;
};

export default GoogleSignInButton;
