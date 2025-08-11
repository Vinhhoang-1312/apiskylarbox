import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppLogger } from '@shared/logger/logger.service';
import { BaseRepository } from '@modules/base/base.repository';

import { Users, UsersDocument } from '../schemas/users.schema';

@Injectable()
export class UserRepository extends BaseRepository<UsersDocument> {
    constructor(
        @InjectModel(Users.name)
        private readonly userModel: Model<UsersDocument>,
    ) {
        super(userModel);
    }

    async findByEmail(
        email: string,
        tracerId?: string,
    ): Promise<UsersDocument | null> {
        this.logger.log(`Finding user by email: ${email}`, tracerId);
        return this.userModel.findOne({ email, is_delete: false }).exec();
    }

    async findByUsername(
        username: string,
        tracerId?: string,
    ): Promise<UsersDocument | null> {
        this.logger.log(`Finding user by username: ${username}`, tracerId);
        return this.userModel.findOne({ user_name: username, is_delete: false }).exec();
    }

    async findByBusinessId(
        businessId: string,
        tracerId?: string,
    ): Promise<UsersDocument[]> {
        this.logger.log(`Finding users by business ID: ${businessId}`, tracerId);
        return this.userModel.find({ business_id: businessId, is_delete: false }).exec();
    }

    async findAdmins(tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log('Finding admin users', tracerId);
        return this.userModel.find({ is_admin: true, is_delete: false }).exec();
    }

    async findActiveUsers(tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log('Finding active users', tracerId);
        return this.userModel.find({ is_active: true, is_delete: false }).exec();
    }

    async searchUsers(
        searchTerm: string,
        tracerId?: string,
    ): Promise<UsersDocument[]> {
        this.logger.log(`Searching users with term: ${searchTerm}`, tracerId);
        const regex = new RegExp(searchTerm, 'i');
        return this.userModel.find({
            $or: [
                { user_name: regex },
                { email: regex },
                { first_name: regex },
                { last_name: regex },
                { fullname: regex },
            ],
            is_delete: false,
        }).exec();
    }

    async updateLastLogin(
        userId: string,
        tracerId?: string,
    ): Promise<UsersDocument | null> {
        this.logger.log(`Updating last login for user: ${userId}`, tracerId);
        return this.userModel.findByIdAndUpdate(
            userId,
            { latest_update: new Date() },
            { new: true }
        ).exec();
    }

    async updatePassword(
        userId: string,
        hashedPassword: string,
        tracerId?: string,
    ): Promise<UsersDocument | null> {
        this.logger.log(`Updating password for user: ${userId}`, tracerId);
        return this.userModel.findByIdAndUpdate(
            userId,
            {
                password: hashedPassword,
                default_pw: false,
                latest_update: new Date()
            },
            { new: true }
        ).exec();
    }

    async softDelete(
        userId: string,
        tracerId?: string,
    ): Promise<UsersDocument | null> {
        this.logger.log(`Soft deleting user: ${userId}`, tracerId);
        return this.userModel.findByIdAndUpdate(
            userId,
            {
                is_delete: true,
                latest_update: new Date()
            },
            { new: true }
        ).exec();
    }
}
