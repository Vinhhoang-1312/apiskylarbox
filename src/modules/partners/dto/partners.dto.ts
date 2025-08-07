import { IsString, IsNumber, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SponsorshipDto {
    @ApiProperty({ description: 'Loại tài trợ' })
    @IsString()
    type: string;

    @ApiProperty({ description: 'Số tiền tài trợ' })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Chi tiết tài trợ' })
    @IsString()
    detail: string;
}

export class RepresentativeDto {
    @ApiProperty({ description: 'Danh xưng' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Tên đại diện' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Chức vụ' })
    @IsString()
    position: string;

    @ApiProperty({ description: 'Ngày sinh' })
    @IsString()
    dob: string;

    @ApiProperty({ description: 'Facebook' })
    @IsString()
    facebook: string;

    @ApiProperty({ description: 'Email' })
    @IsString()
    email: string;

    @ApiProperty({ description: 'Số điện thoại' })
    @IsString()
    phone: string;
}

export class CreatePartnerDto {
    @ApiProperty({ description: 'ID đối tác' })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'Tên công ty' })
    @IsString()
    companyName: string;

    @ApiProperty({ description: 'Tên viết tắt' })
    @IsString()
    shortName: string;

    @ApiProperty({ description: 'Website' })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ description: 'Fanpage' })
    @IsOptional()
    @IsString()
    fanpage?: string;

    @ApiProperty({ description: 'Thông tin tài trợ' })
    @ValidateNested()
    @Type(() => SponsorshipDto)
    sponsorship: SponsorshipDto;

    @ApiProperty({ description: 'Gói tài trợ' })
    @IsOptional()
    @IsString()
    package?: string;

    @ApiProperty({ description: 'Logo' })
    @IsOptional()
    @IsString()
    logo?: string;

    @ApiProperty({ description: 'Thông tin đại diện' })
    @ValidateNested()
    @Type(() => RepresentativeDto)
    representative: RepresentativeDto;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class UpdatePartnerDto {
    @ApiProperty({ description: 'Tên công ty' })
    @IsOptional()
    @IsString()
    companyName?: string;

    @ApiProperty({ description: 'Tên viết tắt' })
    @IsOptional()
    @IsString()
    shortName?: string;

    @ApiProperty({ description: 'Website' })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ description: 'Fanpage' })
    @IsOptional()
    @IsString()
    fanpage?: string;

    @ApiProperty({ description: 'Thông tin tài trợ' })
    @IsOptional()
    @ValidateNested()
    @Type(() => SponsorshipDto)
    sponsorship?: SponsorshipDto;

    @ApiProperty({ description: 'Gói tài trợ' })
    @IsOptional()
    @IsString()
    package?: string;

    @ApiProperty({ description: 'Logo' })
    @IsOptional()
    @IsString()
    logo?: string;

    @ApiProperty({ description: 'Thông tin đại diện' })
    @IsOptional()
    @ValidateNested()
    @Type(() => RepresentativeDto)
    representative?: RepresentativeDto;

    @ApiProperty({ description: 'Trạng thái hoạt động' })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

export class QueryPartnerDto {
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

    @ApiProperty({ description: 'Lọc theo gói', required: false })
    @IsOptional()
    @IsString()
    package?: string;
}
