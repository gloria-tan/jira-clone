import { ProjectSearchPanel } from "components/ProjectSearchPanel";
import { ProjectList } from "components/ProjectList";
import { useEffect, useState } from "react";
import { useDebounce } from "hooks/SuperHooks";
import { Project, ProjectOwner } from "models/Model";
import { useHttpApi } from 'hooks/useHttpApi';
import { API_URLS } from 'apiurl';
import { useTitle } from "hooks/useTitle";

export const ProjectOverviewPage = () => {

    // Set title
    useTitle("Project Overview");

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
    
    // Http call
    const httpApi = useHttpApi();

    useEffect( () => {
        httpApi(API_URLS.projects, {data: debouncedParam})
            .then( projects => {
                setAvailableProjects(projects);
            })
            .catch( err => {
                console.log(`Èrror happend while getting projects ${err}`);
            });
    }, [debouncedParam]);

    useEffect( () => {
        httpApi(API_URLS.users)
            .then( users => {
                setProjectOwners(users);
            })
            .catch( err => {
                console.log(`Èrror happend while getting users ${err}`);
            });
    }, []);

    return (
        <div>
            <ProjectSearchPanel param={searchParam} setParam={setSearchParam} owners={projectOwners}></ProjectSearchPanel>
            <ProjectList projects={availableProjects} owners={projectOwners}></ProjectList>
        </div>
    );
}