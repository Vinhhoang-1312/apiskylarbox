import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({
    collection: 'categories',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class Categories {
    @Prop({ type: String, required: true, unique: true })
    name: string;

    @Prop({ type: String, default: '' })
    description?: string;

    @Prop({ type: String, default: '' })
    image?: string;

    @Prop({ type: String, default: null })
    parentId?: string;

    @Prop({ type: Number, default: 0 })
    order?: number;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: String, default: '' })
    slug?: string;

    @Prop({ type: String, default: '' })
    color?: string;

    @Prop({ type: String, default: '' })
    icon?: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
