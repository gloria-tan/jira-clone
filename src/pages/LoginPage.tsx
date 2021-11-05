import { API_URLS } from "apiurl";
import { useAuthState } from "components/AuthState";
import { FormEvent, useState } from "react";

export const LoginPage = () => {

    const authState = useAuthState();
    const credential = authState?.credential || null;
    const login = authState?.login;
    const logout = authState?.logout;

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onLogin = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setErrorMessage(null);
        const email = (evt.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;

        if (login) {
            login({email, password})
                .catch( err => {
                console.log(`Error happends ${err}`);
                setErrorMessage(err.toString());
            });
        }
    }

    return (
        <form onSubmit={ onLogin }>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            { errorMessage && (
                <div>
                    <p>Error!</p>
                    <span>{errorMessage}</span>
                </div>
            )}

            { credential?.token && (
                <div>
                    {JSON.stringify(credential.token)}
                </div>
            )}
            <button type="submit">Login</button>
        </form>
    );
}