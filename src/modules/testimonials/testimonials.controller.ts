import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { Public } from '../../decorators/public.decorator';

import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto, QueryTestimonialDto } from './dto/testimonials.dto';
import { TestimonialsDocument } from './schemas/testimonials.schema';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
    constructor(private readonly testimonialsService: TestimonialsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new testimonial' })
    @ApiResponse({ status: 201, description: 'Testimonial created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(
        @Body() createTestimonialDto: CreateTestimonialDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<TestimonialsDocument> {
        return this.testimonialsService.create(createTestimonialDto, tracerId);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all testimonials with pagination' })
    @ApiResponse({ status: 200, description: 'Return list of testimonials' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'rating', required: false, type: Number })
    findAll(
        @Query() query: QueryTestimonialDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.testimonialsService.findAll(query, tracerId);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get a testimonial by id' })
    @ApiResponse({ status: 200, description: 'Return testimonial details' })
    @ApiResponse({ status: 404, description: 'Testimonial not found' })
    @ApiParam({ name: 'id', description: 'Testimonial ID' })
    findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<TestimonialsDocument> {
        return this.testimonialsService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a testimonial' })
    @ApiResponse({ status: 200, description: 'Testimonial updated successfully' })
    @ApiResponse({ status: 404, description: 'Testimonial not found' })
    @ApiParam({ name: 'id', description: 'Testimonial ID' })
    update(
        @Param('id') id: string,
        @Body() updateTestimonialDto: UpdateTestimonialDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<TestimonialsDocument> {
        return this.testimonialsService.update(id, updateTestimonialDto, tracerId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a testimonial' })
    @ApiResponse({ status: 200, description: 'Testimonial deleted successfully' })
    @ApiResponse({ status: 404, description: 'Testimonial not found' })
    @ApiParam({ name: 'id', description: 'Testimonial ID' })
    remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<TestimonialsDocument> {
        return this.testimonialsService.remove(id, tracerId);
    }
}
