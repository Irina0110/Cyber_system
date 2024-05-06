import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [RatingController],
  providers: [RatingService, JwtService],
})
export class RatingModule {}
