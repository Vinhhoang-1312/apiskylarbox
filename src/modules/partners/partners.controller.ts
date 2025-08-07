import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';

import { PartnersService } from './partners.service';
import { CreatePartnerDto, UpdatePartnerDto, QueryPartnerDto } from './dto/partners.dto';
import { PartnersDocument } from './schemas/partners.schema';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new partner' })
    @ApiResponse({ status: 201, description: 'Partner created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(
        @Body() createPartnerDto: CreatePartnerDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<PartnersDocument> {
        return this.partnersService.create(createPartnerDto, tracerId);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all partners with pagination' })
    @ApiResponse({ status: 200, description: 'Return list of partners' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'package', required: false, type: String })
    findAll(
        @Query() query: QueryPartnerDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.partnersService.findAll(query, tracerId);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get a partner by id' })
    @ApiResponse({ status: 200, description: 'Return partner details' })
    @ApiResponse({ status: 404, description: 'Partner not found' })
    @ApiParam({ name: 'id', description: 'Partner ID' })
    findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<PartnersDocument> {
        return this.partnersService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a partner' })
    @ApiResponse({ status: 200, description: 'Partner updated successfully' })
    @ApiResponse({ status: 404, description: 'Partner not found' })
    @ApiParam({ name: 'id', description: 'Partner ID' })
    update(
        @Param('id') id: string,
        @Body() updatePartnerDto: UpdatePartnerDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<PartnersDocument> {
        return this.partnersService.update(id, updatePartnerDto, tracerId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a partner' })
    @ApiResponse({ status: 200, description: 'Partner deleted successfully' })
    @ApiResponse({ status: 404, description: 'Partner not found' })
    @ApiParam({ name: 'id', description: 'Partner ID' })
    remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<PartnersDocument> {
        return this.partnersService.remove(id, tracerId);
    }
}
