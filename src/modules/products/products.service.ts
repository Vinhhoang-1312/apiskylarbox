import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductsRepository } from './repositories/products.repository';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto/products.dto';
import { ProductsDocument } from './schemas/products.schema';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async create(createProductDto: CreateProductDto, tracerId?: string): Promise<ProductsDocument> {
        return this.productsRepository.insert(
            {
                update: createProductDto,
            },
            tracerId,
        );
    }

    async findAll(query: QueryProductDto, tracerId?: string) {
        const { page = 1, limit = 10, search, category } = query;

        let filterQuery: any = { is_delete: false };

        if (search) {
            filterQuery.name = { $regex: search, $options: 'i' };
        }

        if (category) {
            filterQuery.category = category;
        }

        return this.productsRepository.findWithPagination(
            {
                query: filterQuery,
                page,
                limit,
                select: '',
                sort: 'sort_order created_at',
            },
            tracerId,
        );
    }

    async findOne(id: string, tracerId?: string): Promise<ProductsDocument> {
        const product = await this.productsRepository.findOne(
            {
                query: { _id: id, is_delete: false },
                select: '',
            },
            tracerId,
        );

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto, tracerId?: string): Promise<ProductsDocument> {
        const product = await this.productsRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: updateProductDto,
            },
            tracerId,
        );

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async remove(id: string, tracerId?: string): Promise<ProductsDocument> {
        const product = await this.productsRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: { is_delete: true },
            },
            tracerId,
        );

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }
}
