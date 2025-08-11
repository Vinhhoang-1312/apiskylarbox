import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeaturedBoxesDocument = HydratedDocument<FeaturedBoxes>;

@Schema({
    collection: 'featured_boxes',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class FeaturedBoxes {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    price: string;

    @Prop({ type: String, required: true })
    color: string;

    @Prop({ type: String, required: true })
    giftImage: string;

    @Prop({ type: String, required: true })
    productImage: string;

    @Prop({ type: String, required: true })
    giftIcon: string;

    @Prop({ type: String, default: '' })
    slug?: string;

    @Prop({ type: Number, default: 0 })
    stock?: number;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: Boolean, default: false })
    isFeatured?: boolean;

    @Prop({ type: Number, default: 0 })
    order?: number;

    @Prop({ type: [String], default: [] })
    tags?: string[];

    @Prop({ type: String, default: '' })
    category?: string;
}

export const FeaturedBoxesSchema = SchemaFactory.createForClass(FeaturedBoxes);
