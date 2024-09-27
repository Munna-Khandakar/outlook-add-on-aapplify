// src/contexts/AuthContext.tsx
import * as React from "react";
import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import { AuthUtil } from "../utils/AuthUtil";

interface AuthContextProps {
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = AuthUtil.getToken();
        if (storedToken !== null && storedToken !== undefined) {
            setTokenState(storedToken);
        }
    }, []);

    const setToken = (token: string) => {
        AuthUtil.setToken(token);
        setTokenState(token);
    };

    const removeToken = () => {
        AuthUtil.removeToken();
        setTokenState(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, removeToken }}>
    {children}
    </AuthContext.Provider>
);
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuthContext };