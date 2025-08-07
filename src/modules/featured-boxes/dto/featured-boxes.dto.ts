import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeaturedBoxDto {
    @ApiProperty({ description: 'Tên hộp quà' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Mô tả' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Giá' })
    @IsString()
    price: string;

    @ApiProperty({ description: 'Màu sắc' })
    @IsOptional()
    @IsString()
    color?: string;

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

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdateFeaturedBoxDto {
    @ApiProperty({ description: 'Tên hộp quà' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Mô tả' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Giá' })
    @IsOptional()
    @IsString()
    price?: string;

    @ApiProperty({ description: 'Màu sắc' })
    @IsOptional()
    @IsString()
    color?: string;

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

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class QueryFeaturedBoxDto {
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
