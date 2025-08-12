import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { AppLogger } from '@shared/logger/logger.service';

import { CreateCategoryDto, UpdateCategoryDto, FilterCategoryDto } from './dto/categories.dto';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesDocument } from './schemas/categories.schema';

@Injectable()
export class CategoriesService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(private readonly categoriesRepository: CategoriesRepository) { }

    async create(
        createCategoryDto: CreateCategoryDto,
        tracerId?: string,
    ): Promise<CategoriesDocument> {
        this.logger.log('Creating new category', tracerId);

        // Check if category name already exists
        const existingCategory = await this.categoriesRepository.findByName(
            createCategoryDto.name,
            tracerId,
        );

        if (existingCategory) {
            throw new ConflictException(
                `Category with name ${createCategoryDto.name} already exists`,
            );
        }

        // Generate slug from name if not provided
        if (!createCategoryDto.slug) {
            createCategoryDto.slug = this.generateSlug(createCategoryDto.name);
        }

        return this.categoriesRepository.insert(
            { update: createCategoryDto },
            tracerId,
        );
    }

    async findAll(
        filterDto: FilterCategoryDto,
        tracerId?: string,
    ): Promise<{
        list: CategoriesDocument[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }> {
        this.logger.log('Finding all categories', tracerId);

        const query: any = {};

        if (filterDto.search) {
            query.$or = [
                { name: { $regex: filterDto.search, $options: 'i' } },
                { description: { $regex: filterDto.search, $options: 'i' } },
            ];
        }

        if (filterDto.parentId !== undefined) {
            query.parentId = filterDto.parentId;
        }

        if (typeof filterDto.isActive === 'boolean') {
            query.isActive = filterDto.isActive;
        }

        return this.categoriesRepository.findWithPagination(
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

    async findOne(id: string, tracerId?: string): Promise<CategoriesDocument> {
        this.logger.log(`Finding category with ID: ${id}`, tracerId);

        const category = await this.categoriesRepository.findOne(
            {
                query: { _id: id },
                select: '',
            },
            tracerId,
        );

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return category;
    }

    async findBySlug(
        slug: string,
        tracerId?: string,
    ): Promise<CategoriesDocument> {
        this.logger.log(`Finding category with slug: ${slug}`, tracerId);

        const category = await this.categoriesRepository.findBySlug(slug, tracerId);

        if (!category) {
            throw new NotFoundException(`Category with slug ${slug} not found`);
        }

        return category;
    }

    async update(
        id: string,
        updateCategoryDto: UpdateCategoryDto,
        tracerId?: string,
    ): Promise<CategoriesDocument> {
        this.logger.log(`Updating category with ID: ${id}`, tracerId);

        // Check if category exists
        await this.findOne(id, tracerId);

        // If updating name, check for conflicts
        if (updateCategoryDto.name) {
            const existingCategory = await this.categoriesRepository.findByName(
                updateCategoryDto.name,
                tracerId,
            );
            if (existingCategory && existingCategory._id.toString() !== id) {
                throw new ConflictException(
                    `Category with name ${updateCategoryDto.name} already exists`,
                );
            }

            // Update slug if name changes and no custom slug provided
            if (!updateCategoryDto.slug) {
                updateCategoryDto.slug = this.generateSlug(updateCategoryDto.name);
            }
        }

        const updated = await this.categoriesRepository.updateOne(
            {
                query: { _id: id },
                update: updateCategoryDto,
            },
            tracerId,
        );

        if (!updated) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: string, tracerId?: string): Promise<void> {
        this.logger.log(`Removing category with ID: ${id}`, tracerId);

        const category = await this.findOne(id, tracerId);

        // Check if category has subcategories
        const subcategories = await this.categoriesRepository.findByParentId(
            id,
            tracerId,
        );

        if (subcategories.length > 0) {
            throw new ConflictException(
                'Cannot delete category with subcategories. Delete subcategories first.',
            );
        }

        await this.categoriesRepository.delete(
            { query: { _id: id } },
            tracerId,
        );
    }

    async findRootCategories(
        tracerId?: string,
    ): Promise<CategoriesDocument[]> {
        this.logger.log('Finding root categories', tracerId);
        return this.categoriesRepository.findRootCategories(tracerId);
    }

    async findSubcategories(
        parentId: string,
        tracerId?: string,
    ): Promise<CategoriesDocument[]> {
        this.logger.log(`Finding subcategories of parent: ${parentId}`, tracerId);
        return this.categoriesRepository.findByParentId(parentId, tracerId);
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

