import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpStatus,
    HttpCode,
    Headers,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { CreatePartnerDto, UpdatePartnerDto, FilterPartnerDto } from './dto/partners.dto';
import { PartnersService } from './partners.service';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new partner' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Partner created successfully',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Partner with this ID already exists',
    })
    async create(
        @Body() createPartnerDto: CreatePartnerDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.create(createPartnerDto, tracerId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all partners with pagination and filters' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Partners retrieved successfully',
    })
    async findAll(
        @Query() filterDto: FilterPartnerDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.findAll(filterDto, tracerId);
    }

    @Get('package/:packageType')
    @ApiOperation({ summary: 'Get partners by package type' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Partners retrieved successfully',
    })
    async findByPackage(
        @Param('packageType') packageType: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.findByPackage(packageType, tracerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a partner by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Partner found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Partner not found',
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a partner' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Partner updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Partner not found',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Partner with new ID already exists',
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePartnerDto: UpdatePartnerDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.update(id, updatePartnerDto, tracerId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a partner' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Partner deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Partner not found',
    })
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.remove(id, tracerId);
    }
}
