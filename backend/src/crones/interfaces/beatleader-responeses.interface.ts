export interface UserInfo {
    mapperId: number
    banned: boolean
    inactive: boolean
    banDescription: any
    externalProfileUrl: string
    richBioTimeset: number
    history: any
    badges: any[]
    pinnedScores: any
    changes: any[]
    accPp: number
    passPp: number
    techPp: number
    scoreStats: ScoreStats
    lastWeekPp: number
    lastWeekRank: number
    lastWeekCountryRank: number
    id: string
    name: string
    platform: string
    avatar: string
    country: string
    bot: boolean
    pp: number
    rank: number
    countryRank: number
    role: string
    socials: any[]
    contextExtensions: any
    patreonFeatures: any
    profileSettings: ProfileSettings
    clanOrder: string
    clans: Clan[]
}

export interface ScoreStats {
    id: number
    totalScore: number
    totalUnrankedScore: number
    totalRankedScore: number
    lastScoreTime: number
    lastUnrankedScoreTime: number
    lastRankedScoreTime: number
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
}

export interface ProfileSettings {
    id: number
    bio: any
    message: any
    effectName: string
    profileAppearance: string
    hue: number
    saturation: number
    leftSaberColor: any
    rightSaberColor: any
    profileCover: any
    starredFriends: string
    showBots: boolean
    showAllRatings: boolean
    showStatsPublic: boolean
}

export interface Clan {
    id: number
    tag: string
    color: string
    name: any
}
