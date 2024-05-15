import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import {AuthGuard} from "./auth.guard";
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from '../user/dto/user-login.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {
  CheckTokenDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any): Promise<void> {
    return await this.authService.logout(request);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }

  @Post('reset-password/request')
  public async requestPasswordReset(
    @Body() email: ResetPasswordRequestDto,
  ): Promise<void> {
    await this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  public async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto);
  }

  @Post('check-token')
  public async checkResetToken(
      @Body() checkTokenDto: CheckTokenDto,
  ): Promise<{tokenValid: boolean }> {
    return await this.authService.checkToken(checkTokenDto);
  }
}
