import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
    Headers,
    Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import {
    RegisterDto,
    LoginDto,
    ChangePasswordDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    RefreshTokenDto,
    AuthResponseDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'User registered successfully',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'User already exists',
    })
    async register(
        @Body() registerDto: RegisterDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<AuthResponseDto> {
        return this.authService.register(registerDto, tracerId);
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Login successful',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid credentials',
    })
    async login(
        @Body() loginDto: LoginDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<AuthResponseDto> {
        return this.authService.login(loginDto, tracerId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change user password' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Password changed successfully',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid current password',
    })
    async changePassword(
        @Request() req,
        @Body() changePasswordDto: ChangePasswordDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<{ message: string }> {
        return this.authService.changePassword(
            req.user.userId,
            changePasswordDto,
            tracerId,
        );
    }

    @Public()
    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Request password reset' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Password reset email sent (if email exists)',
    })
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<{ message: string }> {
        return this.authService.forgotPassword(forgotPasswordDto, tracerId);
    }

    @Public()
    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Reset password with token' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Password reset successfully',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid or expired token',
    })
    async resetPassword(
        @Body() resetPasswordDto: ResetPasswordDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<{ message: string }> {
        return this.authService.resetPassword(resetPasswordDto, tracerId);
    }

    @Public()
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Token refreshed successfully',
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid refresh token',
    })
    async refreshToken(
        @Body() refreshTokenDto: RefreshTokenDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<AuthResponseDto> {
        return this.authService.refreshToken(refreshTokenDto, tracerId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User logout' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Logged out successfully',
    })
    async logout(
        @Request() req,
        @Headers('tracer') tracerId?: string,
    ): Promise<{ message: string }> {
        return this.authService.logout(req.user.userId, tracerId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User profile retrieved successfully',
    })
    async getProfile(@Request() req) {
        return {
            userId: req.user.userId,
            email: req.user.email,
            user_name: req.user.user_name,
            is_admin: req.user.is_admin,
            user: req.user.user,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Validate current token' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Token is valid',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Invalid token',
    })
    async validateToken(@Request() req) {
        return {
            valid: true,
            userId: req.user.userId,
            email: req.user.email,
        };
    }
}
