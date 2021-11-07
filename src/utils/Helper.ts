import { StringObject } from "models/Model";

const isVoid = (value: unknown): boolean => {
    if ( (value === undefined) || (value == null) || (value === '') ) {
        return true;
    } else {
        return false;
    }
}

export const cleanObject = (source: StringObject): object => {
    // Object.assign({}, object);
    const cleaned = {...source};
    Object.keys(cleaned).forEach( (key) => {
        // 0
        const value = cleaned[key];
        if (isVoid(value)) {
            delete cleaned[key];
        }
    });

    return cleaned;
};
