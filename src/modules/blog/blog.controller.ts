import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpStatus,
    HttpCode,
    Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { CreateBlogDto, UpdateBlogDto, FilterBlogDto } from './dto/blog.dto';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new blog post' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Blog post created successfully',
    })
    async create(
        @Body() createBlogDto: CreateBlogDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.create(createBlogDto, tracerId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all blog posts with pagination and filters' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog posts retrieved successfully',
    })
    async findAll(
        @Query() filterDto: FilterBlogDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findAll(filterDto, tracerId);
    }

    @Get('featured')
    @ApiOperation({ summary: 'Get featured blog posts' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Featured blog posts retrieved successfully',
    })
    async findFeatured(@Headers('tracer') tracerId?: string) {
        return this.blogService.findFeaturedPosts(tracerId);
    }

    @Get('popular')
    @ApiOperation({ summary: 'Get popular blog posts' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Popular blog posts retrieved successfully',
    })
    async findPopular(@Headers('tracer') tracerId?: string) {
        return this.blogService.findPopularPosts(tracerId);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get a blog post by slug' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog post found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Blog post not found',
    })
    async findBySlug(
        @Param('slug') slug: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findBySlug(slug, tracerId);
    }

    @Get('category/:category')
    @ApiOperation({ summary: 'Get blog posts by category' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog posts retrieved successfully',
    })
    async findByCategory(
        @Param('category') category: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findByCategory(category, tracerId);
    }

    @Get('author/:author')
    @ApiOperation({ summary: 'Get blog posts by author' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog posts retrieved successfully',
    })
    async findByAuthor(
        @Param('author') author: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findByAuthor(author, tracerId);
    }

    @Post('tags')
    @ApiOperation({ summary: 'Get blog posts by tags' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog posts retrieved successfully',
    })
    async findByTags(
        @Body() tags: string[],
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findByTags(tags, tracerId);
    }

    @Post(':id/like')
    @ApiOperation({ summary: 'Like a blog post' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog post liked successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Blog post not found',
    })
    async likePost(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.incrementLikeCount(id, tracerId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a blog post by ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog post found',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Blog post not found',
    })
    async findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.findOne(id, tracerId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a blog post' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Blog post updated successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Blog post not found',
    })
    async update(
        @Param('id') id: string,
        @Body() updateBlogDto: UpdateBlogDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.update(id, updateBlogDto, tracerId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a blog post' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Blog post deleted successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Blog post not found',
    })
    async remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.blogService.remove(id, tracerId);
    }
}
