import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(true);

    const signIn = async (useData) => {
        setAuth(useData)
    }

    const signOut = () => {
        setAuth(null);
    }

    return(
        <AuthContext.Provider value={{ auth, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}