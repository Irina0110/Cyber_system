import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {PlayerService} from "../player/player.service";
import {UserService} from "../user/user.service";
import {EventService} from "../events/events.service";
import {EventEmitter2} from "@nestjs/event-emitter";

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService, JwtService, PlayerService, UserService, EventService, EventEmitter2],
})
export class TeamModule {}
