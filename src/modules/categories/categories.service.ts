import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoriesRepository } from './repositories/categories.repository';
import { CreateCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './dto/categories.dto';
import { CategoriesDocument } from './schemas/categories.schema';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) { }

    async create(createCategoryDto: CreateCategoryDto, tracerId?: string): Promise<CategoriesDocument> {
        return this.categoriesRepository.insert(
            {
                update: createCategoryDto,
            },
            tracerId,
        );
    }

    async findAll(query: QueryCategoryDto, tracerId?: string) {
        const { page = 1, limit = 10, search } = query;

        let filterQuery: any = { is_delete: false };

        if (search) {
            filterQuery.name = { $regex: search, $options: 'i' };
        }

        return this.categoriesRepository.findWithPagination(
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

    async findOne(id: string, tracerId?: string): Promise<CategoriesDocument> {
        const category = await this.categoriesRepository.findOne(
            {
                query: { _id: id, is_delete: false },
                select: '',
            },
            tracerId,
        );

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto, tracerId?: string): Promise<CategoriesDocument> {
        const category = await this.categoriesRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: updateCategoryDto,
            },
            tracerId,
        );

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }

    async remove(id: string, tracerId?: string): Promise<CategoriesDocument> {
        const category = await this.categoriesRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: { is_delete: true },
            },
            tracerId,
        );

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }
}
