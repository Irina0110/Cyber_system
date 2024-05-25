import {wrapper} from "@/services/wrapper.tsx";
import {
    AUTH_LOGIN,
    AUTH_SIGN_UP,
    AUTH_SIGN_UP_RESPONSE, AUTH_STATUS, CHECK_TOCKEN,
    CHECK_TOCKEN_RESPONSE
} from "@/types/auth.ts";
import {API_RESPONSE} from "@/types/common.ts";

export const auth = {
    login: async (body: AUTH_LOGIN ): Promise<API_RESPONSE<AUTH_STATUS>> => {
        return await wrapper.post<AUTH_LOGIN, AUTH_STATUS>(`auth/login`, body)
            .then((response) => response);
    },
    signup: async (body: AUTH_SIGN_UP ): Promise<API_RESPONSE<AUTH_SIGN_UP_RESPONSE>> => {
        return await wrapper.post<AUTH_SIGN_UP, AUTH_SIGN_UP_RESPONSE>(`auth/register`, body)
            .then((response) => response);
    },
    checkToken: async (body: CHECK_TOCKEN): Promise<API_RESPONSE<CHECK_TOCKEN_RESPONSE>> => {
        return await wrapper.post<CHECK_TOCKEN, CHECK_TOCKEN_RESPONSE>(`auth/check-token`, body)
            .then((response) => response);
    },
    status: async (): Promise<API_RESPONSE<AUTH_STATUS>> => {
        return await wrapper.get<AUTH_STATUS>(`auth/profile`)
            .then((response) => response);
    },
}