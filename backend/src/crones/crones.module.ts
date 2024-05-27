import { Module } from '@nestjs/common';
import { CronesService } from './crones.service';
import { CronesController } from './crones.controller';
import {ScheduleModule} from "@nestjs/schedule";
import {PlayerService} from "../player/player.service";
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";
import {EventService} from "../events/events.service";
import {EventEmitter2} from "@nestjs/event-emitter";
import {JwtService} from "@nestjs/jwt";
import {TeamService} from "../team/team.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CronesController],
  providers: [CronesService, PlayerService, TeamService, PrismaService, UserService, EventService, EventEmitter2, JwtService],
})
export class CronesModule {}
