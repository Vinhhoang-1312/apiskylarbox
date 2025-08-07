import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@modules/base/base.repository';
import { Testimonials, TestimonialsDocument } from '../schemas/testimonials.schema';

@Injectable()
export class TestimonialsRepository extends BaseRepository<TestimonialsDocument> {
    constructor(
        @InjectModel(Testimonials.name)
        private readonly testimonialsModel: Model<TestimonialsDocument>,
    ) {
        super(testimonialsModel);
    }
}
