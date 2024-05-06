import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventsController } from './events.controller';
import {EventEmitter2} from "@nestjs/event-emitter";

@Module({
  controllers: [EventsController],
  providers: [EventService, EventEmitter2],
})
export class EventsModule {}
