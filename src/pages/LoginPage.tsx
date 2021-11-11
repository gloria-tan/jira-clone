import { Card, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useAuthState } from "components/AuthState";
import { FormEvent, useState } from "react";
import logo from "resources/image/logo.svg";

const useStyles = makeStyles({
    root: {
        "width": "600px",
        margin: "3rem auto",
        minHeight: "38rem",

        "& > form": {
            padding: "5px 20px"
        }
    },

    textInput: {
        marginBottom: "30px"
    }
});

export const LoginPage = () => {

    const classes = useStyles();

    const authState = useAuthState();
    const credential = authState?.credential;
    const errorMessage = authState?.errorMessage;
    const login = authState?.login;
    const logout = authState?.logout;

    const onLogin = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const email = (evt.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;

        if (login) {
            login({email, password})
                .then( status => {
                    console.log(`${email} Logging successfull`);
                })
                .catch( err => {
                console.log(`Error happened while logging, error is ${err}`);
            });
        }
    }

    return (
        <div>
            <Card className={classes.root} raised={true}>
            <Typography variant="h6">Login</Typography>
            <form onSubmit={ onLogin }>
                <TextField type="text" placeholder='Email' fullWidth inputProps={{ 'aria-label': 'email' }} />
                <TextField type="password" placeholder='Password' fullWidth inputProps={{ 'aria-label': 'password'}} />
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

            <Button variant="contained" type="submit" color="primary">Login</Button>

            </form>
            </Card>
        </div>
    );
}