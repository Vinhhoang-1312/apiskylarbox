import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({
    collection: 'Blog',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_update',
    },
})
export class Blog {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    excerpt: string;

    @Prop({ type: String, required: true })
    date: string;

    @Prop({ type: String, default: '' })
    content: string;

    @Prop({ type: String, default: '' })
    author: string;

    @Prop({ type: String, default: '' })
    image: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: Number, default: 0 })
    sort_order: number;

    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Boolean, default: false })
    is_delete: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
