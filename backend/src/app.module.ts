import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { UserModule } from './user/user.module';
import { CoachModule } from './coach/coach.module';
import { RatingModule } from './rating/rating.module';
import { CompletedTrackModule } from './completed-track/completed-track.module';
import { GoalModule } from './goal/goal.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { EventsModule } from './events/events.module';
import { CronesModule } from './crones/crones.module';

@Module({
  imports: [
    PlayerModule,
    UserModule,
    CoachModule,
    RatingModule,
    CompletedTrackModule,
    GoalModule,
    TeamModule,
    AuthModule,
    EventsModule,
    CronesModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
