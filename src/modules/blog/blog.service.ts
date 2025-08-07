import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogRepository } from './repositories/blog.repository';
import { CreateBlogDto, UpdateBlogDto, QueryBlogDto } from './dto/blog.dto';
import { BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogService {
    constructor(private readonly blogRepository: BlogRepository) { }

    async create(createBlogDto: CreateBlogDto, tracerId?: string): Promise<BlogDocument> {
        return this.blogRepository.insert(
            {
                update: createBlogDto,
            },
            tracerId,
        );
    }

    async findAll(query: QueryBlogDto, tracerId?: string) {
        const { page = 1, limit = 10, search, author } = query;

        let filterQuery: any = { is_delete: false };

        if (search) {
            filterQuery.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
            ];
        }

        if (author) {
            filterQuery.author = author;
        }

        return this.blogRepository.findWithPagination(
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

    async findOne(id: string, tracerId?: string): Promise<BlogDocument> {
        const blog = await this.blogRepository.findOne(
            {
                query: { _id: id, is_delete: false },
                select: '',
            },
            tracerId,
        );

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

    async update(id: string, updateBlogDto: UpdateBlogDto, tracerId?: string): Promise<BlogDocument> {
        const blog = await this.blogRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: updateBlogDto,
            },
            tracerId,
        );

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

    async remove(id: string, tracerId?: string): Promise<BlogDocument> {
        const blog = await this.blogRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: { is_delete: true },
            },
            tracerId,
        );

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }
}
