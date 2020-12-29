import React, { useEffect, useState } from "react";
import { setToken } from '../base/remote';

export const AuthContext = React.createContext({
  auth: {
    token: null,
    avatar: null,
    name: null,
    isAdmin: false
  }, 
  onAuth: (authData) => {},
  logout: () => {}
});

export default function AuthProvider ({ children }) {

  const [auth, setAuth] = useState({
    ...JSON.parse(sessionStorage.getItem('auth')),
  });
  
  const onAuth = (authData) => {
    sessionStorage.setItem('auth', JSON.stringify(authData));
    setAuth(authData);
  }

  const logout = () => {
    sessionStorage.clear('token');
    sessionStorage.clear('avatar');
    sessionStorage.clear('name');
    setAuth({ token: null, avatar: null, name: null });
  };

  return <AuthContext.Provider value={{auth, onAuth, logout}}>
      {children}
    </AuthContext.Provider>;
}