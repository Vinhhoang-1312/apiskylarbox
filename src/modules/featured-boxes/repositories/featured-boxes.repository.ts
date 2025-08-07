import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';
import { FeaturedBoxes, FeaturedBoxesDocument } from '../schemas/featured-boxes.schema';

@Injectable()
export class FeaturedBoxesRepository extends BaseRepository<FeaturedBoxesDocument> {
    constructor(
        @InjectModel(FeaturedBoxes.name)
        private readonly featuredBoxesModel: Model<FeaturedBoxesDocument>,
    ) {
        super(featuredBoxesModel);
    }
}
