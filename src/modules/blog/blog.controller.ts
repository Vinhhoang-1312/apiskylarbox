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

import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto, QueryBlogDto } from './dto/blog.dto';
import { BlogDocument } from './schemas/blog.schema';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new blog post' })
    @ApiResponse({ status: 201, description: 'Blog post created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(
        @Body() createBlogDto: CreateBlogDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<BlogDocument> {
        return this.blogService.create(createBlogDto, tracerId);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all blog posts with pagination' })
    @ApiResponse({ status: 200, description: 'Return list of blog posts' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'author', required: false, type: String })
    findAll(
        @Query() query: QueryBlogDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findAll(query, tracerId);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Get a blog post by id' })
    @ApiResponse({ status: 200, description: 'Return blog post details' })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    @ApiParam({ name: 'id', description: 'Blog Post ID' })
    findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<BlogDocument> {
        return this.blogService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a blog post' })
    @ApiResponse({ status: 200, description: 'Blog post updated successfully' })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    @ApiParam({ name: 'id', description: 'Blog Post ID' })
    update(
        @Param('id') id: string,
        @Body() updateBlogDto: UpdateBlogDto,
        @Headers('tracer') tracerId?: string,
    ): Promise<BlogDocument> {
        return this.blogService.update(id, updateBlogDto, tracerId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a blog post' })
    @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
    @ApiResponse({ status: 404, description: 'Blog post not found' })
    @ApiParam({ name: 'id', description: 'Blog Post ID' })
    remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ): Promise<BlogDocument> {
        return this.blogService.remove(id, tracerId);
    }
}
