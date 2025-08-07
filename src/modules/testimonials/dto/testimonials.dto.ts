import { IsString, IsNumber, IsOptional, IsBoolean, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
    @ApiProperty({ description: 'Tên khách hàng' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Nội dung đánh giá' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'Đánh giá (1-5)', minimum: 1, maximum: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ description: 'Avatar' })
    @IsOptional()
    @IsString()
    avatar?: string;

    @ApiProperty({ description: 'Chức vụ' })
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty({ description: 'Công ty' })
    @IsOptional()
    @IsString()
    company?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdateTestimonialDto {
    @ApiProperty({ description: 'Tên khách hàng' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Nội dung đánh giá' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ description: 'Đánh giá (1-5)', minimum: 1, maximum: 5 })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating?: number;

    @ApiProperty({ description: 'Avatar' })
    @IsOptional()
    @IsString()
    avatar?: string;

    @ApiProperty({ description: 'Chức vụ' })
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty({ description: 'Công ty' })
    @IsOptional()
    @IsString()
    company?: string;

    @ApiProperty({ description: 'Thứ tự sắp xếp' })
    @IsOptional()
    @IsNumber()
    sort_order?: number;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class QueryTestimonialDto {
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

    @ApiProperty({ description: 'Lọc theo đánh giá', required: false })
    @IsOptional()
    @IsNumber()
    rating?: number;
}
