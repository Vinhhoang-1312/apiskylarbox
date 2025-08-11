import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({
    collection: 'blog',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class Blog {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    excerpt: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: String, default: '' })
    slug?: string;

    @Prop({ type: String, default: '' })
    author?: string;

    @Prop({ type: String, default: '' })
    featuredImage?: string;

    @Prop({ type: [String], default: [] })
    tags?: string[];

    @Prop({ type: String, default: '' })
    category?: string;

    @Prop({ type: Date, default: Date.now })
    publishedDate?: Date;

    @Prop({ type: Boolean, default: true })
    isPublished: boolean;

    @Prop({ type: Boolean, default: false })
    isFeatured?: boolean;

    @Prop({ type: Number, default: 0 })
    viewCount?: number;

    @Prop({ type: Number, default: 0 })
    likeCount?: number;

    @Prop({ type: String, default: '' })
    metaTitle?: string;

    @Prop({ type: String, default: '' })
    metaDescription?: string;

    @Prop({ type: [String], default: [] })
    metaKeywords?: string[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
