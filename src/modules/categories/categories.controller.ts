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

import { CreateCategoryDto, UpdateCategoryDto, FilterCategoryDto } from './dto/categories.dto';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Category created successfully',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Category with this name already exists',
    })
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.create(createCategoryDto, tracerId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories with pagination and filters' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Categories retrieved successfully',
    })
    async findAll(
        @Query() filterDto: FilterCategoryDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.findAll(filterDto, tracerId);
    }

    @Get('root')
    @ApiOperation({ summary: 'Get root categories (no parent)' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Root categories retrieved successfully',
    })
    async findRootCategories(@Headers('tracer') tracerId?: string) {
        return this.categoriesService.findRootCategories(tracerId);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get a category by slug' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Category found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Category not found',
    })
    async findBySlug(
        @Param('slug') slug: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.findBySlug(slug, tracerId);
    }

    @Get(':id/subcategories')
    @ApiOperation({ summary: 'Get subcategories of a parent category' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Subcategories retrieved successfully',
    })
    async findSubcategories(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.findSubcategories(id, tracerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Category found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Category not found',
    })
    async findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Category updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Category not found',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Category with new name already exists',
    })
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.update(id, updateCategoryDto, tracerId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Category deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Category not found',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Cannot delete category with subcategories',
    })
    async remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.remove(id, tracerId);
    }

    @Post('seed')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Seed default categories' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Categories seeded successfully',
    })
    async seedCategories(@Headers('tracer') tracerId?: string) {
        return this.categoriesService.seedDefaultCategories(tracerId);
    }
}

