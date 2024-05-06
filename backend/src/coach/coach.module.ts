import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";
import {EventService} from "../events/events.service";
import {EventEmitter2} from "@nestjs/event-emitter";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [CoachController],
  providers: [CoachService, PrismaService, UserService, EventService, EventEmitter2, JwtService],
})
export class CoachModule {}
