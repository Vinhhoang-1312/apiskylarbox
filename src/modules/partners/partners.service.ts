import { Injectable, NotFoundException } from '@nestjs/common';

import { PartnersRepository } from './repositories/partners.repository';
import { CreatePartnerDto, UpdatePartnerDto, QueryPartnerDto } from './dto/partners.dto';
import { PartnersDocument } from './schemas/partners.schema';

@Injectable()
export class PartnersService {
    constructor(private readonly partnersRepository: PartnersRepository) { }

    async create(createPartnerDto: CreatePartnerDto, tracerId?: string): Promise<PartnersDocument> {
        return this.partnersRepository.insert(
            {
                update: createPartnerDto,
            },
            tracerId,
        );
    }

    async findAll(query: QueryPartnerDto, tracerId?: string) {
        const { page = 1, limit = 10, search, package: packageFilter } = query;

        let filterQuery: any = { is_delete: false };

        if (search) {
            filterQuery.$or = [
                { companyName: { $regex: search, $options: 'i' } },
                { shortName: { $regex: search, $options: 'i' } },
            ];
        }

        if (packageFilter) {
            filterQuery.package = packageFilter;
        }

        return this.partnersRepository.findWithPagination(
            {
                query: filterQuery,
                page,
                limit,
                select: '',
                sort: 'sort_order created_at',
            },
            tracerId,
        );
    }

    async findOne(id: string, tracerId?: string): Promise<PartnersDocument> {
        const partner = await this.partnersRepository.findOne(
            {
                query: { _id: id, is_delete: false },
                select: '',
            },
            tracerId,
        );

        if (!partner) {
            throw new NotFoundException('Partner not found');
        }

        return partner;
    }

    async update(id: string, updatePartnerDto: UpdatePartnerDto, tracerId?: string): Promise<PartnersDocument> {
        const partner = await this.partnersRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: updatePartnerDto,
            },
            tracerId,
        );

        if (!partner) {
            throw new NotFoundException('Partner not found');
        }

        return partner;
    }

    async remove(id: string, tracerId?: string): Promise<PartnersDocument> {
        const partner = await this.partnersRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: { is_delete: true },
            },
            tracerId,
        );

        if (!partner) {
            throw new NotFoundException('Partner not found');
        }

        return partner;
    }
}
