export type TEAM = {
    id: number;
    name: string;
    coachId: number | null;
    coachName: string | null;
    totalPPBeatLeader: string | null;
    totalPPScoreSaber: string | null;
    playersCount?: number;
}

export type CREATE_TEAM = Pick<TEAM, 'coachId' | 'name'>