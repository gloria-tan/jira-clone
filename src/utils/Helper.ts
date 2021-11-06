import { StringObject } from "models/Model";

export const isTrue = (value: any): boolean => value === 0 ? true : !!value;

export const cleanObject = (source: StringObject): object => {
    // Object.assign({}, object);
    const cleaned = {...source};
    Object.keys(cleaned).forEach( (key) => {
        // 0
        const value = cleaned[key];
        if (!isTrue(value)) {
            delete cleaned[key];
        }
    });

    return cleaned;
};
