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

import { FeaturedBoxesService } from './featured-boxes.service';
import { CreateFeaturedBoxDto, UpdateFeaturedBoxDto, QueryFeaturedBoxDto } from './dto/featured-boxes.dto';
import { FeaturedBoxesDocument } from './schemas/featured-boxes.schema';

@ApiTags('Featured Boxes')
@Controller('featured-boxes')
export class FeaturedBoxesController {
    constructor(private readonly featuredBoxesService: FeaturedBoxesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new featured box' })
    @ApiResponse({ status: 201, description: 'Featured box created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(
        @Body() createFeaturedBoxDto: CreateFeaturedBoxDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<FeaturedBoxesDocument> {
        return this.featuredBoxesService.create(createFeaturedBoxDto, tracerId);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all featured boxes with pagination' })
    @ApiResponse({ status: 200, description: 'Return list of featured boxes' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(
        @Query() query: QueryFeaturedBoxDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.findAll(query, tracerId);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get a featured box by id' })
    @ApiResponse({ status: 200, description: 'Return featured box details' })
    @ApiResponse({ status: 404, description: 'Featured box not found' })
    @ApiParam({ name: 'id', description: 'Featured Box ID' })
    findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<FeaturedBoxesDocument> {
        return this.featuredBoxesService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a featured box' })
    @ApiResponse({ status: 200, description: 'Featured box updated successfully' })
    @ApiResponse({ status: 404, description: 'Featured box not found' })
    @ApiParam({ name: 'id', description: 'Featured Box ID' })
    update(
        @Param('id') id: string,
        @Body() updateFeaturedBoxDto: UpdateFeaturedBoxDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<FeaturedBoxesDocument> {
        return this.featuredBoxesService.update(id, updateFeaturedBoxDto, tracerId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a featured box' })
    @ApiResponse({ status: 200, description: 'Featured box deleted successfully' })
    @ApiResponse({ status: 404, description: 'Featured box not found' })
    @ApiParam({ name: 'id', description: 'Featured Box ID' })
    remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<FeaturedBoxesDocument> {
        return this.featuredBoxesService.remove(id, tracerId);
    }
}
