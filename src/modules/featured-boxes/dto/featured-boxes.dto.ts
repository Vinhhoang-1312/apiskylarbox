import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateFeaturedBoxDto {
    @ApiProperty({ description: 'Box name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Box description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Box price' })
    @IsString()
    @IsNotEmpty()
    price: string;

    @ApiProperty({ description: 'Box color (CSS class or color code)' })
    @IsString()
    @IsNotEmpty()
    color: string;

    @ApiProperty({ description: 'Gift image URL' })
    @IsString()
    @IsNotEmpty()
    giftImage: string;

    @ApiProperty({ description: 'Product image URL' })
    @IsString()
    @IsNotEmpty()
    productImage: string;

    @ApiProperty({ description: 'Gift icon' })
    @IsString()
    @IsNotEmpty()
    giftIcon: string;

    @ApiPropertyOptional({ description: 'URL slug' })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({ description: 'Stock quantity', default: 0 })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    stock?: number;

    @ApiPropertyOptional({ description: 'Is box active', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Is featured box', default: false })
    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @ApiPropertyOptional({ description: 'Display order', default: 0 })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    order?: number;

    @ApiPropertyOptional({ description: 'Tags', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiPropertyOptional({ description: 'Category' })
    @IsString()
    @IsOptional()
    category?: string;
}

export class UpdateFeaturedBoxDto extends PartialType(CreateFeaturedBoxDto) { }

export class FilterFeaturedBoxDto {
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

    @ApiPropertyOptional({ description: 'Search by name or description' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by category' })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiPropertyOptional({ description: 'Filter by featured status' })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isFeatured?: boolean;

    @ApiPropertyOptional({ description: 'Filter by active status' })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Filter by tags', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiPropertyOptional({ description: 'Sort field', default: 'order' })
    @IsString()
    @IsOptional()
    sort?: string = 'order';
}


