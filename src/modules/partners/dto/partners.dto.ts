import { IsString, IsNumber, IsObject, IsBoolean, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class SponsorshipDto {
    @ApiProperty({ description: 'Type of sponsorship' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: 'Sponsorship amount' })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'Sponsorship detail' })
    @IsString()
    @IsNotEmpty()
    detail: string;
}

export class RepresentativeDto {
    @ApiProperty({ description: 'Title (Mr/Mrs/Ms)' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Representative name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Position' })
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiPropertyOptional({ description: 'Date of birth' })
    @IsString()
    @IsOptional()
    dob?: string;

    @ApiPropertyOptional({ description: 'Facebook profile' })
    @IsString()
    @IsOptional()
    facebook?: string;

    @ApiPropertyOptional({ description: 'Email address' })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: 'Phone number' })
    @IsString()
    @IsOptional()
    phone?: string;
}

export class CreatePartnerDto {
    @ApiProperty({ description: 'Partner ID' })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: 'Company name' })
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @ApiProperty({ description: 'Short name' })
    @IsString()
    @IsNotEmpty()
    shortName: string;

    @ApiProperty({ description: 'Website URL' })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiProperty({ description: 'Fanpage URL' })
    @IsString()
    @IsNotEmpty()
    fanpage: string;

    @ApiProperty({ type: SponsorshipDto, description: 'Sponsorship details' })
    @IsObject()
    @ValidateNested()
    @Type(() => SponsorshipDto)
    sponsorship: SponsorshipDto;

    @ApiProperty({ description: 'Package type (diamond/bronze)' })
    @IsString()
    @IsNotEmpty()
    package: string;

    @ApiProperty({ description: 'Logo URL' })
    @IsString()
    @IsNotEmpty()
    logo: string;

    @ApiProperty({ type: RepresentativeDto, description: 'Representative details' })
    @IsObject()
    @ValidateNested()
    @Type(() => RepresentativeDto)
    representative: RepresentativeDto;

    @ApiPropertyOptional({ description: 'Is partner active', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) { }

export class FilterPartnerDto {
    @ApiPropertyOptional({ description: 'Page number', default: 1 })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Items per page', default: 10 })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Search by company name' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by package type' })
    @IsString()
    @IsOptional()
    package?: string;

    @ApiPropertyOptional({ description: 'Filter by active status' })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;
}
