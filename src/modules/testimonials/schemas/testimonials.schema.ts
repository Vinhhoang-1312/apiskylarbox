import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestimonialsDocument = HydratedDocument<Testimonials>;

@Schema({
    collection: 'Testimonials',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_update',
    },
})
export class Testimonials {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: Number, required: true, min: 1, max: 5 })
    rating: number;

    @Prop({ type: String, default: '' })
    avatar: string;

    @Prop({ type: String, default: '' })
    position: string;

    @Prop({ type: String, default: '' })
    company: string;

    @Prop({ type: Number, default: 0 })
    sort_order: number;

    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Boolean, default: false })
    is_delete: boolean;
}

export const TestimonialsSchema = SchemaFactory.createForClass(Testimonials);
