import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Username' })
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ description: 'Password (minimum 6 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ description: 'First name' })
    @IsString()
    @IsOptional()
    first_name?: string;

    @ApiPropertyOptional({ description: 'Last name' })
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiPropertyOptional({ description: 'Phone number' })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ description: 'Address' })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'Business ID' })
    @IsString()
    @IsNotEmpty()
    business_id: string;
}

export class LoginDto {
    @ApiProperty({ description: 'Email or username' })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ChangePasswordDto {
    @ApiProperty({ description: 'Current password' })
    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @ApiProperty({ description: 'New password (minimum 6 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}

export class ForgotPasswordDto {
    @ApiProperty({ description: 'Email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({ description: 'Reset token' })
    @IsString()
    @IsNotEmpty()
    token: string;

    @ApiProperty({ description: 'New password (minimum 6 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}

export class RefreshTokenDto {
    @ApiProperty({ description: 'Refresh token' })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}

export class AuthResponseDto {
    @ApiProperty({ description: 'Access token' })
    accessToken: string;

    @ApiPropertyOptional({ description: 'Refresh token' })
    refreshToken?: string;

    @ApiProperty({ description: 'Token type', default: 'Bearer' })
    tokenType: string = 'Bearer';

    @ApiProperty({ description: 'Token expiration time in seconds' })
    expiresIn: number;

    @ApiProperty({ description: 'User information' })
    user: {
        id: string;
        email: string;
        user_name: string;
        first_name?: string;
        last_name?: string;
        is_admin?: boolean;
    };
}
