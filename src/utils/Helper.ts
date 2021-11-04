import { Parameters } from "models/Model";

export const isTrue = (value: any): boolean => value === 0 ? true : !!value;

export const cleanObject = (source: Parameters): object => {
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
