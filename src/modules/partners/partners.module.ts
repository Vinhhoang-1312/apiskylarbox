import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { PartnersRepository } from './repositories/partners.repository';
import { Partners, PartnersSchema } from './schemas/partners.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partners.name, schema: PartnersSchema },
    ]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService, PartnersRepository],
  exports: [PartnersService],
})
export class PartnersModule { }
