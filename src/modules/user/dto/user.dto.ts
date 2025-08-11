import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber, IsArray, MinLength, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Business ID' })
    @IsString()
    @IsNotEmpty()
    business_id: string;

    @ApiPropertyOptional({ description: 'User email' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: 'Phone number' })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Username' })
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiPropertyOptional({ description: 'First name' })
    @IsString()
    @IsOptional()
    first_name?: string;

    @ApiPropertyOptional({ description: 'Last name' })
    @IsString()
    @IsOptional()
    last_name?: string;

    @ApiProperty({ description: 'Password (minimum 6 characters)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ description: 'Address' })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiPropertyOptional({ description: 'Is admin user', default: false })
    @IsBoolean()
    @IsOptional()
    is_admin?: boolean;

    @ApiPropertyOptional({ description: 'Is active user', default: true })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @ApiPropertyOptional({ description: 'Display name' })
    @IsString()
    @IsOptional()
    name_display?: string;

    @ApiPropertyOptional({ description: 'Identification name' })
    @IsString()
    @IsOptional()
    name_identification?: string;

    @ApiPropertyOptional({ description: 'Website URL' })
    @IsString()
    @IsOptional()
    web?: string;

    @ApiPropertyOptional({ description: 'User bio' })
    @IsString()
    @IsOptional()
    bio?: string;

    @ApiPropertyOptional({ description: 'Gender (0: Unknown, 1: Male, 2: Female)' })
    @IsNumber()
    @IsOptional()
    gender?: number;

    @ApiPropertyOptional({ description: 'Date of birth' })
    @IsString()
    @IsOptional()
    date_of_birth?: string;

    @ApiPropertyOptional({ description: 'Card type' })
    @IsString()
    @IsOptional()
    card_type?: string;

    @ApiPropertyOptional({ description: 'ID card number' })
    @IsString()
    @IsOptional()
    id_card?: string;

    @ApiPropertyOptional({ description: 'Card location' })
    @IsString()
    @IsOptional()
    location_card?: string;

    @ApiPropertyOptional({ description: 'Full name' })
    @IsString()
    @IsOptional()
    fullname?: string;

    @ApiPropertyOptional({ description: 'Avatar URL' })
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiPropertyOptional({ description: 'Followers list', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    followers?: string[];

    @ApiPropertyOptional({ description: 'Following list', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    following?: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class FilterUserDto {
    @ApiPropertyOptional({ description: 'Search by username, email, or fullname' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by admin status' })
    @IsBoolean()
    @IsOptional()
    is_admin?: boolean;

    @ApiPropertyOptional({ description: 'Filter by active status' })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @ApiPropertyOptional({ description: 'Filter by business ID' })
    @IsString()
    @IsOptional()
    business_id?: string;
}
