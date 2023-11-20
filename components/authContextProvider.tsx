import * as React from "react";
import AuthContext from "./authContext";

interface CustomProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    email: string;
    admin: boolean;
    onLoggingIn: (userDetails: UserDetails) => void;
    onLoggingOut: () => void;
    isLoggedIn: boolean;
    accountType: string;
}

interface UserDetails {
    email: string;
    accountType: string;
    admin: boolean;
}

const AuthContextProvider: React.FC<CustomProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [accountType, setAccountType] = React.useState("");
    const [admin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        const updateLogIn = async () => {
            if (typeof window !== "undefined") {
                setEmail(localStorage.getItem("email") || "");
                setAccountType(localStorage.getItem("accountType") || "");
                setIsAdmin(
                    localStorage.getItem("admin") === "true"
                        ? true
                        : false || false
                );
                setIsLoggedIn(
                    localStorage.getItem("isLoggedIn") === "true"
                        ? true
                        : false || false
                );
            }
        };

        updateLogIn();
    }, [AuthContext]);

    const onLoggingIn = (userDetails: UserDetails) => {
        if (userDetails) {
            setEmail(userDetails.email);
            setAccountType(userDetails.accountType);
            setIsAdmin(userDetails.admin);
            setIsLoggedIn(true);
        }

        localStorage.setItem("email", userDetails.email);
        localStorage.setItem("accountType", userDetails.accountType);
        localStorage.setItem("admin", userDetails.admin ? "true" : "false");
        localStorage.setItem("isLoggedIn", "true");
    };

    const onLoggingOut = () => {
        setEmail("");
        setAccountType("");
        setIsAdmin(false);
        setIsLoggedIn(false);
        localStorage.clear();
    };

    const contextValue: AuthContextType = {
        email,
        admin,
        onLoggingIn,
        onLoggingOut,
        isLoggedIn,
        accountType,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
