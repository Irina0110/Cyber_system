import {wrapper} from "@/services/wrapper.tsx";
import {AUTH_LOGIN, AUTH_LOGIN_RESPONSE} from "@/types/auth.ts";
import {API_RESPONSE} from "@/types/common.ts";

export const auth = {
    login: async (body: AUTH_LOGIN ): Promise<API_RESPONSE<AUTH_LOGIN_RESPONSE>> => {
        return await wrapper.post<AUTH_LOGIN, AUTH_LOGIN_RESPONSE>(`auth/login`, body)
            .then((response) => response);
    }
}