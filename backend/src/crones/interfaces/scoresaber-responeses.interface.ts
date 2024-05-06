export interface ScoresaberResponse {
    id: string
    name: string
    profilePicture: string
    bio: any
    country: string
    pp: number
    rank: number
    countryRank: number
    role: any
    badges: any[]
    histories: string
    permissions: number
    banned: boolean
    inactive: boolean
    scoreStats: ScoreStats
    firstSeen: string
}

export interface ScoreStats {
    totalScore: number
    totalRankedScore: number
    averageRankedAccuracy: number
    totalPlayCount: number
    rankedPlayCount: number
    replaysWatched: number
}