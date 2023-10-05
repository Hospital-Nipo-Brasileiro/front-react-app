import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(true);

    const signOut = () => {
        setAuth(null);
    }

    return(
        <AuthContext.Provider value={{ auth, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}