import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';
import { Categories, CategoriesDocument } from '../schemas/categories.schema';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoriesDocument> {
    constructor(
        @InjectModel(Categories.name)
        private readonly categoriesModel: Model<CategoriesDocument>,
    ) {
        super(categoriesModel);
    }
}
