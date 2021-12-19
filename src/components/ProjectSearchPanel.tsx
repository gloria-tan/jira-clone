import { Grid, Typography, TextField, FormGroup, FormControl, FormLabel, Select, MenuItem, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { SearchParameter, ProjectOwner } from "models/Model";

interface ProjectSearchPanelProps {
    param: SearchParameter;
    owners: ProjectOwner[];
    setParam: (param: ProjectSearchPanelProps['param']) => void;
}

const useStyle = makeStyles( () => {
    return {
        searchInput: {
            flexGrow: 1
        },
        ownerSelection: {
            width: "160px"
        }
    }
});
export const ProjectSearchPanel = ({param, setParam, owners}: ProjectSearchPanelProps): JSX.Element => {

    const classes = useStyle();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h3">Project Search Panel</Typography>
            </Grid>
            <Grid item xs={12}>
            <form>
                {/* setParam(Object.assign({}, searchParam, {name: evt.target.name})) */}
                <input type="text" value={param.name} onChange={ evt => setParam({
                    ...param,
                    name: evt.target.value
                })} />
                <select value={param.personId} onChange={ (evt) => {setParam({
                    ...param,
                    personId: evt.target.value
                })}}>
                    <option value="">负责人</option>
                    { owners.map(owner => (
                        <option value={owner.id} key={owner.id}>{owner.name}</option>
                    ))}
                </select>
                    <FormGroup row>
                        <TextField id="searchInput"  className={classes.searchInput} label="Search name" variant="outlined" type="search" value={param.name} onChange={ e => setParam({
                            ...param,
                            name: e.target.value
                        })} />
                        <FormControl variant="outlined" className={classes.ownerSelection}>
                            <Select label="owner" value={param.personId} onChange={ (e) => setParam({
                                ...param,
                                personId: e.target.value as string
                            })}>
                                <MenuItem value=''>负责人</MenuItem>
                                {
                                    owners.map( (owner)=> (
                                        <MenuItem key={owner.id} value={String(owner.id)}>{owner.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </FormGroup>
                    


                </form>
            </Grid>
        </Grid>

    );
}