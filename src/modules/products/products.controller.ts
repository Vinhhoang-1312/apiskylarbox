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

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto/products.dto';
import { ProductsDocument } from './schemas/products.schema';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(
        @Body() createProductDto: CreateProductDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<ProductsDocument> {
        return this.productsService.create(createProductDto, tracerId);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all products with pagination' })
    @ApiResponse({ status: 200, description: 'Return list of products' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'category', required: false, type: Number })
    findAll(
        @Query() query: QueryProductDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.productsService.findAll(query, tracerId);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiResponse({ status: 200, description: 'Return product details' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<ProductsDocument> {
        return this.productsService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<ProductsDocument> {
        return this.productsService.update(id, updateProductDto, tracerId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiParam({ name: 'id', description: 'Product ID' })
    remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<ProductsDocument> {
        return this.productsService.remove(id, tracerId);
    }
}
