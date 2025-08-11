import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';

import { Blog, BlogDocument } from '../schemas/blog.schema';

@Injectable()
export class BlogRepository extends BaseRepository<BlogDocument> {
    constructor(
        @InjectModel(Blog.name)
        private readonly blogModel: Model<BlogDocument>,
    ) {
        super(blogModel);
    }

    async findBySlug(
        slug: string,
        tracerId?: string,
    ): Promise<BlogDocument | null> {
        this.logger.debug(`Finding blog post by slug: ${slug}`, tracerId);
        return this.blogModel.findOne({ slug, isPublished: true }).exec();
    }

    async findByCategory(
        category: string,
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.debug(
            `Finding blog posts by category: ${category}`,
            tracerId,
        );
        return this.blogModel
            .find({ category, isPublished: true })
            .sort('-publishedDate')
            .exec();
    }

    async findByAuthor(
        author: string,
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.debug(
            `Finding blog posts by author: ${author}`,
            tracerId,
        );
        return this.blogModel
            .find({ author, isPublished: true })
            .sort('-publishedDate')
            .exec();
    }

    async findByTags(
        tags: string[],
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.debug(
            `Finding blog posts by tags: ${tags.join(', ')}`,
            tracerId,
        );
        return this.blogModel
            .find({ tags: { $in: tags }, isPublished: true })
            .sort('-publishedDate')
            .exec();
    }

    async findFeaturedPosts(
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.debug('Finding featured blog posts', tracerId);
        return this.blogModel
            .find({ isFeatured: true, isPublished: true })
            .sort('-publishedDate')
            .limit(10)
            .exec();
    }

    async findPopularPosts(
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.debug('Finding popular blog posts', tracerId);
        return this.blogModel
            .find({ isPublished: true })
            .sort('-viewCount')
            .limit(10)
            .exec();
    }

    async incrementViewCount(
        id: string,
        tracerId?: string,
    ): Promise<BlogDocument | null> {
        this.logger.debug(`Incrementing view count for blog: ${id}`, tracerId);
        return this.blogModel
            .findByIdAndUpdate(
                id,
                { $inc: { viewCount: 1 } },
                { new: true },
            )
            .exec();
    }

    async incrementLikeCount(
        id: string,
        tracerId?: string,
    ): Promise<BlogDocument | null> {
        this.logger.debug(`Incrementing like count for blog: ${id}`, tracerId);
        return this.blogModel
            .findByIdAndUpdate(
                id,
                { $inc: { likeCount: 1 } },
                { new: true },
            )
            .exec();
    }

    async searchPosts(
        searchTerm: string,
        tracerId?: string,
    ): Promise<BlogDocument[]> {
        this.logger.debug(
            `Searching blog posts with term: ${searchTerm}`,
            tracerId,
        );
        return this.blogModel
            .find({
                $and: [
                    { isPublished: true },
                    {
                        $or: [
                            { title: { $regex: searchTerm, $options: 'i' } },
                            { excerpt: { $regex: searchTerm, $options: 'i' } },
                            { content: { $regex: searchTerm, $options: 'i' } },
                            { tags: { $in: [new RegExp(searchTerm, 'i')] } },
                        ],
                    },
                ],
            })
            .sort('-publishedDate')
            .exec();
    }
}
