import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsRepository } from './repositories/testimonials.repository';
import { Testimonials, TestimonialsSchema } from './schemas/testimonials.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Testimonials.name, schema: TestimonialsSchema },
        ]),
    ],
    controllers: [TestimonialsController],
    providers: [TestimonialsService, TestimonialsRepository],
    exports: [TestimonialsService],
})
export class TestimonialsModule { }
