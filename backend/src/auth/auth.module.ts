import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import {PlayerService} from "../player/player.service";
import {CoachService} from "../coach/coach.service";
import {EventService} from "../events/events.service";
import {EventEmitter2} from "@nestjs/event-emitter";

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    ConfigModule, // Import ConfigModule if not already imported
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule within JwtModule options
      useFactory: (config: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtStrategy, PrismaService, PlayerService, CoachService, EventService, EventEmitter2],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
