import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users, UsersSchema } from '../user/schemas/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UsersSchema },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }
