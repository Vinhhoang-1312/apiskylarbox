import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ description: 'Tên danh mục' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Mô tả' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Icon' })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({ description: 'Màu sắc' })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdateCategoryDto {
    @ApiProperty({ description: 'Tên danh mục' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Mô tả' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Icon' })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({ description: 'Màu sắc' })
    @IsOptional()
    @IsString()
    color?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class QueryCategoryDto {
    @ApiProperty({ description: 'Trang', required: false })
    @IsOptional()
    @IsNumber()
    page?: number = 1;

    @ApiProperty({ description: 'Số lượng mỗi trang', required: false })
    @IsOptional()
    @IsNumber()
    limit?: number = 10;

    @ApiProperty({ description: 'Tìm kiếm theo tên', required: false })
    @IsOptional()
    @IsString()
    search?: string;
}
