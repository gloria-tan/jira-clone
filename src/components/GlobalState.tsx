import { ReactNode } from "react";
import { AuthState } from "./AuthState";

export const GlobalState = ({children}: {children: ReactNode}) => {

    return (
        <AuthState>
            {children}
        </AuthState>
    );
}