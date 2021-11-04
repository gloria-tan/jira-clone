export type ProjectOwner = {
    id: number;
    name: string;
};

export type Project = {
    id: number;
    name: string;
    personId: number;
    organization: string;
    created: number;
};

export type SearchParameter = {
    name: string;
    personId: string; 
};

export type Parameters = { [key: string]: unknown };

export interface Person {
    name: string;
    age: number;
}