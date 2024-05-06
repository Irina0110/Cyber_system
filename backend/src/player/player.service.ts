import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePlayerDto} from './dto/create-player.dto';
import {UpdatePlayerDto} from './dto/update-player.dto';
import {PrismaService} from "../prisma.service";
import {Player} from "../../prisma/generated";
import {UserService} from "../user/user.service";
import {EventService} from "../events/events.service";

@Injectable()
export class PlayerService {

    constructor(private prisma: PrismaService, private readonly userService: UserService, private readonly eventService: EventService) {
        this.eventService.onUserCreatedAsPlayer(this.create.bind(this));
    }

    async create(playerDto: CreatePlayerDto): Promise<CreatePlayerDto> {
        const {userId} = playerDto;

        const existingPlayer = await this.prisma.player.findUnique({where: {userId}});

        if (existingPlayer) {
            throw new NotFoundException('Player already exists');
        }

        const newPlayer = await this.prisma.player.create({
            data: {
                userId
            },
        });

        await this.userService.setRoleId(userId, newPlayer.id, 'PLAYER')
        return this._toPlayerDto(newPlayer);
    }

    findPlayersByTeamId(teamId: number) {
        return this.prisma.player.findMany({
            where: {
                teamId
            }
        });
    }

    findPlayersToUpdate() {
        return this.prisma.player.findMany({
            where: { beatLeaderId: { not: null } },
        });
    }

    findOne(id: number) {
        return this.prisma.player.findFirst({
            where: {
                id
            }
        });
    }

    update(id: number, playerInfo: UpdatePlayerDto) {
        return this.prisma.player.update({
            data: {
                beatLeaderId: playerInfo.beatLeaderId?.toString(),
                scoreSaberId: playerInfo.scoreSaberId?.toString(),
            },
            where: {
                id
            }
        });
    }

    private _toPlayerDto(player: Player): CreatePlayerDto {
        const {id, userId} = player;
        return {id, userId};
    }
}
