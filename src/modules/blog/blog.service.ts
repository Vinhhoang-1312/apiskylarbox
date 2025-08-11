import { Injectable, NotFoundException } from '@nestjs/common';

import { AppLogger } from '@shared/logger/logger.service';

import { CreateBlogDto, UpdateBlogDto, FilterBlogDto } from './dto/blog.dto';
import { BlogRepository } from './repositories/blog.repository';
import { BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(private readonly blogRepository: BlogRepository) { }

    async create(
        createBlogDto: CreateBlogDto,
        tracerId?: string,
    ): Promise<BlogDocument> {
        this.logger.log('Creating new blog post', tracerId);

        // Generate slug from title if not provided
        if (!createBlogDto.slug) {
            createBlogDto.slug = this.generateSlug(createBlogDto.title);
        }

        // Set published date if not provided and post is published
        if (createBlogDto.isPublished && !createBlogDto.publishedDate) {
            createBlogDto.publishedDate = new Date();
        }

        return this.blogRepository.insert(
            { update: createBlogDto },
            tracerId,
        );
    }

    async findAll(
        filterDto: FilterBlogDto,
        tracerId?: string,
    ): Promise<{
        list: BlogDocument[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }> {
        this.logger.log('Finding all blog posts', tracerId);

        const query: any = {};

        if (filterDto.search) {
            query.$or = [
                { title: { $regex: filterDto.search, $options: 'i' } },
                { excerpt: { $regex: filterDto.search, $options: 'i' } },
                { content: { $regex: filterDto.search, $options: 'i' } },
            ];
        }

        if (filterDto.category) {
            query.category = filterDto.category;
        }

        if (filterDto.author) {
            query.author = filterDto.author;
        }

        if (filterDto.tags && filterDto.tags.length > 0) {
            query.tags = { $in: filterDto.tags };
        }

        if (typeof filterDto.isPublished === 'boolean') {
            query.isPublished = filterDto.isPublished;
        }

        if (typeof filterDto.isFeatured === 'boolean') {
            query.isFeatured = filterDto.isFeatured;
        }

        return this.blogRepository.findWithPagination(
            {
                query,
                page: filterDto.page || 1,
                limit: filterDto.limit || 10,
                select: '-content',
                sort: filterDto.sort || '-publishedDate',
            },
            tracerId,
        );
    }

    async findOne(id: string, tracerId?: string): Promise<BlogDocument> {
        this.logger.log(`Finding blog post with ID: ${id}`, tracerId);

        const blog = await this.blogRepository.findOne(
            {
                query: { _id: id },
                select: '',
            },
            tracerId,
        );

        if (!blog) {
            throw new NotFoundException(`Blog post with ID ${id} not found`);
        }

        // Increment view count
        await this.blogRepository.incrementViewCount(id, tracerId);

        return blog;
    }

    async findBySlug(slug: string, tracerId?: string): Promise<BlogDocument> {
        this.logger.log(`Finding blog post with slug: ${slug}`, tracerId);

        const blog = await this.blogRepository.findBySlug(slug, tracerId);

        if (!blog) {
            throw new NotFoundException(`Blog post with slug ${slug} not found`);
        }

        // Increment view count
        await this.blogRepository.incrementViewCount(blog._id.toString(), tracerId);

        return blog;
    }

    async update(
        id: string,
        updateBlogDto: UpdateBlogDto,
        tracerId?: string,
    ): Promise<BlogDocument> {
        this.logger.log(`Updating blog post with ID: ${id}`, tracerId);

        // Check if blog exists
        await this.findOne(id, tracerId);

        // Update slug if title changes and no custom slug provided
        if (updateBlogDto.title && !updateBlogDto.slug) {
            updateBlogDto.slug = this.generateSlug(updateBlogDto.title);
        }

        // Set published date if changing to published and not already set
        if (updateBlogDto.isPublished && !updateBlogDto.publishedDate) {
            const existingBlog = await this.blogRepository.findOne(
                { query: { _id: id }, select: 'publishedDate' },
                tracerId,
            );
            if (!existingBlog?.publishedDate) {
                updateBlogDto.publishedDate = new Date();
            }
        }

        const updated = await this.blogRepository.updateOne(
            {
                query: { _id: id },
                update: updateBlogDto,
            },
            tracerId,
        );

        if (!updated) {
            throw new NotFoundException(`Blog post with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: string, tracerId?: string): Promise<void> {
        this.logger.log(`Removing blog post with ID: ${id}`, tracerId);

        const blog = await this.findOne(id, tracerId);

        await this.blogRepository.delete(
            { query: { _id: id } },
            tracerId,
        );
    }

    async findByCategory(
        category: string,
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.log(`Finding blog posts by category: ${category}`, tracerId);
        return this.blogRepository.findByCategory(category, tracerId);
    }

    async findByAuthor(
        author: string,
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.log(`Finding blog posts by author: ${author}`, tracerId);
        return this.blogRepository.findByAuthor(author, tracerId);
    }

    async findByTags(
        tags: string[],
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.log(`Finding blog posts by tags: ${tags.join(', ')}`, tracerId);
        return this.blogRepository.findByTags(tags, tracerId);
    }

    async findFeaturedPosts(tracerId?: string): Promise<BlogDocument[]> {
        this.logger.log('Finding featured blog posts', tracerId);
        return this.blogRepository.findFeaturedPosts(tracerId);
    }

    async findPopularPosts(tracerId?: string): Promise<BlogDocument[]> {
        this.logger.log('Finding popular blog posts', tracerId);
        return this.blogRepository.findPopularPosts(tracerId);
    }

    async incrementLikeCount(
        id: string,
        tracerId?: string,
    ): Promise<BlogDocument> {
        this.logger.log(`Incrementing like count for blog: ${id}`, tracerId);

        const blog = await this.blogRepository.incrementLikeCount(id, tracerId);

        if (!blog) {
            throw new NotFoundException(`Blog post with ID ${id} not found`);
        }

        return blog;
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
}
