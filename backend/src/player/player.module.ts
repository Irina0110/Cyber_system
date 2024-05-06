import {Module} from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import {PrismaService} from "../prisma.service";
import {UserService} from "../user/user.service";
import {EventService} from "../events/events.service";
import {EventEmitter2} from "@nestjs/event-emitter";

@Module({
  controllers: [PlayerController],
  providers: [PlayerService, PrismaService, UserService, EventService, EventEmitter2]
})
export class PlayerModule {}
