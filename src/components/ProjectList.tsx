import {Project, ProjectOwner} from "models/Model";
import {DataGrid, GridColDef, GridColumns, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from 'dayjs';
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

interface ProjectListProps {
    projects: Project[],
    owners: ProjectOwner[]
}



const useStyles = makeStyles( () => {
    return {
        grid: {
            height: "500px"
        }
    };
});

export const ProjectList = ({projects, owners}: ProjectListProps): JSX.Element => {

    const classes = useStyles();

    const GRID_COLUMNS: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90, type: 'number' },
        { field: "name", headerName: "Name", width: 180, type: 'string' },
        { field: "ownerName", headerName: "Owner", flex: 1, valueGetter: (params: GridValueGetterParams) => {
            let ownerName = '';
            const ownerId = params.getValue(params.id, 'personId');
            if (ownerId) {
                ownerName = owners.find( (owner) => owner.id === ownerId )?.name || '';
            }
            return ownerName;
    
        }},
        { field: "organization", headerName: "Organization", width: 180, type: 'string' },
        { field: "creationDate", headerName: "Creation Date", width: 180, valueGetter: (params: GridValueGetterParams) => {
            const numCreated = params.getValue(params.id, 'created');
            if (numCreated && typeof numCreated === 'number') {
                return dayjs(numCreated).format('YYYY-MMM-DD');
            } else {
                return '';
            }
        } },
        { field: "action", headerName: "Action", width: 200, renderCell: (params: GridRenderCellParams) => {
            const id = params.getValue(params.id, 'id');
            if (id) {
                return (
                    <div>
                        <Button variant="outlined" color="primary" size="small" ><Link to={String(id)}>Edit</Link></Button>
                    </div>
                    
                );
            } else {
                return (
                    <div></div>
                );
            }

        } }
    ];

    return (
        <DataGrid rows={projects} columns={GRID_COLUMNS} pageSize={100} rowsPerPageOptions={[100]} autoHeight />


/*         <table>
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
        </table> */
    );
}