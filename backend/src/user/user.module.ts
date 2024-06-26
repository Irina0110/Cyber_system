import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import {EventService} from "../events/events.service";
import {EventEmitter2} from "@nestjs/event-emitter";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, EventService, EventEmitter2, JwtService],
})
export class UserModule {}
