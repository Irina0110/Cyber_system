import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/user-login.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import {
  ResetPasswordDto,
  ResetPasswordRequestDto,
} from './dto/reset-password.dto';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private readonly transporter;
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    // Настройка транспортера для отправки почты
    this.transporter = nodemailer.createTransport({
      host: 'mail.mail.ee',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      secureConnection: false,
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err.message,
      };
      console.log(status)
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = this._createToken(user);
    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<CreateUserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
    const userId = await this.usersService.verifyResetPasswordToken(token);
    if (!userId) {
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersService.updatePassword(userId, newPassword);
  }
  async requestPasswordReset(
    resetPasswordRequestDto: ResetPasswordRequestDto,
  ): Promise<void> {
    const { email } = resetPasswordRequestDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Генерируем токен сброса пароля
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Устанавливаем токен и время его истечения в профиле пользователя
    await this.usersService.setResetPasswordToken(user.id, resetToken);

    // Отправляем электронное письмо с инструкциями для сброса пароля и токеном на email пользователя
    await this.sendResetEmail(user.email, resetToken);
  }

  private async sendResetEmail(email: string, token: string): Promise<void> {
    // Настройка письма
    const mailOptions = {
      from: {
        name: process.env.EMAIL_NAME,
        address: process.env.EMAIL,
      },
      to: email,
      subject: 'Password Reset',
      text: `You have requested a password reset. Your reset token is: ${token}`,
    };

    // Отправка письма
    await this.transporter.sendMail(mailOptions);
  }

  private _createToken({ username }: CreateUserDto): any {
    const expiresIn = new Date().getTime() + process.env.TOKEN_EXPIRES_IN;
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn,
      accessToken,
    };
  }
}
