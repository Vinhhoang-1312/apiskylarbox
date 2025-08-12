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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { CreateFeaturedBoxDto, UpdateFeaturedBoxDto, FilterFeaturedBoxDto } from './dto/featured-boxes.dto';
import { FeaturedBoxesService } from './featured-boxes.service';

@ApiTags('Featured Boxes')
@Controller('featured-boxes')
export class FeaturedBoxesController {
    constructor(private readonly featuredBoxesService: FeaturedBoxesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new featured box' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Featured box created successfully',
    })
    async create(
        @Body() createFeaturedBoxDto: CreateFeaturedBoxDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.create(createFeaturedBoxDto, tracerId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all featured boxes with pagination and filters' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured boxes retrieved successfully',
    })
    async findAll(
        @Query() filterDto: FilterFeaturedBoxDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.findAll(filterDto, tracerId);
    }

    @Get('featured')
    @ApiOperation({ summary: 'Get featured boxes only' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured boxes retrieved successfully',
    })
    async findFeatured(@Headers('tracer') tracerId?: string) {
        return this.featuredBoxesService.findFeaturedBoxes(tracerId);
    }

    @Get('active')
    @ApiOperation({ summary: 'Get active featured boxes' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Active featured boxes retrieved successfully',
    })
    async findActive(@Headers('tracer') tracerId?: string) {
        return this.featuredBoxesService.findActiveBoxes(tracerId);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get a featured box by slug' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured box found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Featured box not found',
    })
    async findBySlug(
        @Param('slug') slug: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.findBySlug(slug, tracerId);
    }

    @Get('category/:category')
    @ApiOperation({ summary: 'Get featured boxes by category' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured boxes retrieved successfully',
    })
    async findByCategory(
        @Param('category') category: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.findByCategory(category, tracerId);
    }

    @Post('tags')
    @ApiOperation({ summary: 'Get featured boxes by tags' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured boxes retrieved successfully',
    })
    async findByTags(
        @Body() tags: string[],
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.findByTags(tags, tracerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a featured box by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured box found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Featured box not found',
    })
    async findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a featured box' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured box updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Featured box not found',
    })
    async update(
        @Param('id') id: string,
        @Body() updateFeaturedBoxDto: UpdateFeaturedBoxDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.update(id, updateFeaturedBoxDto, tracerId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a featured box' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Featured box deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Featured box not found',
    })
    async remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.featuredBoxesService.remove(id, tracerId);
    }
}


