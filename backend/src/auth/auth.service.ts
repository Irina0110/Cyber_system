import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {LoginStatus} from './interfaces/login-status.interface';
import {JwtPayload} from './interfaces/payload.interface';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from '../user/dto/create-user.dto';
import {UserService} from '../user/user.service';
import {LoginUserDto} from '../user/dto/user-login.dto';
import {RegistrationStatus} from './interfaces/registration-status.interface';
import {
    CheckTokenDto,
    ResetPasswordDto,
    ResetPasswordRequestDto,
} from './dto/reset-password.dto';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

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
            status: 200,
            success: true,
            message: 'User registered',
        };

        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                status: 400,
                success: false,
                message: err.message,
            };
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
        const {token, newPassword} = resetPasswordDto;
        const userId = await this.usersService.verifyResetPasswordToken(token);
        if (!userId) {
            throw new HttpException(
                'Invalid or expired token',
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.usersService.updatePassword(userId, newPassword);
    }

    async checkToken(checkTokenDto: CheckTokenDto): Promise<{ tokenValid: boolean }> {
        const {token} = checkTokenDto;
        const userId = await this.usersService.verifyResetPasswordToken(token);
        return {tokenValid: !!userId}
    }

    async requestPasswordReset(
        resetPasswordRequestDto: ResetPasswordRequestDto,
    ): Promise<void> {
        const {email} = resetPasswordRequestDto;
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Генерируем токен сброса пароля
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetLink = `${process.env.CLIENT_URL}/reset?token=${encodeURIComponent(resetToken)}`;

        // Чтение содержимого email.html
        const indexHtml = fs.readFileSync('src/templates/email.html', 'utf8');

        // Замена метки в index.html на ссылку для сброса пароля
        const modifiedIndexHtml = indexHtml.replace('{{resetLink}}', resetLink);


        // Устанавливаем токен и время его истечения в профиле пользователя
        await this.usersService.setResetPasswordToken(user.id, resetToken);

        // Отправляем электронное письмо с инструкциями для сброса пароля и токеном на email пользователя
        await this.sendResetEmail(user.email, modifiedIndexHtml);
    }

    private async sendResetEmail(email: string, htmlContent: string): Promise<void> {
        // Настройка письма
        const mailOptions = {
            from: {
                name: process.env.EMAIL_NAME,
                address: process.env.EMAIL,
            },
            to: email,
            subject: 'Password Reset',
            html: htmlContent
        };

        // Отправка письма
        await this.transporter.sendMail(mailOptions);
    }

    private _createToken({username}: CreateUserDto): any {
        const expiresIn = new Date().getTime() + process.env.TOKEN_EXPIRES_IN;
        const user: JwtPayload = {username};
        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn,
            accessToken,
        };
    }
}
