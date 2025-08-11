import { Injectable, NotFoundException } from '@nestjs/common';

import { AppLogger } from '@shared/logger/logger.service';

import { CreateProductDto, UpdateProductDto, FilterProductDto } from './dto/products.dto';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsDocument } from './schemas/products.schema';

@Injectable()
export class ProductsService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(private readonly productsRepository: ProductsRepository) { }

    async create(
        createProductDto: CreateProductDto,
        tracerId?: string,
    ): Promise<ProductsDocument> {
        this.logger.log('Creating new product', tracerId);

        return this.productsRepository.insert(
            { update: createProductDto },
            tracerId,
        );
    }

    async findAll(
        filterDto: FilterProductDto,
        tracerId?: string,
    ): Promise<{
        list: ProductsDocument[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }> {
        this.logger.log('Finding all products', tracerId);

        const query: any = {};

        if (filterDto.search) {
            query.$or = [
                { name: { $regex: filterDto.search, $options: 'i' } },
                { description: { $regex: filterDto.search, $options: 'i' } },
                { category: { $regex: filterDto.search, $options: 'i' } },
            ];
        }

        if (filterDto.category) {
            query.category = filterDto.category;
        }

        if (filterDto.categoryId) {
            query.categoryId = filterDto.categoryId;
        }

        if (filterDto.productType) {
            query.productType = filterDto.productType;
        }

        if (typeof filterDto.isFeatured === 'boolean') {
            query.isFeatured = filterDto.isFeatured;
        }

        if (typeof filterDto.isActive === 'boolean') {
            query.isActive = filterDto.isActive;
        }

        return this.productsRepository.findWithPagination(
            {
                query,
                page: filterDto.page || 1,
                limit: filterDto.limit || 10,
                select: '',
                sort: filterDto.sort || '-created_at',
                populate: {
                    path: 'categoryId',
                    select: 'name description',
                },
            },
            tracerId,
        );
    }

    async findOne(id: string, tracerId?: string): Promise<ProductsDocument> {
        this.logger.log(`Finding product with ID: ${id}`, tracerId);

        const product = await this.productsRepository.findOne(
            {
                query: { _id: id },
                select: '',
            },
            tracerId,
        );

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }

    async update(
        id: string,
        updateProductDto: UpdateProductDto,
        tracerId?: string,
    ): Promise<ProductsDocument> {
        this.logger.log(`Updating product with ID: ${id}`, tracerId);

        const updated = await this.productsRepository.updateOne(
            {
                query: { _id: id },
                update: updateProductDto,
            },
            tracerId,
        );

        if (!updated) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: string, tracerId?: string): Promise<void> {
        this.logger.log(`Removing product with ID: ${id}`, tracerId);

        const product = await this.findOne(id, tracerId);

        await this.productsRepository.delete(
            { query: { _id: id } },
            tracerId,
        );
    }

    async findByCategory(
        category: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.log(`Finding products by category: ${category}`, tracerId);
        return this.productsRepository.findByCategory(category, tracerId);
    }

    async findByCategoryId(
        categoryId: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.log(`Finding products by category ID: ${categoryId}`, tracerId);
        return this.productsRepository.findByCategoryId(categoryId, tracerId);
    }

    async findFeaturedProducts(
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.log('Finding featured products', tracerId);
        return this.productsRepository.findFeaturedProducts(tracerId);
    }

    async findByProductType(
        productType: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.log(`Finding products by type: ${productType}`, tracerId);
        return this.productsRepository.findByProductType(productType, tracerId);
    }
}
