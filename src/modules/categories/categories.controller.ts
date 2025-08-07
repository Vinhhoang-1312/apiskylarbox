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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './dto/categories.dto';
import { CategoriesDocument } from './schemas/categories.schema';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<CategoriesDocument> {
        return this.categoriesService.create(createCategoryDto, tracerId);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all categories with pagination' })
    @ApiResponse({ status: 200, description: 'Return list of categories' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(
        @Query() query: QueryCategoryDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.categoriesService.findAll(query, tracerId);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get a category by id' })
    @ApiResponse({ status: 200, description: 'Return category details' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiParam({ name: 'id', description: 'Category ID' })
    findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<CategoriesDocument> {
        return this.categoriesService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ status: 200, description: 'Category updated successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiParam({ name: 'id', description: 'Category ID' })
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<CategoriesDocument> {
        return this.categoriesService.update(id, updateCategoryDto, tracerId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully' })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiParam({ name: 'id', description: 'Category ID' })
    remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<CategoriesDocument> {
        return this.categoriesService.remove(id, tracerId);
    }
}
