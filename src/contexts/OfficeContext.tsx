// src/OfficeContext.tsx
import * as React from "react";
import {useEffect, useState, createContext, ReactNode, useContext} from "react";

/* global Office */

interface OfficeContextProps {
    isOfficeInitialized: boolean;
    officeTheme: Office.OfficeTheme | undefined;
    userProfile: Office.UserProfile | undefined;
}

const OfficeContext = createContext<OfficeContextProps | undefined>(undefined);

const OfficeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [officeTheme, setOfficeTheme] = useState<Office.OfficeTheme>();
    const [userProfile, setUserProfile] = useState<Office.UserProfile>();
    const [isOfficeInitialized, setIsOfficeInitialized] = useState<boolean>(false);

    useEffect(() => {
        if (Office.context.officeTheme) {
            setOfficeTheme(Office.context.officeTheme);
        }
        if (Office.context.mailbox) {
            setUserProfile(Office.context.mailbox.userProfile);
        }
        setIsOfficeInitialized(true);
    }, []);

    return (
        <OfficeContext.Provider value={{officeTheme, userProfile, isOfficeInitialized}}>
            {children}
        </OfficeContext.Provider>
    );
};

const useOfficeContext = () => {
    const context = useContext(OfficeContext);
    if (!context) {
        throw new Error("useOfficeContext must be used within an OfficeProvider");
    }
    return context;
};

export {OfficeProvider, useOfficeContext};