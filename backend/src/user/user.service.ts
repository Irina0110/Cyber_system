import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {compare, genSalt, hash} from 'bcrypt';
import {PrismaService} from '../prisma.service';
import {$Enums, User} from '../../prisma/generated';
import * as bcrypt from 'bcrypt';
import {EventService} from "../events/events.service";
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly eventService: EventService
    ) {
    }

    async findOne(options): Promise<CreateUserDto | null> {
        const user = await this.prisma.user.findUnique(options);
        return user ? this._toUserDto(user) : null;
    }

    async findByLogin({
                          username,
                          password,
                      }: {
        username: string;
        password: string;
    }): Promise<CreateUserDto> {
        const user = await this.prisma.user.findUnique({where: {username}});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const areEqual = await compare(password, user.password);

        if (!areEqual) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this._toUserDto(user);
    }

    async findByPayload({
                            username,
                        }: {
        username: string;
    }): Promise<CreateUserDto> {
        return this.findOne({where: {username}});
    }

    async findByEmail(email: string): Promise<CreateUserDto> {
        return this.findOne({where: {email}});
    }

    async create(userDto: CreateUserDto): Promise<CreateUserDto> {
        const {username, password, email, role} = userDto;

        const existingUser = await this.prisma.user.findUnique({
            where: {username},
        });
        const existingUserByEmail = await this.prisma.user.findUnique({
            where: {email},
        });
        if (existingUser) {
            throw new NotFoundException('This username is already used');
        }

        if (existingUserByEmail) {
            throw new NotFoundException('This email is already used');
        }

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);

        const newUser = await this.prisma.user.create({
            data: {
                username,
                password: hashPassword,
                email,
                role,
            },
        });

        // Определение события в зависимости от роли пользователя
        if (role === 'PLAYER') {
            await this.eventService.userCreatedAsPlayer({ role, userId: newUser.id });
        } else if (role === 'COACH') {
            await this.eventService.userCreatedAsCoach({ role, userId: newUser.id });
        }
        return this._toUserDto(newUser);
    }

    async updatePassword(userId: number, newPassword: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpires: null,
            },
        });
    }

    async verifyResetPasswordToken(token: string): Promise<number | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpires: {
                    gte: new Date(),
                },
            },
            select: {
                id: true,
            },
        });

        return user ? user.id : null;
    }

    async setResetPasswordToken(userId: number, token: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                resetPasswordToken: token,
                resetPasswordTokenExpires: new Date(
                    new Date().getTime() + process.env.TOKEN_EXPIRES_IN,
                ),
            },
        });
    }

    async setRoleId(userId: number, roleId: number, role: $Enums.Role): Promise<void> {
        let data
        if(role === 'PLAYER') {
            data = {
                playerId: roleId
            }
        } else if (role === 'COACH') {
            data = {
                coachId: roleId
            }
        }
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: data,
        });
    }

    private _toUserDto(user: User): CreateUserDto {
        const {id, username, email, role, password} = user;
        return {id, username, email, role, password};
    }
}
