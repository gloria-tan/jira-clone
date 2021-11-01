import { ProjectSearchPanel } from "components/ProjectSearchPanel";
import { ProjectList } from "components/ProjectList";
import { useEffect, useState } from "react";
import { cleanObject } from "utils/Helper";
import * as qs from "qs";

export interface ProjectOwner {
    id: Number;
    name: String;
}

export interface Project {
    id: Number;
    name: String;
    personId: Number;
    organization: String;
    created: Number;
}

export interface SearchParameter {
    name: String;
    personId: String; 
};

export const ProjectOverviewPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Search options
    const [searchParam: SearchParameter, setSearchParam] = useState({
        name: "",
        personId: ""
    });

    // Owner list
    const [projectOwners, setProjectOwners] = useState([]);

    // project list
    const [availableProjects, setAvailableProjects] = useState([]);
    
    useEffect( () => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(searchParam))}`)
            .then(async rsp => {
                if (rsp.ok) {
                    setAvailableProjects(await rsp.json()); 
                }
            })
    }, [searchParam]);

    useEffect( () => {
        fetch(`${apiUrl}/users`)
            .then( async rsp => {
                if (rsp.ok) {
                    setProjectOwners(await rsp.json());
                }
            })
    }, []);

    return (
        <div>
            <ProjectSearchPanel param={searchParam} setParam={setSearchParam} owners={projectOwners}></ProjectSearchPanel>
            <ProjectList projects={availableProjects} owners={projectOwners}></ProjectList>
        </div>
    );
}