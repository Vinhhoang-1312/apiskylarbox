import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';

export enum ProductType {
    INDIVIDUAL = 'individual',
    BOX = 'box',
}

export class CreateProductDto {
    @ApiProperty({ description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Product price' })
    @IsString()
    @IsNotEmpty()
    price: string;

    @ApiProperty({ description: 'Product category' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiPropertyOptional({ description: 'Category ID reference' })
    @IsMongoId()
    @IsOptional()
    categoryId?: string;

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

    @ApiPropertyOptional({ description: 'Product description' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'Stock quantity', default: 0 })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    stock?: number;

    @ApiPropertyOptional({ description: 'Is product active', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiPropertyOptional({ description: 'Is featured product', default: false })
    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @ApiPropertyOptional({
        description: 'Product type',
        enum: ProductType,
        default: ProductType.INDIVIDUAL,
    })
    @IsEnum(ProductType)
    @IsOptional()
    productType?: ProductType;
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }

export class FilterProductDto {
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

    @ApiPropertyOptional({ description: 'Search by product name' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by category' })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiPropertyOptional({ description: 'Filter by category ID' })
    @IsMongoId()
    @IsOptional()
    categoryId?: string;

    @ApiPropertyOptional({ description: 'Filter by product type', enum: ProductType })
    @IsEnum(ProductType)
    @IsOptional()
    productType?: ProductType;

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

    @ApiPropertyOptional({ description: 'Sort field', default: '-created_at' })
    @IsString()
    @IsOptional()
    sort?: string = '-created_at';
}
