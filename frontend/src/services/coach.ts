import {API_RESPONSE} from "@/types/common.ts";
import {wrapper} from "@/services/wrapper.tsx";
import {COACH_PROFILE} from "@/types/coach.ts";
import {TEAM} from "@/types/team.ts";

export const coachServices = {
    profile: async (userId: number): Promise<API_RESPONSE<COACH_PROFILE>> => {
        return await wrapper.get<COACH_PROFILE>(`coach/${userId}`)
            .then((response) => response);
    },
    teams: async (coachId: number): Promise<API_RESPONSE<TEAM[]>> => {
        return await wrapper.get<TEAM[]>(`team/coach/${coachId}`)
            .then((response) => response);
    },
}