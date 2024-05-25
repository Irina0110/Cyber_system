import {API_RESPONSE} from "@/types/common.ts";
import {wrapper} from "@/services/wrapper.tsx";
import {PLAYER_PROFILE, PLAYER_STATISTICS} from "@/types/player.ts";

export const player = {
    profile: async (userId: number): Promise<API_RESPONSE<PLAYER_PROFILE>> => {
        return await wrapper.get<PLAYER_PROFILE>(`player/${userId}`)
            .then((response) => response);
    },
    statistics: async (userId: number): Promise<API_RESPONSE<PLAYER_STATISTICS>> => {
        return await wrapper.get<PLAYER_STATISTICS>(`player/statistics/${userId}`)
            .then((response) => response);
    },
}