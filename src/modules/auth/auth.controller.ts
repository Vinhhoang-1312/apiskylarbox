import {
    Controller,
    Post,
    Body,
    Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @Public()
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    register(
        @Body() registerDto: RegisterDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.authService.register(registerDto, tracerId);
    }

    @Post('login')
    @Public()
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    login(
        @Body() loginDto: LoginDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.authService.login(loginDto, tracerId);
    }

    @Post('refresh')
    @Public()
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    refreshToken(
        @Body() refreshTokenDto: RefreshTokenDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.authService.refreshToken(refreshTokenDto, tracerId);
    }
}
