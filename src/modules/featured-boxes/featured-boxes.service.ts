import { Injectable, NotFoundException } from '@nestjs/common';

import { FeaturedBoxesRepository } from './repositories/featured-boxes.repository';
import { CreateFeaturedBoxDto, UpdateFeaturedBoxDto, QueryFeaturedBoxDto } from './dto/featured-boxes.dto';
import { FeaturedBoxesDocument } from './schemas/featured-boxes.schema';

@Injectable()
export class FeaturedBoxesService {
    constructor(private readonly featuredBoxesRepository: FeaturedBoxesRepository) { }

    async create(createFeaturedBoxDto: CreateFeaturedBoxDto, tracerId?: string): Promise<FeaturedBoxesDocument> {
        return this.featuredBoxesRepository.insert(
            {
                update: createFeaturedBoxDto,
            },
            tracerId,
        );
    }

    async findAll(query: QueryFeaturedBoxDto, tracerId?: string) {
        const { page = 1, limit = 10, search } = query;

        let filterQuery: any = { is_delete: false };

        if (search) {
            filterQuery.name = { $regex: search, $options: 'i' };
        }

        return this.featuredBoxesRepository.findWithPagination(
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

    async findOne(id: string, tracerId?: string): Promise<FeaturedBoxesDocument> {
        const featuredBox = await this.featuredBoxesRepository.findOne(
            {
                query: { _id: id, is_delete: false },
                select: '',
            },
            tracerId,
        );

        if (!featuredBox) {
            throw new NotFoundException('Featured box not found');
        }

        return featuredBox;
    }

    async update(id: string, updateFeaturedBoxDto: UpdateFeaturedBoxDto, tracerId?: string): Promise<FeaturedBoxesDocument> {
        const featuredBox = await this.featuredBoxesRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: updateFeaturedBoxDto,
            },
            tracerId,
        );

        if (!featuredBox) {
            throw new NotFoundException('Featured box not found');
        }

        return featuredBox;
    }

    async remove(id: string, tracerId?: string): Promise<FeaturedBoxesDocument> {
        const featuredBox = await this.featuredBoxesRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: { is_delete: true },
            },
            tracerId,
        );

        if (!featuredBox) {
            throw new NotFoundException('Featured box not found');
        }

        return featuredBox;
    }
}
