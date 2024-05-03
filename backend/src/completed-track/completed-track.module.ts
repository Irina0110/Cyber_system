import { Module } from '@nestjs/common';
import { CompletedTrackService } from './completed-track.service';
import { CompletedTrackController } from './completed-track.controller';

@Module({
  controllers: [CompletedTrackController],
  providers: [CompletedTrackService],
})
export class CompletedTrackModule {}
