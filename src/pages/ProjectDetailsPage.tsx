import { Drawer, ListItem, ListItemText, makeStyles, Toolbar } from '@material-ui/core';
import { FullscreenExitTwoTone } from '@material-ui/icons';
import { Route, Routes, useParams } from 'react-router';
import { NavLink, Navigate } from 'react-router-dom';
import { Project } from '../models/Model';
import { ProjectKanbanPage } from './ProjectKanbanPage';
import { ProjectTasksPage } from './ProjectTasksPage';

const DRAWER_WIDTH = 240;

const DRAWER_MENU = [
    {
        menuName: "Kanban",
        link: "kanban"
    },
    {
        menuName: "Tasks",
        link: "tasks"
    }
];

const useStyles = makeStyles( () => {
    return {
        content: {
            display: "flex",
            flexDirection: "row"
        },
        drawer: {
            width: DRAWER_WIDTH
        },
        subContent: {
            flexGrow: 1
        }
    };
});

export const ProjectDetailsPage = () => {

    const param = useParams();
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Drawer variant="permanent">
                <Toolbar variant="dense"></Toolbar>
                { 
                    DRAWER_MENU.map( item => {
                        return (
                            <ListItem>
                                <ListItemText>
                                    <NavLink to={item.link} key={item.menuName}>{item.menuName}</NavLink>
                                </ListItemText>
                            </ListItem>
                        );
                    })
                }
            </Drawer>
            <div>
                <Routes>
                    <Route path="kanban" element={<ProjectKanbanPage />} />
                    <Route path="tasks" element={<ProjectTasksPage />} />
                    <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} />} />
                </Routes>
            </div>
        </div>
    );
}