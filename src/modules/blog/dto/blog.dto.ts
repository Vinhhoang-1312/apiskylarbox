import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsArray, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateBlogDto {
    @ApiProperty({ description: 'Blog title' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Blog excerpt' })
    @IsString()
    @IsNotEmpty()
    excerpt: string;

    @ApiProperty({ description: 'Blog content' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiPropertyOptional({ description: 'URL slug' })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({ description: 'Author name' })
    @IsString()
    @IsOptional()
    author?: string;

    @ApiPropertyOptional({ description: 'Featured image URL' })
    @IsString()
    @IsOptional()
    featuredImage?: string;

    @ApiPropertyOptional({ description: 'Tags', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiPropertyOptional({ description: 'Category' })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiPropertyOptional({ description: 'Published date' })
    @IsDateString()
    @IsOptional()
    publishedDate?: Date;

    @ApiPropertyOptional({ description: 'Is published', default: true })
    @IsBoolean()
    @IsOptional()
    isPublished?: boolean;

    @ApiPropertyOptional({ description: 'Is featured', default: false })
    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @ApiPropertyOptional({ description: 'Meta title for SEO' })
    @IsString()
    @IsOptional()
    metaTitle?: string;

    @ApiPropertyOptional({ description: 'Meta description for SEO' })
    @IsString()
    @IsOptional()
    metaDescription?: string;

    @ApiPropertyOptional({ description: 'Meta keywords for SEO', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    metaKeywords?: string[];
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @ApiPropertyOptional({ description: 'View count' })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    viewCount?: number;

    @ApiPropertyOptional({ description: 'Like count' })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    likeCount?: number;
}

export class FilterBlogDto {
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

    @ApiPropertyOptional({ description: 'Search by title or content' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Filter by category' })
    @IsString()
    @IsOptional()
    category?: string;

    @ApiPropertyOptional({ description: 'Filter by author' })
    @IsString()
    @IsOptional()
    author?: string;

    @ApiPropertyOptional({ description: 'Filter by tags', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @ApiPropertyOptional({ description: 'Filter by published status' })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isPublished?: boolean;

    @ApiPropertyOptional({ description: 'Filter by featured status' })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isFeatured?: boolean;

    @ApiPropertyOptional({ description: 'Sort field', default: '-publishedDate' })
    @IsString()
    @IsOptional()
    sort?: string = '-publishedDate';
}
