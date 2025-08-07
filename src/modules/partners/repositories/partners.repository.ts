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
}
