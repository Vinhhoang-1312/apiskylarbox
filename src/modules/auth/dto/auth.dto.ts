import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'Username or email' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    password: string;
}

export class RegisterDto {
    @ApiProperty({ description: 'Business ID' })
    @IsString()
    business_id: string;

    @ApiProperty({ description: 'Username' })
    @IsString()
    user_name: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    password: string;

    @ApiProperty({ description: 'Email' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'Phone number' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'First name' })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiProperty({ description: 'Last name' })
    @IsOptional()
    @IsString()
    last_name?: string;
}

export class RefreshTokenDto {
    @ApiProperty({ description: 'Refresh token' })
    @IsString()
    refreshToken: string;
}
