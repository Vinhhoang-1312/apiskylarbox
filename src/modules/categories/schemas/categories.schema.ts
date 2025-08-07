import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({
    collection: 'Categories',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_update',
    },
})
export class Categories {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: String, default: '' })
    icon: string;

    @Prop({ type: String, default: '' })
    color: string;

    @Prop({ type: Number, default: 0 })
    sort_order: number;

    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Boolean, default: false })
    is_delete: boolean;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
