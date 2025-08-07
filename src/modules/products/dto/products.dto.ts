import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Tên sản phẩm' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Giá' })
    @IsString()
    price: string;

    @ApiProperty({ description: 'Danh mục' })
    @IsString()
    category: string;

    @ApiProperty({ description: 'Hình ảnh quà tặng' })
    @IsOptional()
    @IsString()
    giftImage?: string;

    @ApiProperty({ description: 'Hình ảnh sản phẩm' })
    @IsOptional()
    @IsString()
    productImage?: string;

    @ApiProperty({ description: 'Icon quà tặng' })
    @IsOptional()
    @IsString()
    giftIcon?: string;

    @ApiProperty({ description: 'Mô tả' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdateProductDto {
    @ApiProperty({ description: 'Tên sản phẩm' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Giá' })
    @IsOptional()
    @IsString()
    price?: string;

    @ApiProperty({ description: 'Danh mục' })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({ description: 'Hình ảnh quà tặng' })
    @IsOptional()
    @IsString()
    giftImage?: string;

    @ApiProperty({ description: 'Hình ảnh sản phẩm' })
    @IsOptional()
    @IsString()
    productImage?: string;

    @ApiProperty({ description: 'Icon quà tặng' })
    @IsOptional()
    @IsString()
    giftIcon?: string;

    @ApiProperty({ description: 'Mô tả' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class QueryProductDto {
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

    @ApiProperty({ description: 'Lọc theo danh mục', required: false })
    @IsOptional()
    @IsString()
    category?: string;
}
