import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repositories/categories.repository';
import { Categories, CategoriesSchema } from './schemas/categories.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Categories.name, schema: CategoriesSchema },
        ]),
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
    exports: [CategoriesService, MongooseModule],
})
export class CategoriesModule { }
