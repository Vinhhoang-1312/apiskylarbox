import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';

import { Partners, PartnersDocument } from '../schemas/partners.schema';

@Injectable()
export class PartnersRepository extends BaseRepository<PartnersDocument> {
    constructor(
        @InjectModel(Partners.name)
        private readonly partnersModel: Model<PartnersDocument>,
    ) {
        super(partnersModel);
    }

    async findByPackage(
        packageType: string,
        tracerId?: string,
    ): Promise<PartnersDocument[]> {
        this.logger.debug(
            `Finding partners by package: ${packageType}`,
            tracerId,
        );
        return this.partnersModel
            .find({ package: packageType, isActive: true })
            .exec();
    }

    async findByCompanyName(
        search: string,
        tracerId?: string,
    ): Promise<PartnersDocument[]> {
        this.logger.debug(
            `Searching partners by company name: ${search}`,
            tracerId,
        );
        return this.partnersModel
            .find({
                $or: [
                    { companyName: { $regex: search, $options: 'i' } },
                    { shortName: { $regex: search, $options: 'i' } },
                ],
                isActive: true,
            })
            .exec();
    }

    async findByPartnerId(
        partnerId: number,
        tracerId?: string,
    ): Promise<PartnersDocument | null> {
        this.logger.debug(`Finding partner by ID: ${partnerId}`, tracerId);
        return this.partnersModel.findOne({ id: partnerId }).exec();
    }
}

