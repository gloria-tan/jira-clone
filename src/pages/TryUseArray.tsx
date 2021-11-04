import { useArray, useMount } from "hooks/SuperHooks";

export const TryUseArray = () => {
    const people: { name: string, age: number}[] = [
        { name: "jack", age: 25},
        { name: "ma", age: 23}
    ];
    
    const {value, clear, removeIndex, add} = useArray(people);
    
/*     useMount( () => {
        console.log(value.notExist);
    
        add( {name: "dayid"} );
    
        removeIndex("123");
    }); */

    return (
        <div>
            <button onClick={() => add("john", 22)}>add John</button>
        </div>
    );
}


