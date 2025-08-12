import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';

import { Products, ProductsDocument } from '../schemas/products.schema';

@Injectable()
export class ProductsRepository extends BaseRepository<ProductsDocument> {
    constructor(
        @InjectModel(Products.name)
        private readonly productsModel: Model<ProductsDocument>,
    ) {
        super(productsModel);
    }

    async findByCategory(
        category: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.debug(
            `Finding products by category: ${category}`,
            tracerId,
        );
        return this.productsModel
            .find({ category, isActive: true })
            .exec();
    }

    async findByCategoryId(
        categoryId: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.debug(
            `Finding products by category ID: ${categoryId}`,
            tracerId,
        );
        return this.productsModel
            .find({ categoryId, isActive: true })
            .populate('categoryId')
            .exec();
    }

    async findFeaturedProducts(
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.debug(
            'Finding featured products',
            tracerId,
        );
        return this.productsModel
            .find({ isFeatured: true, isActive: true })
            .sort('-created_at')
            .exec();
    }

    async findByProductType(
        productType: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.debug(
            `Finding products by type: ${productType}`,
            tracerId,
        );
        return this.productsModel
            .find({ productType, isActive: true })
            .exec();
    }

    async searchProducts(
        searchTerm: string,
        tracerId?: string,
    ): Promise<ProductsDocument[]> {
        this.logger.debug(
            `Searching products with term: ${searchTerm}`,
            tracerId,
        );
        return this.productsModel
            .find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
                isActive: true,
            })
            .exec();
    }
}

