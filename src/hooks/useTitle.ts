import { useEffect, useRef } from "react";

export const useTitle = (title: string) => {
    const originTitle = useRef(document.title).current;

    useEffect( () => {
        document.title = originTitle + " - " + title;

        return () => {
            document.title = originTitle;
        };
    }, [title, originTitle]);
}
