
export const ProjectList = ({projects: Project[], owners: ProjectOwner[]}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                { projects && projects.map(project => {
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>owners.find( (owner) => owner.id === project.personId?.name || 未知</td>
                    </tr>
                }) }
            </tbody>
        </table>
    );
}