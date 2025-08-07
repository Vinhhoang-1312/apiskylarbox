import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({
    collection: 'Products',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_update',
    },
})
export class Products {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    price: string;

    @Prop({ type: String, required: true })
    category: string;

    @Prop({ type: String, default: '' })
    giftImage: string;

    @Prop({ type: String, default: '' })
    productImage: string;

    @Prop({ type: String, default: '' })
    giftIcon: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Prop({ type: Number, default: 0 })
    sort_order: number;

    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Boolean, default: false })
    is_delete: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
