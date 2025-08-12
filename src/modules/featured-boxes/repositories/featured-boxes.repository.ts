import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';

import { FeaturedBoxes, FeaturedBoxesDocument } from '../schemas/featured-boxes.schema';

@Injectable()
export class FeaturedBoxesRepository extends BaseRepository<FeaturedBoxesDocument> {
    constructor(
        @InjectModel(FeaturedBoxes.name)
        private readonly featuredBoxesModel: Model<FeaturedBoxesDocument>,
    ) {
        super(featuredBoxesModel);
    }

    async findBySlug(
        slug: string,
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument | null> {
        this.logger.debug(`Finding featured box by slug: ${slug}`, tracerId);
        return this.featuredBoxesModel.findOne({ slug, isActive: true }).exec();
    }

    async findByCategory(
        category: string,
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.debug(
            `Finding featured boxes by category: ${category}`,
            tracerId,
        );
        return this.featuredBoxesModel
            .find({ category, isActive: true })
            .sort('order')
            .exec();
    }

    async findFeaturedBoxes(
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.debug('Finding featured boxes', tracerId);
        return this.featuredBoxesModel
            .find({ isFeatured: true, isActive: true })
            .sort('order')
            .exec();
    }

    async findByTags(
        tags: string[],
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.debug(
            `Finding featured boxes by tags: ${tags.join(', ')}`,
            tracerId,
        );
        return this.featuredBoxesModel
            .find({ tags: { $in: tags }, isActive: true })
            .sort('order')
            .exec();
    }

    async searchBoxes(
        searchTerm: string,
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.debug(
            `Searching featured boxes with term: ${searchTerm}`,
            tracerId,
        );
        return this.featuredBoxesModel
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

    async findActiveBoxes(
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.debug('Finding active featured boxes', tracerId);
        return this.featuredBoxesModel
            .find({ isActive: true })
            .sort('order')
            .exec();
    }
}


