import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({
    collection: 'products',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class Products {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    price: string;

    @Prop({ type: String, required: true })
    category: string;

    @Prop({ type: Types.ObjectId, ref: 'Categories', required: false })
    categoryId?: Types.ObjectId;

    @Prop({ type: String, required: true })
    giftImage: string;

    @Prop({ type: String, required: true })
    productImage: string;

    @Prop({ type: String, required: true })
    giftIcon: string;

    @Prop({ type: String, default: '' })
    description?: string;

    @Prop({ type: Number, default: 0 })
    stock?: number;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: Boolean, default: false })
    isFeatured?: boolean;

    @Prop({ type: String, enum: ['individual', 'box'], default: 'individual' })
    productType?: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
