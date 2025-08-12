import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FeaturedBoxesController } from './featured-boxes.controller';
import { FeaturedBoxesService } from './featured-boxes.service';
import { FeaturedBoxesRepository } from './repositories/featured-boxes.repository';
import { FeaturedBoxes, FeaturedBoxesSchema } from './schemas/featured-boxes.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FeaturedBoxes.name, schema: FeaturedBoxesSchema },
        ]),
    ],
    controllers: [FeaturedBoxesController],
    providers: [FeaturedBoxesService, FeaturedBoxesRepository],
    exports: [FeaturedBoxesService],
})
export class FeaturedBoxesModule { }


