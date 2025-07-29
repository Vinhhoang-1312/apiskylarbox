import {
  Document,
  FilterQuery,
  InsertManyResult,
  Model,
  QueryOptions,
  UpdateQuery,
  UpdateResult,
} from 'mongoose';

import { AppLogger } from '@shared/logger/logger.service';

export class BaseRepository<T extends Document> {
  readonly logger = new AppLogger(this.constructor.name);

  constructor(protected readonly model: Model<T>) {}

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
    const { query, page, limit, select, sort, populate } = params;

    const skip = (page - 1) * limit;

    this.logger.debug(
      `FindWithPagination - Conditions: ${JSON.stringify(query)}, Page: ${page}, Limit: ${limit}`,
      tracerId,
    );

    const [total, list] = await Promise.all([
      this.model.countDocuments(query),
      this.model
        .find(query)
        .skip(skip)
        .limit(limit)
        .select(select)
        .sort(sort)
        .populate(populate)
        .exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      list: list as T[],
      total,
      totalPages,
      page: page,
      limit: limit,
    };
  }

  async findAll(
    params: {
      query?: FilterQuery<T>;
      select: string | Record<string, number>;
    },
    tracerId?: string,
  ): Promise<{
    total: number;
    list: T[];
  }> {
    const { query = {}, select = '' } = params;
    const logMessage = `FindAll - Query: ${JSON.stringify(query)}, Select: ${JSON.stringify(select)}`;

    this.logger.debug(logMessage, tracerId);

    const [total, list] = await Promise.all([
      this.model.countDocuments(query),
      this.model.find(query).select(select).exec(),
    ]);

    return {
      total,
      list: list as T[],
    };
  }

  async findOne(
    params: {
      query: FilterQuery<T>;
      select: string | Record<string, number>;
    },
    tracerId: string,
  ): Promise<T | null> {
    const { query, select = '' } = params;
    const logMessage = `FindOne - Query: ${JSON.stringify(query)}, Select: ${JSON.stringify(select)}`;

    this.logger.debug(logMessage, tracerId);

    const result = await this.model.findOne(query).select(select).exec();
    return result as T;
  }

  async updateOne(
    params: {
      query: FilterQuery<T>;
      update: UpdateQuery<T>;
      option?: QueryOptions;
    },
    tracerId?: string,
  ): Promise<T | null> {
    const { query, update, option = { new: true } } = params;
    const logMessage = `Update - Query: ${JSON.stringify(query)}`;

    this.logger.debug(logMessage, tracerId);

    const newUpdate = !update.$set ? { $set: update } : update;

    return this.model.findOneAndUpdate(query, newUpdate, option).exec();
  }

  async updateAll(
    params: {
      query: FilterQuery<T>;
      update: UpdateQuery<T>;
      option?: QueryOptions;
    },
    tracerId?: string,
  ): Promise<UpdateResult | null> {
    const { query, update } = params;
    const logMessage = `Update - Query: ${JSON.stringify(query)}}`;

    this.logger.debug(logMessage, tracerId);

    const newUpdate = !update.$set ? { $set: update } : update;

    return this.model.updateMany(query, newUpdate).exec();
  }

  async insert(
    params: {
      update: any;
    },
    tracerId?: string,
  ): Promise<T> {
    const { update } = params;
    const logMessage = `Create - Data: ${JSON.stringify({
      fleetId: update.fleetId,
    })}`;

    this.logger.debug(logMessage, tracerId);

    const newDocument = await this.model.create(update);
    return newDocument;
  }

  async insertMany(
    params: {
      update: Partial<any>[];
    },
    tracerId?: string,
  ): Promise<InsertManyResult<T> | null> {
    const { update } = params;
    const logMessage = `InsertMany - Documents: ${JSON.stringify({
      count: update.length,
    })}`;

    this.logger.debug(logMessage, tracerId);
    const result = await this.model.insertMany(update);
    return result as unknown as InsertManyResult<T>;
  }

  async delete(
    params: {
      query: FilterQuery<T>;
    },
    tracerId?: string,
  ): Promise<T | null> {
    const { query } = params;
    const logMessage = `Delete - Query: ${JSON.stringify(query)}`;

    this.logger.debug(logMessage, tracerId);

    return this.model.findOneAndDelete(query).exec();
  }
}
