import { API_URLS } from "apiurl";
import { secureFetch } from "hooks/useHttpApi";
import { AuthProvider, LoginCombination, AuthCredential } from "models/Model";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

const AuthContext = React.createContext<AuthProvider | undefined >(undefined);
AuthContext.displayName = "Authencitation Context";

const STORAGE_AUTH_TOKEN_EMAIL = 'AUTH_TOKEN_EMAIL';
const STORAGE_AUTH_TOKEN_VALUE = 'AUTH_TOKEN_VALUE';

export const AuthState = ({children}: {children: ReactNode}) => {
    const [credential, setCredential] = useState<AuthCredential | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const login = ({email, password}: LoginCombination): Promise<boolean> => {
        const data = {
            email,
            password
        };

        const apiConfig = {
            method: "POST",
            data
        };

        setErrorMessage(null);
        return secureFetch(API_URLS.login, apiConfig )
            .then(rsp => {
                if (rsp.ok) {
                    return rsp.json();
                } else {
                    return Promise.reject(new Error(`Http request failed, code ${rsp.status}`));
                }
            })
            .then(json => {
                const token = json.access_token;
                if (token && token !== '') {
                    setCredential({email, token});

                    // Save to Local storage
                    window.localStorage.setItem(STORAGE_AUTH_TOKEN_EMAIL, email);
                    window.localStorage.setItem(STORAGE_AUTH_TOKEN_VALUE, token);

                } else {
                    setErrorMessage('Receive an empty token');
                }

                return Promise.resolve(true);
            })
            .catch( err => {
                setErrorMessage(`Error happened while logging in, error message ${err.toString()}`);
                return Promise.resolve(true);
            });
    };

    const logout = (noHttpCall: boolean = false): Promise<boolean> => {
        setErrorMessage(null);
        
        if (noHttpCall || credential === null || credential.token === null || credential.token === '') {
            return Promise.resolve(noHttpCall)
                .then(val => {
                    setCredential(null);
                    setErrorMessage(null);

                    return Promise.resolve(true);
                });
        } else {
            // Need call api
            const token = credential.token;
            const data = { };
            const apiConfig = {
                method: "POST",
                data,

            };
            return secureFetch(API_URLS.logout, apiConfig)
                .then( rsp => {
                    if (!rsp.ok) {  
                        console.log(`Logout function call failed, code ${rsp.status}`);
                    }
                    setCredential(null);
                    setErrorMessage(null);

                    return Promise.resolve(true);
                })
                .catch( err => {
                    console.log(`Errors happened while logging out, error message ${err.toString()}`);
                    return Promise.resolve(true);
                });
        }
    };

    // Load credential from local storage
    useEffect( () => {
        const storedEmail = window.localStorage.getItem(STORAGE_AUTH_TOKEN_EMAIL);
        const storedValue = window.localStorage.getItem(STORAGE_AUTH_TOKEN_VALUE);
        if ( storedEmail && storedValue ) {
            setCredential( {
                email: storedEmail,
                token: storedValue
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            credential,
            errorMessage,
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