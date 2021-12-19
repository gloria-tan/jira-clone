import { Typography, AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ReactNode } from "react";
import { ProjectOverviewPage } from "./ProjectOverviewPage";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import { UserOverviewPage } from "./UserOverviewPage";
import { AccountCircle } from "@material-ui/icons";
import { ProjectDetailsPage } from "./ProjectDetailsPage";
import { ReactComponent as Logo } from "../resources/image/software-logo.svg";

const useStyles = makeStyles( (theme?) => {

    return {
        root: {
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignItems: "center"

        },
        logo: {
            height: "28px",
            marginRight: "20px"
        },
        content: {
            flexGrow: 1,
            flexShrink: 1
        },
        noUppcase: {
            textTransform: "none"
        },
        growContent: {
            marginLeft: "20px",
            flexGrow: 1
        }

    }

});

export const AuthorizedPage = ( ) => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Logo className={classes.logo} />
                    <Typography variant="h6">Jira Clone</Typography>
                    <div  className={classes.growContent}>
                        <Button color="inherit" className={classes.noUppcase}> <NavLink to="projects">Projects</NavLink></Button>
                        <Button color="inherit" className={classes.noUppcase}>
                            <NavLink to="users">
                                Users
                            </NavLink>
                        </Button>
                    </div>
                    <div>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
            <div>
                <Toolbar variant="dense"></Toolbar>
                <Routes>
                    <Route path="projects" element={<ProjectOverviewPage />} />
                    <Route path="projects/:project_id/*" element={<ProjectDetailsPage />} />
                    <Route path="users" element={<UserOverviewPage />} />
                </Routes>
            </div>
        </>
    );
}