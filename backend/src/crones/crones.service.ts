import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import axios from 'axios';
import {PlayerService} from "../player/player.service";
import {PrismaService} from "../prisma.service";
import {UserInfo} from "./interfaces/beatleader-responeses.interface";
import {ScoresaberResponse} from "./interfaces/scoresaber-responeses.interface";
import {TeamService} from "../team/team.service";

@Injectable()
export class CronesService {
    constructor(private readonly playersService: PlayerService, private readonly teamsService: TeamService, private readonly prismaService: PrismaService) {
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async updatePlayersData() {
        try {
            const playersToUpdate = await this.playersService.findPlayersToUpdate();
            await Promise.all(
                playersToUpdate.map(async (player) => {
                    try {
                        const response = await axios.get<UserInfo>(
                            `https://api.beatleader.xyz/player/${player.beatLeaderId}?stats=true&keepOriginalId=false`,
                        );
                        const userData = await this.prismaService.beatLeaderStatistics.findUnique({where: {playerId: player.id}})
                        const updateData = {
                            playerId: player.id,
                            totalScore: response.data.scoreStats.totalScore.toString(),
                            totalUnrankedScore: response.data.scoreStats.totalUnrankedScore.toString(),
                            totalRankedScore: response.data.scoreStats.totalRankedScore.toString(),
                            lastScoreTime: response.data.scoreStats.lastScoreTime.toString(),
                            lastUnrankedScoreTime: response.data.scoreStats.lastUnrankedScoreTime.toString(),
                            lastRankedScoreTime: response.data.scoreStats.lastRankedScoreTime.toString(),
                            averageRankedAccuracy: response.data.scoreStats.averageRankedAccuracy,
                            averageWeightedRankedAccuracy: response.data.scoreStats.averageWeightedRankedAccuracy,
                            averageUnrankedAccuracy: response.data.scoreStats.averageUnrankedAccuracy,
                            averageAccuracy: response.data.scoreStats.averageAccuracy,
                            medianRankedAccuracy: response.data.scoreStats.medianRankedAccuracy,
                            medianAccuracy: response.data.scoreStats.medianAccuracy,
                            topRankedAccuracy: response.data.scoreStats.topRankedAccuracy,
                            topUnrankedAccuracy: response.data.scoreStats.topUnrankedAccuracy,
                            topAccuracy: response.data.scoreStats.topAccuracy,
                            topPp: response.data.scoreStats.topPp,
                            topBonusPP: response.data.scoreStats.topBonusPP,
                            topPassPP: response.data.scoreStats.topPassPP,
                            topAccPP: response.data.scoreStats.topAccPP,
                            topTechPP: response.data.scoreStats.topTechPP,
                            peakRank: response.data.scoreStats.peakRank,
                            rankedMaxStreak: response.data.scoreStats.rankedMaxStreak,
                            unrankedMaxStreak: response.data.scoreStats.unrankedMaxStreak,
                            maxStreak: response.data.scoreStats.maxStreak,
                            averageLeftTiming: response.data.scoreStats.averageLeftTiming,
                            averageRightTiming: response.data.scoreStats.averageRightTiming,
                            rankedPlayCount: response.data.scoreStats.rankedPlayCount,
                            unrankedPlayCount: response.data.scoreStats.unrankedPlayCount,
                            totalPlayCount: response.data.scoreStats.totalPlayCount,
                            rankedImprovementsCount: response.data.scoreStats.rankedImprovementsCount,
                            unrankedImprovementsCount: response.data.scoreStats.unrankedImprovementsCount,
                            totalImprovementsCount: response.data.scoreStats.totalImprovementsCount,
                            rankedTop1Count: response.data.scoreStats.rankedTop1Count,
                            unrankedTop1Count: response.data.scoreStats.unrankedTop1Count,
                            top1Count: response.data.scoreStats.top1Count,
                            rankedTop1Score: response.data.scoreStats.rankedTop1Score,
                            unrankedTop1Score: response.data.scoreStats.unrankedTop1Score,
                            top1Score: response.data.scoreStats.top1Score,
                            averageRankedRank: response.data.scoreStats.averageRankedRank,
                            averageWeightedRankedRank: response.data.scoreStats.averageWeightedRankedRank,
                            averageUnrankedRank: response.data.scoreStats.averageUnrankedRank,
                            averageRank: response.data.scoreStats.averageRank,
                            sspPlays: response.data.scoreStats.sspPlays,
                            ssPlays: response.data.scoreStats.ssPlays,
                            spPlays: response.data.scoreStats.spPlays,
                            sPlays: response.data.scoreStats.sPlays,
                            aPlays: response.data.scoreStats.aPlays,
                            topPlatform: response.data.scoreStats.topPlatform,
                            topHMD: response.data.scoreStats.topHMD,
                            topPercentile: response.data.scoreStats.topPercentile,
                            countryTopPercentile: response.data.scoreStats.countryTopPercentile,
                            dailyImprovements: response.data.scoreStats.dailyImprovements,
                            authorizedReplayWatched: response.data.scoreStats.authorizedReplayWatched,
                            anonimusReplayWatched: response.data.scoreStats.anonimusReplayWatched,
                            watchedReplays: response.data.scoreStats.watchedReplays,
                            accPp: response.data.accPp,
                            passPp: response.data.passPp,
                            techPp: response.data.techPp,
                            lastWeekPp: response.data.lastWeekPp,
                            lastWeekRank: response.data.lastWeekRank,
                            lastWeekCountryRank: response.data.lastWeekCountryRank,
                            pp: response.data.pp,
                            rank: response.data.rank,
                            countryRank: response.data.countryRank
                        }
                        await this.prismaService.player.update({
                            where: {id: player.id},
                            data: {
                                avatar: response.data.avatar
                            }
                        })
                        if (userData) {
                            await this.prismaService.beatLeaderStatistics.update({
                                where: {playerId: player.id}, data: updateData
                            })
                        } else {
                            await this.prismaService.beatLeaderStatistics.create({
                                data: updateData
                            })
                        }
                    } catch (error) {
                        console.error(
                            `Ошибка при обновлении данных для пользователя с ID ${player.id}:`,
                            error,
                        );
                    }
                }),
            );

            await Promise.all(
                playersToUpdate.map(async (player) => {
                    try {
                        const response = await axios.get<ScoresaberResponse>(
                            `https://scoresaber.com/api/player/${player.beatLeaderId}/full`,
                        );
                        const userData = await this.prismaService.scoreSaberStatistics.findUnique({where: {playerId: player.id}})
                        const updateData = {
                            playerId: player.id,
                            totalScore: response.data.scoreStats.totalScore.toString(),
                            totalRankedScore: response.data.scoreStats.totalRankedScore.toString(),
                            averageRankedAccuracy: response.data.scoreStats.averageRankedAccuracy,
                            rankedPlayCount: response.data.scoreStats.rankedPlayCount,
                            totalPlayCount: response.data.scoreStats.totalPlayCount,
                            replaysWatched: response.data.scoreStats.replaysWatched,
                            pp: response.data.pp,
                            rank: response.data.rank,
                            countryRank: response.data.countryRank
                        }
                        if (userData) {
                            await this.prismaService.scoreSaberStatistics.update({
                                where: {playerId: player.id}, data: updateData
                            })
                        } else {
                            await this.prismaService.scoreSaberStatistics.create({
                                data: updateData
                            })
                        }
                    } catch (error) {
                        console.error(
                            `Ошибка при обновлении данных для пользователя с ID ${player.id}:`,
                            error,
                        );
                    }
                }),
            );

        } catch (error) {
            console.error('Ошибка при получении списка пользователей:', error);
        }
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async updateTeamStatistics() {
        try {
            const teamsToUpdate = await this.teamsService.findAll();
            await Promise.all(
                teamsToUpdate.map(async (team) => {
                    try {
                        let totalPPBeatLeader = 0;
                        let totalPPScoreSaber = 0;
                        const allTeamPlayers = await this.playersService.findPlayersByTeamId(team.id)

                        await Promise.all(allTeamPlayers.map(async (player) => {
                            const playerStatistics = await this.playersService.getPlayerStatistics(player.userId);
                            if (playerStatistics.beatLeaderStatistics) {
                                totalPPBeatLeader += playerStatistics.beatLeaderStatistics.pp;
                            }
                            if (playerStatistics.scoreSaberStatistics) {
                                totalPPScoreSaber += playerStatistics.scoreSaberStatistics.pp
                            }
                        }))

                        await this.teamsService.update(team.id, {
                            totalPPScoreSaber: `${totalPPScoreSaber}`,
                            totalPPBeatLeader: `${totalPPBeatLeader}`
                        })
                    } catch (error) {
                        console.error(
                            `Ошибка при обновлении данных для команды с ID ${team.id}:`,
                            error,
                        );
                    }
                }))

        } catch (error) {
            console.error('Ошибка при получении списка команд:', error);
        }
    }
}
