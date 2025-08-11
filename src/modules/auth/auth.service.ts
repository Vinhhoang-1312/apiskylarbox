import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { AppLogger } from '@shared/logger/logger.service';

import { Users, UsersDocument } from '@modules/user/schemas/users.schema';
import {
    RegisterDto,
    LoginDto,
    ChangePasswordDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    AuthResponseDto,
    RefreshTokenDto,
} from './dto/auth.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(
        @InjectModel(Users.name) private userModel: Model<UsersDocument>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(
        registerDto: RegisterDto,
        tracerId?: string,
    ): Promise<AuthResponseDto> {
        this.logger.log('Registering new user', tracerId);

        // Check if user already exists
        const existingUser = await this.userModel.findOne({
            $or: [
                { email: registerDto.email },
                { user_name: registerDto.user_name },
            ],
        });

        if (existingUser) {
            throw new ConflictException('User with this email or username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Create new user
        const newUser = await this.userModel.create({
            ...registerDto,
            password: hashedPassword,
            is_active: true,
            default_pw: false,
            created_date: new Date(),
            latest_update: new Date(),
        });

        // Generate tokens
        const tokens = await this.generateTokens(newUser);

        // Update user with token
        await this.userModel.findByIdAndUpdate(newUser._id, {
            token: tokens.accessToken,
            token_expired_at: new Date(Date.now() + this.getExpiresIn() * 1000),
        });

        return {
            ...tokens,
            user: {
                id: newUser._id.toString(),
                email: newUser.email,
                user_name: newUser.user_name,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                is_admin: newUser.is_admin,
            },
        };
    }

    async login(loginDto: LoginDto, tracerId?: string): Promise<AuthResponseDto> {
        this.logger.log('User login attempt', tracerId);

        const user = await this.validateUser(loginDto.login, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate tokens
        const tokens = await this.generateTokens(user);

        // Update user with token
        await this.userModel.findByIdAndUpdate(user._id, {
            token: tokens.accessToken,
            token_expired_at: new Date(Date.now() + this.getExpiresIn() * 1000),
            latest_update: new Date(),
        });

        return {
            ...tokens,
            user: {
                id: user._id.toString(),
                email: user.email,
                user_name: user.user_name,
                first_name: user.first_name,
                last_name: user.last_name,
                is_admin: user.is_admin,
            },
        };
    }

    async validateUser(
        login: string,
        password: string,
    ): Promise<UsersDocument | null> {
        // Find user by email or username
        const user = await this.userModel.findOne({
            $or: [
                { email: login },
                { user_name: login },
            ],
            is_active: true,
        });

        if (!user) {
            return null;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto,
        tracerId?: string,
    ): Promise<{ message: string }> {
        this.logger.log(`Changing password for user: ${userId}`, tracerId);

        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(
            changePasswordDto.currentPassword,
            user.password,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

        // Update password
        await this.userModel.findByIdAndUpdate(userId, {
            password: hashedPassword,
            default_pw: false,
            latest_update: new Date(),
        });

        return { message: 'Password changed successfully' };
    }

    async forgotPassword(
        forgotPasswordDto: ForgotPasswordDto,
        tracerId?: string,
    ): Promise<{ message: string }> {
        this.logger.log(`Password reset requested for: ${forgotPasswordDto.email}`, tracerId);

        const user = await this.userModel.findOne({ email: forgotPasswordDto.email });

        if (!user) {
            // Return success message even if user not found (security)
            return { message: 'If the email exists, a reset link has been sent' };
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Save hashed token and expiry
        await this.userModel.findByIdAndUpdate(user._id, {
            code: hashedToken,
            forget_password: true,
            token_expired_at: new Date(Date.now() + 3600000), // 1 hour
        });

        // In production, send email with reset link containing resetToken
        // For now, just return success message
        this.logger.log(`Reset token generated: ${resetToken}`, tracerId);

        return { message: 'If the email exists, a reset link has been sent' };
    }

    async resetPassword(
        resetPasswordDto: ResetPasswordDto,
        tracerId?: string,
    ): Promise<{ message: string }> {
        this.logger.log('Password reset attempt', tracerId);

        // Hash the provided token
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetPasswordDto.token)
            .digest('hex');

        // Find user with valid token
        const user = await this.userModel.findOne({
            code: hashedToken,
            forget_password: true,
            token_expired_at: { $gt: new Date() },
        });

        if (!user) {
            throw new BadRequestException('Invalid or expired reset token');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

        // Update password and clear reset token
        await this.userModel.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            code: '',
            forget_password: false,
            default_pw: false,
            token_expired_at: null,
            latest_update: new Date(),
        });

        return { message: 'Password reset successfully' };
    }

    async refreshToken(
        refreshTokenDto: RefreshTokenDto,
        tracerId?: string,
    ): Promise<AuthResponseDto> {
        this.logger.log('Refreshing access token', tracerId);

        try {
            // Verify refresh token
            const payload = this.jwtService.verify(refreshTokenDto.refreshToken, {
                secret: this.configService.get<string>('jwt.secret'),
            });

            // Find user
            const user = await this.userModel.findById(payload.sub);

            if (!user || !user.is_active) {
                throw new UnauthorizedException('User not found or inactive');
            }

            // Generate new tokens
            const tokens = await this.generateTokens(user);

            // Update user with new token
            await this.userModel.findByIdAndUpdate(user._id, {
                token: tokens.accessToken,
                token_expired_at: new Date(Date.now() + this.getExpiresIn() * 1000),
            });

            return {
                ...tokens,
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    user_name: user.user_name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_admin: user.is_admin,
                },
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string, tracerId?: string): Promise<{ message: string }> {
        this.logger.log(`User logout: ${userId}`, tracerId);

        await this.userModel.findByIdAndUpdate(userId, {
            token: '',
            token_expired_at: null,
        });

        return { message: 'Logged out successfully' };
    }

    private async generateTokens(user: UsersDocument): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
    }> {
        const payload: JwtPayload = {
            sub: user._id.toString(),
            email: user.email,
            user_name: user.user_name,
            is_admin: user.is_admin,
        };

        const expiresIn = this.getExpiresIn();

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: `${expiresIn}s`,
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn,
        };
    }

    private getExpiresIn(): number {
        const expiresInStr = this.configService.get<string>('jwt.expiresIn') || '3600';
        return parseInt(expiresInStr, 10);
    }

    async validateToken(token: string): Promise<boolean> {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userModel.findById(payload.sub);
            return !!user && user.is_active;
        } catch {
            return false;
        }
    }
}
