import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
    @ApiProperty({ description: 'Tiêu đề bài viết' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Tóm tắt' })
    @IsString()
    excerpt: string;

    @ApiProperty({ description: 'Ngày đăng' })
    @IsString()
    date: string;

    @ApiProperty({ description: 'Nội dung' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ description: 'Tác giả' })
    @IsOptional()
    @IsString()
    author?: string;

    @ApiProperty({ description: 'Hình ảnh' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty({ description: 'Tags', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdateBlogDto {
    @ApiProperty({ description: 'Tiêu đề bài viết' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: 'Tóm tắt' })
    @IsOptional()
    @IsString()
    excerpt?: string;

    @ApiProperty({ description: 'Ngày đăng' })
    @IsOptional()
    @IsString()
    date?: string;

    @ApiProperty({ description: 'Nội dung' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ description: 'Tác giả' })
    @IsOptional()
    @IsString()
    author?: string;

    @ApiProperty({ description: 'Hình ảnh' })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty({ description: 'Tags', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class QueryBlogDto {
    @ApiProperty({ description: 'Trang', required: false })
    @IsOptional()
    @IsNumber()
    page?: number = 1;

    @ApiProperty({ description: 'Số lượng mỗi trang', required: false })
    @IsOptional()
    @IsNumber()
    limit?: number = 10;

    @ApiProperty({ description: 'Tìm kiếm theo tiêu đề', required: false })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiProperty({ description: 'Lọc theo tác giả', required: false })
    @IsOptional()
    @IsString()
    author?: string;
}
