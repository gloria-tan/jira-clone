import { API_URLS } from "apiurl";
import { AuthProvider, LoginCombination, AuthCredential } from "models/Model";
import React, { useState } from "react";
import { ReactNode, useContext } from "react";


const AuthContext = React.createContext<AuthProvider | undefined >(undefined);
AuthContext.displayName = "Authencitation Context";

export const AuthState = ({children}: {children: ReactNode}) => {
    const [credential, setCredential] = useState<AuthCredential | null >(null);

    const BASE_URL = process.env.REACT_APP_API_URL 
 
    const login = ({email, password}: LoginCombination) => {
        const loginUrl = BASE_URL + '/' + API_URLS.login;

        return window.fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password} )
        })
                .then( rsp => {
                    if (rsp.ok) {
                        return rsp.json();
                    } else {
                        return Promise.reject(new Error("Receive a failed response."));
                    }
                })
                .then( json => {
                    // login success
                    console.log(`Received token: ${JSON.stringify(json)}`);
                    const newCrediential: AuthCredential = {
                        email,
                        token: json["access_token"] as string
                    }
                    setCredential(newCrediential);
                });
    };

    const logout = (): Promise<boolean> => {
        const logoutUrl = BASE_URL + '/' + API_URLS.logout;
        return window.fetch(logoutUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: credential?.token || ''
            })
        })
        .then( rsp => {
            if (rsp.ok) {
                setCredential(null);
                return Promise.resolve(true);
            } else {
                return Promise.reject(new Error("Post logout message failed"));
            }
        });
    };
    
    return (
        <AuthContext.Provider value={{
            credential,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthState = (): AuthProvider => {
    const state = React.useContext(AuthContext);
    if ( !state ) {
        throw new Error("Auth Context should used in AuthProvide ");
    }

    return state;
}