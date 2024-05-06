import { Module } from '@nestjs/common';
import { CompletedTrackService } from './completed-track.service';
import { CompletedTrackController } from './completed-track.controller';
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [CompletedTrackController],
  providers: [CompletedTrackService, JwtService],
})
export class CompletedTrackModule {}
