import {API_RESPONSE} from "@/types/common.ts";
import {wrapper} from "@/services/wrapper.tsx";
import {PLAYER_PROFILE, PLAYER_STATISTICS, PLAYER_TEAM} from "@/types/player.ts";

export const player = {
    profile: async (userId: number): Promise<API_RESPONSE<PLAYER_PROFILE>> => {
        return await wrapper.get<PLAYER_PROFILE>(`player/${userId}`)
            .then((response) => response);
    },
    statistics: async (userId: number): Promise<API_RESPONSE<PLAYER_STATISTICS>> => {
        return await wrapper.get<PLAYER_STATISTICS>(`player/statistics/${userId}`)
            .then((response) => response);
    },
    teamPlayers: async (teamId: string): Promise<API_RESPONSE<PLAYER_PROFILE[]>> => {
        return await wrapper.get<PLAYER_PROFILE[]>(`player/team/${teamId}`)
            .then((response) => response);
    },
    playerTeam: async (playerId: number, body: PLAYER_TEAM): Promise<API_RESPONSE<PLAYER_PROFILE>> => {
        return await wrapper.patch<PLAYER_TEAM, PLAYER_PROFILE>(`player/${playerId}`, body)
            .then((response) => response);
    },
}