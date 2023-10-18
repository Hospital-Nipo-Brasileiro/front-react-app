import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);

  const login = () => {
    setAuth(true);
  };

  const signOut = () => {
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
