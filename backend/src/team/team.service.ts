import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {PrismaService} from "../prisma.service";
import {Team} from "../../prisma/generated";
import {PlayerService} from "../player/player.service";

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService, private readonly playersService: PlayerService) {
    }

    async create(teamDto: CreateTeamDto) {
        const {name, coachId} = teamDto;

        const coach = await this.prisma.coach.findUnique({where: {id: coachId}});

        if (!coach) {
            throw new NotFoundException('Coach not found');
        }

        const newTeam = await this.prisma.team.create({
            data: {
                name, coachId, coachName: coach.username
            },
        });

        return this._toTeamDto(newTeam)
    }

    findAllTeamWithCoach(coachId: number) {
        return this.prisma.team.findMany({
            where: {
                coachId
            }
        });
    }

    findAll() {
        return this.prisma.team.findMany();
    }

    async findOne(id: number) {
        const allTeamPlayers =  await this.playersService.findPlayersByTeamId(id)
        let totalPPBeatLeader = 0;
        let totalPPScoreSaber = 0;

        await Promise.all(allTeamPlayers.map(async (player) => {
            const playerStatistics = await this.playersService.getPlayerStatistics(player.userId);
            if (playerStatistics.beatLeaderStatistics) {
                totalPPBeatLeader += playerStatistics.beatLeaderStatistics.pp;
            }
            if (playerStatistics.scoreSaberStatistics) {
                totalPPScoreSaber += playerStatistics.scoreSaberStatistics.pp
            }
        }))

        await this.update(id, {
            totalPPScoreSaber: `${totalPPScoreSaber}`,
            totalPPBeatLeader: `${totalPPBeatLeader}`
        });

        return this.prisma.team.findUnique({
            where: {
                id: id
            }
        });
    }

    update(id: number, teamInfo: UpdateTeamDto) {
        return this.prisma.team.update({
            data: teamInfo,
            where: {
                id
            }
        });
    }

    private _toTeamDto(team: Team): CreateTeamDto {
        const {id, name, coachId, coachName} = team;
        return {id, name, coachId, coachName};
    }
}
