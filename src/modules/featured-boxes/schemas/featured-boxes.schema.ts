import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeaturedBoxesDocument = HydratedDocument<FeaturedBoxes>;

@Schema({
    collection: 'FeaturedBoxes',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_update',
    },
})
export class FeaturedBoxes {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    price: string;

    @Prop({ type: String, default: '' })
    color: string;

    @Prop({ type: String, default: '' })
    giftImage: string;

    @Prop({ type: String, default: '' })
    productImage: string;

    @Prop({ type: String, default: '' })
    giftIcon: string;

    @Prop({ type: Number, default: 0 })
    sort_order: number;

    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Boolean, default: false })
    is_delete: boolean;
}

export const FeaturedBoxesSchema = SchemaFactory.createForClass(FeaturedBoxes);
