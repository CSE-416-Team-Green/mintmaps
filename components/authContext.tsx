import * as React from "react";

interface UserDetails {
    userId: string;
    email: string;
    accountType: string;
    admin: boolean;
}

interface AuthContextType {
    userId: string;
    email: string;
    admin: boolean;
    onLoggingIn: (userDetails: UserDetails) => void;
    onLoggingOut: () => void;
    isLoggedIn: boolean;
    accountType: string;
}
const AuthContext = React.createContext<AuthContextType>({
    userId: "",
    email: "",
    admin: false,
    onLoggingIn: () => {},
    onLoggingOut: () => {},
    isLoggedIn: false,
    accountType: "",
});

export default AuthContext;
