import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PartnersDocument = HydratedDocument<Partners>;

@Schema({
    collection: 'Partners',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'last_update',
    },
})
export class Partners {
    @Prop({ type: Number, required: true, unique: true })
    id: number;

    @Prop({ type: String, required: true })
    companyName: string;

    @Prop({ type: String, required: true })
    shortName: string;

    @Prop({ type: String, default: '' })
    website: string;

    @Prop({ type: String, default: '' })
    fanpage: string;

    @Prop({
        type: {
            type: { type: String, default: '' },
            amount: { type: Number, default: 0 },
            detail: { type: String, default: '' },
        },
        default: {},
    })
    sponsorship: {
        type: string;
        amount: number;
        detail: string;
    };

    @Prop({ type: String, default: '' })
    package: string;

    @Prop({ type: String, default: '' })
    logo: string;

    @Prop({
        type: {
            title: { type: String, default: '' },
            name: { type: String, default: '' },
            position: { type: String, default: '' },
            dob: { type: String, default: '' },
            facebook: { type: String, default: '' },
            email: { type: String, default: '' },
            phone: { type: String, default: '' },
        },
        default: {},
    })
    representative: {
        title: string;
        name: string;
        position: string;
        dob: string;
        facebook: string;
        email: string;
        phone: string;
    };

    @Prop({ type: Boolean, default: true })
    is_active: boolean;

    @Prop({ type: Boolean, default: false })
    is_delete: boolean;
}

export const PartnersSchema = SchemaFactory.createForClass(Partners);
