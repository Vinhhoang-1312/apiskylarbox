import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartnersDocument = HydratedDocument<Partners>;

@Schema({
    _id: false,
})
export class Sponsorship {
    @Prop({ type: String, required: true })
    type: string;

    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ type: String, required: true })
    detail: string;
}

@Schema({
    _id: false,
})
export class Representative {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    position: string;

    @Prop({ type: String, default: '' })
    dob: string;

    @Prop({ type: String, default: '' })
    facebook: string;

    @Prop({ type: String, default: '' })
    email: string;

    @Prop({ type: String, default: '' })
    phone: string;
}

@Schema({
    collection: 'partners',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class Partners {
    @Prop({ type: Number, required: true, unique: true })
    id: number;

    @Prop({ type: String, required: true })
    companyName: string;

    @Prop({ type: String, required: true })
    shortName: string;

    @Prop({ type: String, required: true })
    website: string;

    @Prop({ type: String, required: true })
    fanpage: string;

    @Prop({ type: Sponsorship, required: true })
    sponsorship: Sponsorship;

    @Prop({ type: String, required: true })
    package: string;

    @Prop({ type: String, required: true })
    logo: string;

    @Prop({ type: Representative, required: true })
    representative: Representative;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export const PartnersSchema = SchemaFactory.createForClass(Partners);
