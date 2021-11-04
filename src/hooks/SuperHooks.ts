import { useEffect, useState } from "react";
import { Parameters, Person } from "models/Model";

export const useMount = (callback: ()=> void) => {
    useEffect( () => {
        callback();
    }, []);
};

export const useDebounce = (value: Parameters, delay: number): Parameters => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect( () => {
        const timeout = setTimeout( () => setDebouncedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};

interface arrayReturns {
    value: Person[];
    clear: () => void;
    removeIndex: (index: number) => void;
    add: (name: string, age: number) => void;
}

export function useArray(arr: Person[]): arrayReturns {
    const [buffer, setBuffer] = useState(arr);

    function clear(): void {
        const emptyBuffer: Person[] = [];
        setBuffer(emptyBuffer);
    } 

    function removeIndex(index: number): void {
        const modified = buffer.filter( (d, i) => i === index);
        setBuffer(modified);
    }

    function add(name: string, age: number): void {
        const modified = [...buffer, {name: name, age: age}];
        setBuffer(modified);
    }

    return {
        value: buffer,
        clear,
        removeIndex,
        add
    }
}