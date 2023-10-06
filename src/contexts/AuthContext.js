import { createContext, useState } from "react";
import { signIn } from '../hooks/signIn';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false)

    const handleSignIn = async ({ username, password }) => {
        await signIn({ username, password });
        const token = sessionStorage.getItem("token");
        if (token) {
            setAuth(true);
        }
    };

    const signOut = () => {
        sessionStorage.removeItem("token");
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ auth, handleSignIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
