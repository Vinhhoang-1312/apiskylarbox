import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';

import { Categories, CategoriesDocument } from '../schemas/categories.schema';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoriesDocument> {
    constructor(
        @InjectModel(Categories.name)
        private readonly categoriesModel: Model<CategoriesDocument>,
    ) {
        super(categoriesModel);
    }

    async findBySlug(
        slug: string,
        tracerId?: string,
    ): Promise<CategoriesDocument | null> {
        this.logger.debug(`Finding category by slug: ${slug}`, tracerId);
        return this.categoriesModel.findOne({ slug, isActive: true }).exec();
    }

    async findByParentId(
        parentId: string | null,
        tracerId?: string,
    ): Promise<CategoriesDocument[]> {
        this.logger.debug(
            `Finding categories by parent ID: ${parentId}`,
            tracerId,
        );
        return this.categoriesModel
            .find({ parentId, isActive: true })
            .sort('order')
            .exec();
    }

    async findRootCategories(
        tracerId?: string,
    ): Promise<CategoriesDocument[]> {
        this.logger.debug('Finding root categories', tracerId);
        return this.categoriesModel
            .find({ $or: [{ parentId: null }, { parentId: '' }], isActive: true })
            .sort('order')
            .exec();
    }

    async findByName(
        name: string,
        tracerId?: string,
    ): Promise<CategoriesDocument | null> {
        this.logger.debug(`Finding category by name: ${name}`, tracerId);
        return this.categoriesModel.findOne({ name }).exec();
    }

    async searchCategories(
        searchTerm: string,
        tracerId?: string,
    ): Promise<CategoriesDocument[]> {
        this.logger.debug(
            `Searching categories with term: ${searchTerm}`,
            tracerId,
        );
        return this.categoriesModel
            .find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                ],
                isActive: true,
            })
            .sort('order')
            .exec();
    }
}

