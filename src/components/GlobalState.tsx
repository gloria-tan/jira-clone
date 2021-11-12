import { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthState } from "./AuthState";

export const GlobalState = ({children}: {children: ReactNode}) => {

    return (
        <AuthState>
            <Router>
                {children}
            </Router>
        </AuthState>
    );
}