import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCoachDto} from './dto/create-coach.dto';
import {UpdateCoachDto} from './dto/update-coach.dto';
import {Coach} from "../../prisma/generated";
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";
import {EventService} from "../events/events.service";

@Injectable()
export class CoachService {
    constructor(private prisma: PrismaService, private readonly userService: UserService, private readonly eventService: EventService) {
        this.eventService.onUserCreatedAsCoach(this.create.bind(this));
    }

    async create(coachDto: CreateCoachDto): Promise<CreateCoachDto> {
        const {userId, username} = coachDto;
        const existingCoach = await this.prisma.coach.findUnique({where: {userId}});

        if (existingCoach) {
            throw new NotFoundException('Coach already exists');
        }

        const newCoach = await this.prisma.coach.create({
            data: {
                userId, username
            },
        });

        await this.userService.setRoleId(userId, newCoach.id, 'COACH')
        return this._toCoachDto(newCoach);
    }

    findOne(id: number) {
        return this.prisma.coach.findFirst({
            where: {
                userId: id
            }
        });
    }

    update(id: number, coachInfo: UpdateCoachDto) {
        return this.prisma.coach.update({
            data: coachInfo,
            where: {
                id
            }
        });
    }


    private _toCoachDto(coach: Coach): CreateCoachDto {
        const {id, userId, username} = coach;
        return {id, userId, username};
    }
}
