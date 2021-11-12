import { useParams } from 'react-router';
import { Project } from '../models/Model';

export const ProjectDetailsPage = () => {

    const param = useParams();
    
    return (
        <div>
            Project Details {param.project_id}
        </div>
    );
}