import { Injectable, NotFoundException } from '@nestjs/common';

import { TestimonialsRepository } from './repositories/testimonials.repository';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from './dto/testimonials.dto';
import { TestimonialsDocument } from './schemas/testimonials.schema';

@Injectable()
export class TestimonialsService {
    constructor(private readonly testimonialsRepository: TestimonialsRepository) { }

    async create(createTestimonialDto: CreateTestimonialDto, tracerId?: string): Promise<TestimonialsDocument> {
        return this.testimonialsRepository.insert(
            {
                update: createTestimonialDto,
            },
            tracerId,
        );
    }

    async findAll(query: QueryTestimonialDto, tracerId?: string) {
        const { page = 1, limit = 10, search, rating } = query;

        let filterQuery: any = { is_delete: false };

        if (search) {
            filterQuery.$or = [
                { name: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        if (rating) {
            filterQuery.rating = rating;
        }

        return this.testimonialsRepository.findWithPagination(
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

    async findOne(id: string, tracerId?: string): Promise<TestimonialsDocument> {
        const testimonial = await this.testimonialsRepository.findOne(
            {
                query: { _id: id, is_delete: false },
                select: '',
            },
            tracerId,
        );

        if (!testimonial) {
            throw new NotFoundException('Testimonial not found');
        }

        return testimonial;
    }

    async update(id: string, updateTestimonialDto: UpdateTestimonialDto, tracerId?: string): Promise<TestimonialsDocument> {
        const testimonial = await this.testimonialsRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: updateTestimonialDto,
            },
            tracerId,
        );

        if (!testimonial) {
            throw new NotFoundException('Testimonial not found');
        }

        return testimonial;
    }

    async remove(id: string, tracerId?: string): Promise<TestimonialsDocument> {
        const testimonial = await this.testimonialsRepository.updateOne(
            {
                query: { _id: id, is_delete: false },
                update: { is_delete: true },
            },
            tracerId,
        );

        if (!testimonial) {
            throw new NotFoundException('Testimonial not found');
        }

        return testimonial;
    }
}
