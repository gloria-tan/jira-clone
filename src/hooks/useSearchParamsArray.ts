import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"

export const useSearchParamsArray = <T extends string>(keys: T[]) => {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const paramsArray = useMemo( () => {
        return keys.reduce( (prev, key) => {
            return {
                ...prev,
                [key]: searchParams.get(key) || ''
            }
        }, {} as { [key in T]: string});
    }, [searchParams]);

    return [paramsArray, setSearchParams] as const;

}
