import { useAuthState } from "components/AuthState";
import { StringObject } from "models/Model";
import { hasUncaughtExceptionCaptureCallback } from "process";
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
            "Authorization": token ? `Bearer ${token}` : "",
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

export const useHttpApi = () => {
    const authState = useAuthState();

    const credential = authState?.credential;
    const token = credential?.token;

    const logout = authState?.logout ;

    return (...[endpoint, config]: Parameters<typeof secureFetch>) => {
        return secureFetch(endpoint, {
            token,
            ...config
        })
        .then(rsp => {
            if ( rsp.status === 401 ) {
                console.log(`${endpoint} access rejected.`);
                if (logout) {
                    logout(true);
                }
                return Promise.reject(new Error("Authorization is needed"));
            }

            if (rsp.ok) {
                return rsp.json();
            } else {
                console.log(`${endpoint} returns a wrong response, code is ${rsp.status}`);
                return Promise.reject(new Error(`${endpoint} API calls failed.`));
            }
        });
    };
};
