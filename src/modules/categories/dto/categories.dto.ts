import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Category name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: 'Category description' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'Category image URL' })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiPropertyOptional({ description: 'Parent category ID' })
    @IsString()
    @IsOptional()
    parentId?: string;

    @ApiPropertyOptional({ description: 'Display order', default: 0 })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    order?: number;

    @ApiPropertyOptional({ description: 'Is category active', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'URL slug' })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({ description: 'Category color' })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiPropertyOptional({ description: 'Category icon' })
    @IsString()
    @IsOptional()
    icon?: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }

export class FilterCategoryDto {
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

    @ApiPropertyOptional({ description: 'Search by category name' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by parent ID' })
    @IsString()
    @IsOptional()
    parentId?: string;

    @ApiPropertyOptional({ description: 'Filter by active status' })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Sort field', default: 'order' })
    @IsString()
    @IsOptional()
    sort?: string = 'order';
}

