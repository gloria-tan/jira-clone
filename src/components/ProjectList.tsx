import {Project, ProjectOwner} from "models/Model";

interface ProjectListProps {
    projects: Project[],
    owners: ProjectOwner[]
}

export const ProjectList = ({projects, owners}: ProjectListProps): JSX.Element => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                { projects.map(project => { return (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{owners.find( (owner) => owner.id === project.personId)?.name || '未知'}</td>
                    </tr>);
                }) }
            </tbody>
        </table>
    );
}