import { useEffect, useState } from "react";



export const ProjectSearchPanel = ({param, setParam, owners: ProjectOwner[]}) => {

    return (
        <div>
            <h2>Project Search Panel</h2>
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
                        <option value="owner.id" key={owner.id}>owner.name</option>
                    ))}
                </select>
            </form>
        </div>

    );
}