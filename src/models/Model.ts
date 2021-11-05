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
};

export type LoginCombination = {
    email: string;
    password: string;
};

export type AuthCredential = {
    email: string;
    token: string;
};

export interface AuthProvider {
    credential: AuthCredential | null ;
    login: ({email, password}: LoginCombination) => Promise<void>;
    logout: () => Promise<boolean>;
}