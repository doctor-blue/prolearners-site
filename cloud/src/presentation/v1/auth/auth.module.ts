import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entity/UserEntity';
import { PermissionEntity } from 'src/data/entity/PermissionEntity';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './refreshToken.strategy';


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity, PermissionEntity]),
        PassportModule,
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: '2 days' },
            
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule { }
