import { ProjectSearchPanel } from "components/ProjectSearchPanel";
import { ProjectList } from "components/ProjectList";
import { useEffect, useState } from "react";
import { cleanObject } from "utils/Helper";
import qs from "qs";
import { useDebounce } from "hooks/SuperHooks";
import { Project, ProjectOwner } from "models/Model";

export const ProjectOverviewPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Search options
    const [searchParam, setSearchParam] = useState({
        name: "",
        personId: ""
    });

    const debouncedParam = useDebounce(searchParam, 500);

    // Owner list
    const [projectOwners, setProjectOwners] = useState<ProjectOwner[]>([]);

    // project list
    const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
    
    useEffect( () => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
        .then( rsp => {
            if (rsp.ok) {
                return rsp.json();
            } else {
                return Promise.reject(new Error("Get projects failed"));
            }
        })
        .then( projects => setAvailableProjects(projects))
        .catch( err => {
            console.log(`Èrror happend while getting projects ${err}`)
        });

    }, [debouncedParam]);

    useEffect( () => {
        fetch(`${apiUrl}/users`)
            .then( rsp => {
                if (rsp.ok) {
                    return rsp.json();
                } else {
                    return Promise.reject(new Error("Get users failed"));
                }
            })
            .then( data => {
                setProjectOwners(data);
            })
            .catch( err => {
                console.log(`Get users failed, error is ${err}`);
            })
    }, []);

    return (
        <div>
            <ProjectSearchPanel param={searchParam} setParam={setSearchParam} owners={projectOwners}></ProjectSearchPanel>
            <ProjectList projects={availableProjects} owners={projectOwners}></ProjectList>
        </div>
    );
}