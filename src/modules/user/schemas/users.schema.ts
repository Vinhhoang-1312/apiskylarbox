import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  collection: 'Users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'last_update',
  },
})
export class Users {
  // index
  @Prop({ type: String, required: true })
  business_id: string;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: String, required: true })
  user_name: string;

  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: '' })
  token: string;

  @Prop({ type: String, default: '' })
  address: string;

  @Prop({ type: Boolean, default: false })
  is_admin: boolean;

  @Prop({ type: Boolean, default: false })
  forget_password: boolean;

  @Prop({ type: String, default: '' })
  spid: string;

  @Prop({ type: String, default: '' })
  agent_id: string;

  @Prop({ type: Boolean, default: false })
  view_charge: boolean;

  @Prop({ type: Boolean, default: true })
  default_pw: boolean;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop()
  token_expired_at?: Date;

  @Prop({ default: Date.now })
  created_date: Date;

  @Prop({ default: Date.now })
  latest_update: Date;

  @Prop({ type: String })
  code: string;

  @Prop({ type: Boolean, default: false })
  otp_code: boolean;

  @Prop({ type: Number, default: 0 })
  otp_fail: number;

  @Prop({ type: String, default: '' })
  name_display: string;

  @Prop({ type: String, default: '' })
  name_identification: string;

  @Prop({ type: Number, default: 0 })
  status_email: number;

  @Prop({ type: String, default: '' })
  web: string;

  @Prop({ type: Number, default: 0 })
  status_web: number;

  @Prop({ type: String, default: '' })
  bio: string;

  @Prop({ type: String, default: '' })
  status_bio: string;

  @Prop({ type: Number, default: 0 })
  gender: number;

  @Prop({ type: Number, default: 0 })
  status_gender: number;

  @Prop({ type: String, default: '' })
  date_of_birth: string;

  @Prop({ type: Number, default: 0 })
  status_date_of_birth: number;

  @Prop({ type: String, default: '' })
  card_type: string;

  @Prop({ type: String, default: '' })
  id_card: string;

  @Prop({ type: String, default: '' })
  location_card: string;

  @Prop({ type: Date })
  date_card: Date;

  @Prop({ type: String, default: '' })
  fullname: string;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: String, default: '' })
  cmnd1: string;

  @Prop({ type: String, default: '' })
  cmnd2: string;

  @Prop({ type: Boolean, default: false })
  otp_lifetime: boolean;

  @Prop({ type: Boolean, default: false })
  otp_last_time: boolean;

  @Prop({ type: Boolean, default: false })
  is_delete: boolean;

  @Prop({ type: Number, default: 0 })
  status_address: number;

  @Prop({ type: Number, default: 0 })
  status: number;

  @Prop({ type: [String], default: [] })
  followers: string[];

  @Prop({ type: [String], default: [] })
  following: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
