
export const isTrue = (value: any): boolean => value === 0 ? true : !!value;

export const cleanObject = (object: object): object => {
    // Object.assign({}, object);
    let result: object = {...object};
    Object.keys(result).forEach( (key) => {
        // 0
        const value = result[key];
        if (!isTrue(value)) {
            delete result[key];
        }
    });

    return result;
};