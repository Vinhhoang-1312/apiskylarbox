import { Injectable } from '@nestjs/common';

import { AppLogger } from '@shared/logger/logger.service';

import { Users, UsersDocument } from './schemas/users.schema';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(private readonly userRepository: UserRepository) { }

    async findAll(tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log('Finding all users', tracerId);
        const result = await this.userRepository.findAll({ select: '-password' }, tracerId);
        return result.list;
    }

    async findOne(id: string, tracerId?: string): Promise<UsersDocument> {
        this.logger.log(`Finding user with id: ${id}`, tracerId);
        const user = await this.userRepository.findOne(
            { query: { _id: id }, select: '-password' },
            tracerId
        );
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async findByEmail(email: string, tracerId?: string): Promise<UsersDocument | null> {
        this.logger.log(`Finding user with email: ${email}`, tracerId);
        return this.userRepository.findByEmail(email, tracerId);
    }

    async findByUsername(username: string, tracerId?: string): Promise<UsersDocument | null> {
        this.logger.log(`Finding user with username: ${username}`, tracerId);
        return this.userRepository.findByUsername(username, tracerId);
    }

    async create(userData: Partial<Users>, tracerId?: string): Promise<UsersDocument> {
        this.logger.log('Creating new user', tracerId);
        return this.userRepository.insert({ update: userData }, tracerId);
    }

    async update(id: string, updateData: Partial<Users>, tracerId?: string): Promise<UsersDocument> {
        this.logger.log(`Updating user with id: ${id}`, tracerId);
        const user = await this.userRepository.updateOne(
            { query: { _id: id }, update: updateData },
            tracerId
        );
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async delete(id: string, tracerId?: string): Promise<void> {
        this.logger.log(`Soft deleting user with id: ${id}`, tracerId);
        await this.userRepository.softDelete(id, tracerId);
    }

    async findAdmins(tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log('Finding admin users', tracerId);
        return this.userRepository.findAdmins(tracerId);
    }

    async findActiveUsers(tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log('Finding active users', tracerId);
        return this.userRepository.findActiveUsers(tracerId);
    }

    async findByBusinessId(businessId: string, tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log(`Finding users by business ID: ${businessId}`, tracerId);
        return this.userRepository.findByBusinessId(businessId, tracerId);
    }

    async searchUsers(searchTerm: string, tracerId?: string): Promise<UsersDocument[]> {
        this.logger.log(`Searching users with term: ${searchTerm}`, tracerId);
        return this.userRepository.searchUsers(searchTerm, tracerId);
    }

    async updatePassword(userId: string, hashedPassword: string, tracerId?: string): Promise<UsersDocument | null> {
        this.logger.log(`Updating password for user: ${userId}`, tracerId);
        return this.userRepository.updatePassword(userId, hashedPassword, tracerId);
    }

    async updateLastLogin(userId: string, tracerId?: string): Promise<UsersDocument | null> {
        this.logger.log(`Updating last login for user: ${userId}`, tracerId);
        return this.userRepository.updateLastLogin(userId, tracerId);
    }
}
