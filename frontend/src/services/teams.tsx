import {API_RESPONSE} from "@/types/common.ts";
import {wrapper} from "@/services/wrapper.tsx";
import {CREATE_TEAM, TEAM} from "@/types/team.ts";

export const teams = {
    getAllTeams: async (): Promise<API_RESPONSE<TEAM[]>> => {
        return await wrapper.get<TEAM[]>(`team`)
            .then((response) => response);
    },
    team: async (id: string): Promise<API_RESPONSE<TEAM>> => {
        return await wrapper.get<TEAM>(`team/${id}`)
            .then((response) => response);
    },
    createTeam: async (body: CREATE_TEAM): Promise<API_RESPONSE<TEAM>> => {
        return await wrapper.post<CREATE_TEAM, TEAM>(`team`, body)
            .then((response) => response);
    },
}