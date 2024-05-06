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
        const {userId} = coachDto;
        const existingCoach = await this.prisma.coach.findUnique({where: {userId}});

        if (existingCoach) {
            throw new NotFoundException('Coach already exists');
        }

        const newCoach = await this.prisma.coach.create({
            data: {
                userId
            },
        });

        await this.userService.setRoleId(userId, newCoach.id, 'COACH')
        return this._toCoachDto(newCoach);
    }

    findAll() {
        return `This action returns all coach`;
    }

    findOne(id: number) {
        return `This action returns a #${id} coach`;
    }

    update(id: number, updateCoachDto: UpdateCoachDto) {
        return `This action updates a #${id} coach`;
    }

    remove(id: number) {
        return `This action removes a #${id} coach`;
    }

    private _toCoachDto(coach: Coach): CreateCoachDto {
        const {id, userId} = coach;
        return {id, userId};
    }
}
