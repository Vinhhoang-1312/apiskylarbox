import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users, UsersDocument } from '@modules/user/schemas/users.schema';

export interface JwtPayload {
    sub: string;
    email: string;
    user_name: string;
    is_admin?: boolean;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userModel
            .findById(payload.sub)
            .select('-password')
            .exec();

        if (!user || !user.is_active) {
            throw new UnauthorizedException('User not found or inactive');
        }

        return {
            userId: payload.sub,
            email: payload.email,
            user_name: payload.user_name,
            is_admin: payload.is_admin,
            user,
        };
    }
}


