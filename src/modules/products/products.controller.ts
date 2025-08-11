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

import { CreateProductDto, UpdateProductDto, FilterProductDto } from './dto/products.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Product created successfully',
    })
    async create(
        @Body() createProductDto: CreateProductDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.create(createProductDto, tracerId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products with pagination and filters' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Products retrieved successfully',
    })
    async findAll(
        @Query() filterDto: FilterProductDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.findAll(filterDto, tracerId);
    }

    @Get('featured')
    @ApiOperation({ summary: 'Get featured products' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured products retrieved successfully',
    })
    async findFeatured(@Headers('tracer') tracerId?: string) {
        return this.productsService.findFeaturedProducts(tracerId);
    }

    @Get('category/:category')
    @ApiOperation({ summary: 'Get products by category name' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Products retrieved successfully',
    })
    async findByCategory(
        @Param('category') category: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.findByCategory(category, tracerId);
    }

    @Get('category-id/:categoryId')
    @ApiOperation({ summary: 'Get products by category ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Products retrieved successfully',
    })
    async findByCategoryId(
        @Param('categoryId') categoryId: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.findByCategoryId(categoryId, tracerId);
    }

    @Get('type/:productType')
    @ApiOperation({ summary: 'Get products by type (individual/box)' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Products retrieved successfully',
    })
    async findByProductType(
        @Param('productType') productType: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.findByProductType(productType, tracerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product not found',
    })
    async findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product not found',
    })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.update(id, updateProductDto, tracerId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Product deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product not found',
    })
    async remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.remove(id, tracerId);
    }
}
