import { ProjectSearchPanel } from "components/ProjectSearchPanel";
import { ProjectList } from "components/ProjectList";
import { useEffect, useState } from "react";
import { cleanObject } from "utils/Helper";
import qs from "qs";
import { useDebounce } from "hooks/SuperHooks";
import { Project, ProjectOwner } from "models/Model";
import { useHttp } from 'hooks/useHttp';
import { API_URLS } from 'apiurl';

export const ProjectOverviewPage = () => {
    const secureFetch = useHttp();

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
        secureFetch(API_URLS.projects, {data: debouncedParam})
        .then( projects => setAvailableProjects(projects))
        .catch( err => {
            console.log(`Èrror happend while getting projects ${err}`);
        });

    }, [debouncedParam]);

    useEffect( () => {
        secureFetch(API_URLS.users)
        .then( users => setProjectOwners(users))
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