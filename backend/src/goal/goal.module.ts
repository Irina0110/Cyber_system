import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [GoalController],
  providers: [GoalService, JwtService],
})
export class GoalModule {}
