import { Injectable } from '@nestjs/common';
import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

import { AppLogger } from '@shared/logger/logger.service';

@Injectable()
export abstract class BaseService<T extends Document> {
    protected readonly logger = new AppLogger(this.constructor.name);

    constructor(protected readonly model: Model<T>) { }

    async findWithPagination(
        params: {
            query?: FilterQuery<T>;
            page: number;
            limit: number;
            select: string | Record<string, number>;
            sort?: string;
            populate?: {
                path: string;
                select: string;
            };
        },
        tracerId?: string,
    ): Promise<{
        list: T[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }> {
        this.logger.log('Finding with pagination', tracerId);

        const { query = {}, page = 1, limit = 10, select, sort, populate } = params;
        const skip = (page - 1) * limit;

        let queryBuilder = this.model.find(query).select(select);

        if (sort) {
            queryBuilder = queryBuilder.sort(sort);
        }

        if (populate) {
            queryBuilder = queryBuilder.populate(populate.path, populate.select);
        }

        const [list, total] = await Promise.all([
            queryBuilder.skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            list,
            total,
            totalPages,
            page,
            limit,
        };
    }

    async findAll(
        params: {
            query?: FilterQuery<T>;
            select: string | Record<string, number>;
            sort?: string;
        },
        tracerId?: string,
    ): Promise<{
        total: number;
        list: T[];
    }> {
        this.logger.log('Finding all documents', tracerId);

        const { query = {}, select, sort } = params;
        let queryBuilder = this.model.find(query).select(select);

        if (sort) {
            queryBuilder = queryBuilder.sort(sort);
        }

        const list = await queryBuilder.exec();
        const total = list.length;

        return {
            total,
            list,
        };
    }

    async findOne(
        params: {
            query: FilterQuery<T>;
            select: string | Record<string, number>;
        },
        tracerId: string,
    ): Promise<T | null> {
        this.logger.log('Finding one document', tracerId);
        const { query, select } = params;
        return this.model.findOne(query).select(select).exec();
    }

    async findById(id: string, tracerId?: string): Promise<T | null> {
        this.logger.log(`Finding document by ID: ${id}`, tracerId);
        return this.model.findById(id).exec();
    }

    async create(data: Partial<T>, tracerId?: string): Promise<T> {
        this.logger.log('Creating new document', tracerId);
        const document = new this.model(data);
        return document.save();
    }

    async updateOne(
        params: {
            query: FilterQuery<T>;
            update: UpdateQuery<T>;
            option?: QueryOptions;
        },
        tracerId?: string,
    ): Promise<T | null> {
        this.logger.log('Updating one document', tracerId);
        const { query, update, option } = params;
        return this.model.findOneAndUpdate(query, update, {
            new: true,
            ...option,
        }).exec();
    }

    async updateById(
        id: string,
        update: UpdateQuery<T>,
        tracerId?: string,
    ): Promise<T | null> {
        this.logger.log(`Updating document by ID: ${id}`, tracerId);
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    async updateAll(
        params: {
            query: FilterQuery<T>;
            update: UpdateQuery<T>;
            option?: any;
        },
        tracerId?: string,
    ): Promise<any> {
        this.logger.log('Updating all documents', tracerId);
        const { query, update, option } = params;
        return this.model.updateMany(query, update, option).exec();
    }

    async delete(
        params: {
            query: FilterQuery<T>;
        },
        tracerId?: string,
    ): Promise<T | null> {
        this.logger.log('Deleting document', tracerId);
        const { query } = params;
        return this.model.findOneAndDelete(query).exec();
    }

    async deleteById(id: string, tracerId?: string): Promise<T | null> {
        this.logger.log(`Deleting document by ID: ${id}`, tracerId);
        return this.model.findByIdAndDelete(id).exec();
    }

    async count(query: FilterQuery<T> = {}, tracerId?: string): Promise<number> {
        this.logger.log('Counting documents', tracerId);
        return this.model.countDocuments(query).exec();
    }

    async exists(query: FilterQuery<T>, tracerId?: string): Promise<boolean> {
        this.logger.log('Checking if document exists', tracerId);
        const count = await this.model.countDocuments(query).exec();
        return count > 0;
    }
}
