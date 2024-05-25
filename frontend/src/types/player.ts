export type PLAYER_PROFILE = {
    id: number,
    userId: number,
    name: string,
    avatar: string,
    teamId: number | null,
    teamName: string | null,
    scoreSaberId: string | null,
    beatLeaderId: string | null
}

export type BEATLEADER_STATISTICS = {
    id: number
    playerId: number
    accPp: number
    passPp: number
    techPp: number
    totalScore: string
    totalUnrankedScore: string
    totalRankedScore: string
    lastScoreTime: string
    lastUnrankedScoreTime: string
    lastRankedScoreTime: string
    averageRankedAccuracy: number
    averageWeightedRankedAccuracy: number
    averageUnrankedAccuracy: number
    averageAccuracy: number
    medianRankedAccuracy: number
    medianAccuracy: number
    topRankedAccuracy: number
    topUnrankedAccuracy: number
    topAccuracy: number
    topPp: number
    topBonusPP: number
    topPassPP: number
    topAccPP: number
    topTechPP: number
    peakRank: number
    rankedMaxStreak: number
    unrankedMaxStreak: number
    maxStreak: number
    averageLeftTiming: number
    averageRightTiming: number
    rankedPlayCount: number
    unrankedPlayCount: number
    totalPlayCount: number
    rankedImprovementsCount: number
    unrankedImprovementsCount: number
    totalImprovementsCount: number
    rankedTop1Count: number
    unrankedTop1Count: number
    top1Count: number
    rankedTop1Score: number
    unrankedTop1Score: number
    top1Score: number
    averageRankedRank: number
    averageWeightedRankedRank: number
    averageUnrankedRank: number
    averageRank: number
    sspPlays: number
    ssPlays: number
    spPlays: number
    sPlays: number
    aPlays: number
    topPlatform: string
    topHMD: number
    topPercentile: number
    countryTopPercentile: number
    dailyImprovements: number
    authorizedReplayWatched: number
    anonimusReplayWatched: number
    watchedReplays: number
    lastWeekPp: number
    lastWeekRank: number
    lastWeekCountryRank: number
    pp: number
    rank: number
    countryRank: number
}

export type SCORESABER_STATISTICS = {
    id: number
    playerId: number
    pp: number
    rank: number
    countryRank: number
    totalScore: string
    totalRankedScore: string
    averageRankedAccuracy: number
    totalPlayCount: number
    rankedPlayCount: number
    replaysWatched: number
}

export type PLAYER_STATISTICS = {
    beatLeaderStatistics: BEATLEADER_STATISTICS,
    scoreSaberStatistics: SCORESABER_STATISTICS
}