import { useAuthState } from "components/AuthState";
import { StringObject } from "models/Model";
import * as qs from "qs";
import { cleanObject } from "utils/Helper";

export interface HttpConfig extends RequestInit {
    data?: object;
    token?: string;
}
export const secureFetch = (endpoint: string, {data, token, headers, ...config }: HttpConfig = {}) => {

    const BASE_URL = process.env.REACT_APP_API_URL;
    let api = endpoint;

    const defaultConfig: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": data ? "application/json" : "",
            "Authorization": token ? `Bear ${token}` : "",
            ...headers
        },
        ...config
    };

    if (defaultConfig.method?.toUpperCase() === "POST") {
        defaultConfig.body = JSON.stringify(data);
    } else {
        api += `?${qs.stringify(cleanObject(data as StringObject))}`;
    }

    return window.fetch(`${BASE_URL}/${api}`, defaultConfig);
}

export const useHttp = () => {
    const authState = useAuthState();

    const credential = authState?.credential;
    const token = credential?.token || ""

    return secureFetch()
};