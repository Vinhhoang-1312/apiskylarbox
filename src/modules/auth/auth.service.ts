import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Users, UsersDocument } from '../user/schemas/users.schema';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Users.name)
        private readonly usersModel: Model<UsersDocument>,
    ) { }

    async register(registerDto: RegisterDto, tracerId?: string): Promise<{ user: UsersDocument; token: string }> {
        const { user_name, email, business_id } = registerDto;

        // Check if user already exists
        const existingUser = await this.usersModel.findOne({
            $or: [{ user_name }, { email }],
            is_delete: false,
        });

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Create new user
        const newUser = new this.usersModel({
            ...registerDto,
            password: hashedPassword,
            is_active: true,
            is_delete: false,
        });

        const savedUser = await newUser.save();

        // Generate token
        const token = this.generateToken(savedUser);

        return { user: savedUser, token };
    }

    async login(loginDto: LoginDto, tracerId?: string): Promise<{ user: UsersDocument; token: string }> {
        const { username, password } = loginDto;

        // Find user by username or email
        const user = await this.usersModel.findOne({
            $or: [{ user_name: username }, { email: username }],
            is_delete: false,
            is_active: true,
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate token
        const token = this.generateToken(user);

        return { user, token };
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto, tracerId?: string): Promise<{ token: string }> {
        try {
            const decoded = jwt.verify(refreshTokenDto.refreshToken, process.env.JWT_SECRET || 'secret') as any;

            const user = await this.usersModel.findOne({
                _id: decoded.userId,
                is_delete: false,
                is_active: true,
            });

            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }

            const token = this.generateToken(user);
            return { token };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private generateToken(user: UsersDocument): string {
        const payload = {
            userId: user._id,
            username: user.user_name,
            email: user.email,
            isAdmin: user.is_admin,
        };

        return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
            expiresIn: process.env.JWT_EXPIRES_IN || '24h' as any,
        });
    }

    async validateToken(token: string): Promise<UsersDocument> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

            const user = await this.usersModel.findOne({
                _id: decoded.userId,
                is_delete: false,
                is_active: true,
            });

            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
