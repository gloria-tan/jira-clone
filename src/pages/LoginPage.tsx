import { API_URLS } from "apiurl";
import { FormEvent } from "react";

export const LoginPage = () => {

    const onLogin = (evt: FormEvent<HTMLFormElement>) => {
        const loginUrl = `${process.env.REACT_APP_API_URL}/${API_URLS.login}`;
        fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: "billwen"})
        })
        .then( (rsp) => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                return Promise.reject(new Error("Post login data failed"))
            }
        } );
    }

    return (
        <form onSubmit={ onLogin }>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password"/>
            <button type="submit">Login</button>
        </form>
    );
}