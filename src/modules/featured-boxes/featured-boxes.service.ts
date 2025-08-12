import { Injectable, NotFoundException } from '@nestjs/common';

import { AppLogger } from '@shared/logger/logger.service';

import { CreateFeaturedBoxDto, UpdateFeaturedBoxDto, FilterFeaturedBoxDto } from './dto/featured-boxes.dto';
import { FeaturedBoxesRepository } from './repositories/featured-boxes.repository';
import { FeaturedBoxesDocument } from './schemas/featured-boxes.schema';

@Injectable()
export class FeaturedBoxesService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(private readonly featuredBoxesRepository: FeaturedBoxesRepository) { }

    async create(
        createFeaturedBoxDto: CreateFeaturedBoxDto,
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument> {
        this.logger.log('Creating new featured box', tracerId);

        // Generate slug from name if not provided
        if (!createFeaturedBoxDto.slug) {
            createFeaturedBoxDto.slug = this.generateSlug(createFeaturedBoxDto.name);
        }

        return this.featuredBoxesRepository.insert(
            { update: createFeaturedBoxDto },
            tracerId,
        );
    }

    async findAll(
        filterDto: FilterFeaturedBoxDto,
        tracerId?: string,
    ): Promise<{
        list: FeaturedBoxesDocument[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }> {
        this.logger.log('Finding all featured boxes', tracerId);

        const query: any = {};

        if (filterDto.search) {
            query.$or = [
                { name: { $regex: filterDto.search, $options: 'i' } },
                { description: { $regex: filterDto.search, $options: 'i' } },
            ];
        }

        if (filterDto.category) {
            query.category = filterDto.category;
        }

        if (filterDto.tags && filterDto.tags.length > 0) {
            query.tags = { $in: filterDto.tags };
        }

        if (typeof filterDto.isFeatured === 'boolean') {
            query.isFeatured = filterDto.isFeatured;
        }

        if (typeof filterDto.isActive === 'boolean') {
            query.isActive = filterDto.isActive;
        }

        return this.featuredBoxesRepository.findWithPagination(
            {
                query,
                page: filterDto.page || 1,
                limit: filterDto.limit || 10,
                select: '',
                sort: filterDto.sort || 'order',
            },
            tracerId,
        );
    }

    async findOne(id: string, tracerId?: string): Promise<FeaturedBoxesDocument> {
        this.logger.log(`Finding featured box with ID: ${id}`, tracerId);

        const box = await this.featuredBoxesRepository.findOne(
            {
                query: { _id: id },
                select: '',
            },
            tracerId,
        );

        if (!box) {
            throw new NotFoundException(`Featured box with ID ${id} not found`);
        }

        return box;
    }

    async findBySlug(slug: string, tracerId?: string): Promise<FeaturedBoxesDocument> {
        this.logger.log(`Finding featured box with slug: ${slug}`, tracerId);

        const box = await this.featuredBoxesRepository.findBySlug(slug, tracerId);

        if (!box) {
            throw new NotFoundException(`Featured box with slug ${slug} not found`);
        }

        return box;
    }

    async update(
        id: string,
        updateFeaturedBoxDto: UpdateFeaturedBoxDto,
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument> {
        this.logger.log(`Updating featured box with ID: ${id}`, tracerId);

        // Check if box exists
        await this.findOne(id, tracerId);

        // Update slug if name changes and no custom slug provided
        if (updateFeaturedBoxDto.name && !updateFeaturedBoxDto.slug) {
            updateFeaturedBoxDto.slug = this.generateSlug(updateFeaturedBoxDto.name);
        }

        const updated = await this.featuredBoxesRepository.updateOne(
            {
                query: { _id: id },
                update: updateFeaturedBoxDto,
            },
            tracerId,
        );

        if (!updated) {
            throw new NotFoundException(`Featured box with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: string, tracerId?: string): Promise<void> {
        this.logger.log(`Removing featured box with ID: ${id}`, tracerId);

        const box = await this.findOne(id, tracerId);

        await this.featuredBoxesRepository.delete(
            { query: { _id: id } },
            tracerId,
        );
    }

    async findByCategory(
        category: string,
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.log(`Finding featured boxes by category: ${category}`, tracerId);
        return this.featuredBoxesRepository.findByCategory(category, tracerId);
    }

    async findFeaturedBoxes(
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.log('Finding featured boxes', tracerId);
        return this.featuredBoxesRepository.findFeaturedBoxes(tracerId);
    }

    async findActiveBoxes(
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.log('Finding active featured boxes', tracerId);
        return this.featuredBoxesRepository.findActiveBoxes(tracerId);
    }

    async findByTags(
        tags: string[],
        tracerId?: string,
    ): Promise<FeaturedBoxesDocument[]> {
        this.logger.log(`Finding featured boxes by tags: ${tags.join(', ')}`, tracerId);
        return this.featuredBoxesRepository.findByTags(tags, tracerId);
    }

    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
}


