import {API_RESPONSE} from "@/types/common.ts";
import {routes} from "@/router/routes.ts";

const urlBase = '/api/';

export const wrapper = {
    get,
    post,
    patch
};

const fetchHeaders = (isPrivate: boolean) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (isPrivate) {
        const token = localStorage.getItem('token');
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

function get<T>(url: string): Promise<API_RESPONSE<T>> {
    const isPrivate = !(Object.values(routes.auth).includes(url));
    const params = {
        method: 'GET',
        headers: fetchHeaders(isPrivate)
    };

    return fetch(`${urlBase}${url}`, params)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.clear();
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => ({
            data,
            status: 200,
            statusText: 'OK'
        }))
        .catch((error) => {
            console.log('Error:', error);
            throw error;
        });
}

function post<RequestBody, ResponseBody>(url: string, body: RequestBody): Promise<API_RESPONSE<ResponseBody>> {
    const isPrivate = !(Object.values(routes.auth).includes(url));
    const params = {
        method: 'POST',
        headers: fetchHeaders(isPrivate),
        body: JSON.stringify(body)
    };

    return fetch(`${urlBase}${url}`, params)
        .then((response) => {
            if (response.status === 401 || response.status === 404) {
                localStorage.clear();
                throw new Error('Error')
            }
            return response.json();
        })
        .then((data) => ({
            data,
            status: data.status,
            statusText: 'OK'
        }))
        .catch((error) => {
            console.log('Error:', error);
            return error;
        });
}

function patch<RequestBody, ResponseBody>(url: string, body: RequestBody): Promise<API_RESPONSE<ResponseBody>> {
    const isPrivate = !(Object.values(routes.auth).includes(url));
    const params = {
        method: 'PATCH',
        headers: fetchHeaders(isPrivate),
        body: JSON.stringify(body)
    };

    return fetch(`${urlBase}${url}`, params)
        .then((response) => {
            if (response.status === 401) {
                localStorage.clear();
            }
            return response.json();
        })
        .then((data) => ({
            data,
            status: data.status,
            statusText: 'OK'
        }))
        .catch((error) => {
            console.log('Error:', error);
            return error;
        });
}
