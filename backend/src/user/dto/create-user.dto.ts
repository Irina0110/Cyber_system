import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '../../../prisma/generated';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  role: $Enums.Role;

  @ApiProperty({ required: false })
  playerId?: number;

  @ApiProperty({ required: false })
  coachId?: number;

  resetPasswordToken?: string;
  resetPasswordTokenExpires?: string;
}
