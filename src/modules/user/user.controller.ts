import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Headers,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@modules/auth/decorators/roles.decorator';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async create(
        @Body() createUserDto: CreateUserDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.userService.create(createUserDto, tracerId);
    }

    @Get()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    async findAll(@Headers('tracer') tracerId?: string) {
        return this.userService.findAll(tracerId);
    }

    @Get('admins')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Get all admin users' })
    @ApiResponse({ status: 200, description: 'Return all admin users' })
    async findAdmins(@Headers('tracer') tracerId?: string) {
        return this.userService.findAdmins(tracerId);
    }

    @Get('active')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Get all active users' })
    @ApiResponse({ status: 200, description: 'Return all active users' })
    async findActiveUsers(@Headers('tracer') tracerId?: string) {
        return this.userService.findActiveUsers(tracerId);
    }

    @Get(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'Return user by ID' })
    async findOne(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.userService.findOne(id, tracerId);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.userService.update(id, updateUserDto, tracerId);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    async remove(
        @Param('id') id: string,
        @Headers('tracer') tracerId?: string,
    ) {
        return this.userService.delete(id, tracerId);
    }
}
