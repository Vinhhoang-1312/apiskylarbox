import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserRolesDocument = Document & UserRoles;

@Schema({ timestamps: true })
export class UserRoles {
    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    userId: Types.ObjectId;

    @Prop({ type: String, required: true, enum: ['user', 'admin', 'moderator'] })
    role: string;

    @Prop({ type: String, default: '' })
    description?: string;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const UserRolesSchema = SchemaFactory.createForClass(UserRoles);
