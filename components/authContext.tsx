import * as React from "react";

interface UserDetails {
    email: string;
    accountType: string;
    admin: boolean;
}

interface AuthContextType {
    email: string;
    admin: boolean;
    onLoggingIn: (userDetails: UserDetails) => void;
    onLoggingOut: () => void;
    isLoggedIn: boolean;
    accountType: string;
}
const AuthContext = React.createContext<AuthContextType>({
    email: "",
    admin: false,
    onLoggingIn: () => {},
    onLoggingOut: () => {},
    isLoggedIn: false,
    accountType: "",
});

export default AuthContext;