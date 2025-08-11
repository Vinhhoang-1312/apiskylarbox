import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { AppLogger } from '@shared/logger/logger.service';

import { CreatePartnerDto, UpdatePartnerDto, FilterPartnerDto } from './dto/partners.dto';
import { PartnersRepository } from './repositories/partners.repository';
import { PartnersDocument } from './schemas/partners.schema';

@Injectable()
export class PartnersService {
    private readonly logger = new AppLogger(this.constructor.name);

    constructor(private readonly partnersRepository: PartnersRepository) { }

    async create(
        createPartnerDto: CreatePartnerDto,
        tracerId?: string,
    ): Promise<PartnersDocument> {
        this.logger.log('Creating new partner', tracerId);

        // Check if partner ID already exists
        const existingPartner = await this.partnersRepository.findByPartnerId(
            createPartnerDto.id,
            tracerId,
        );

        if (existingPartner) {
            throw new ConflictException(
                `Partner with ID ${createPartnerDto.id} already exists`,
            );
        }

        return this.partnersRepository.insert(
            { update: createPartnerDto },
            tracerId,
        );
    }

    async findAll(
        filterDto: FilterPartnerDto,
        tracerId?: string,
    ): Promise<{
        list: PartnersDocument[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
    }> {
        this.logger.log('Finding all partners', tracerId);

        const query: any = {};

        if (filterDto.search) {
            query.$or = [
                { companyName: { $regex: filterDto.search, $options: 'i' } },
                { shortName: { $regex: filterDto.search, $options: 'i' } },
            ];
        }

        if (filterDto.package) {
            query.package = filterDto.package;
        }

        if (typeof filterDto.isActive === 'boolean') {
            query.isActive = filterDto.isActive;
        }

        return this.partnersRepository.findWithPagination(
            {
                query,
                page: filterDto.page || 1,
                limit: filterDto.limit || 10,
                select: '',
                sort: '-created_at',
            },
            tracerId,
        );
    }

    async findOne(id: number, tracerId?: string): Promise<PartnersDocument> {
        this.logger.log(`Finding partner with ID: ${id}`, tracerId);

        const partner = await this.partnersRepository.findByPartnerId(id, tracerId);

        if (!partner) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
        }

        return partner;
    }

    async update(
        id: number,
        updatePartnerDto: UpdatePartnerDto,
        tracerId?: string,
    ): Promise<PartnersDocument> {
        this.logger.log(`Updating partner with ID: ${id}`, tracerId);

        // Check if partner exists
        const existingPartner = await this.findOne(id, tracerId);

        // If updating ID, check for conflicts
        if (updatePartnerDto.id && updatePartnerDto.id !== id) {
            const conflictPartner = await this.partnersRepository.findByPartnerId(
                updatePartnerDto.id,
                tracerId,
            );
            if (conflictPartner) {
                throw new ConflictException(
                    `Partner with ID ${updatePartnerDto.id} already exists`,
                );
            }
        }

        const updated = await this.partnersRepository.updateOne(
            {
                query: { id },
                update: updatePartnerDto,
            },
            tracerId,
        );

        if (!updated) {
            throw new NotFoundException(`Partner with ID ${id} not found`);
        }

        return updated;
    }

    async remove(id: number, tracerId?: string): Promise<void> {
        this.logger.log(`Removing partner with ID: ${id}`, tracerId);

        const partner = await this.findOne(id, tracerId);

        await this.partnersRepository.delete(
            { query: { id } },
            tracerId,
        );
    }

    async findByPackage(
        packageType: string,
        tracerId?: string,
    ): Promise<PartnersDocument[]> {
        this.logger.log(`Finding partners by package: ${packageType}`, tracerId);
        return this.partnersRepository.findByPackage(packageType, tracerId);
    }
}
