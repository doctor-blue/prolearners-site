import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Status } from 'src/domain/model/Status';
import { Token } from 'src/domain/model/Token';
import { Repository } from 'typeorm';
import { IResponse } from 'src/presentation/response/IResponse';
import { UserEntity } from 'src/data/entity/UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AUTHENTICATION_FAILURE, EMAIL_ALREADY_EXISTS, INCORRECT_USER_NAME_PWD, INVALID_USER_INFO, REFRESH_TOKEN_FAILURE } from 'src/domain/const/ErrorConst';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/presentation/dto/RegisterDto';
import { SUCCESS_STATUS } from 'src/domain/const/StatusConst';
import MapperModule from 'src/di/MapperModule';
import * as jwt from 'jsonwebtoken';
import StateCallback from 'src/domain/utils/StateCallback';

function jwtWebToken(user_id: string, user_name: string): string {
    const user = { user_id, user_name };

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7 days' });
    return refreshToken;
}

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }


    async login(userName: string, password: string): Promise<IResponse<Token>> {

        if (!userName ||
            !password)
            throw new UnauthorizedException(INVALID_USER_INFO.toJson());


        const user = await this.validateUser(userName, password);
        const payload = { user_name: user.email, user_id: user.user_id };

        return new IResponse(
            new Token(this.jwtService.sign(payload), jwtWebToken(payload.user_id, payload.user_name)),
            SUCCESS_STATUS
        );
    }

    async validateUser(userName: string, password: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ email: userName });
        if (!user) {
            throw new UnauthorizedException(INCORRECT_USER_NAME_PWD.toJson())
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new UnauthorizedException(INCORRECT_USER_NAME_PWD.toJson())
        }
        return user
    }

    async register(registerDto: RegisterDto): Promise<IResponse<boolean>> {

        if (!registerDto.user_info.email ||
            !registerDto.user_info.userName ||
            !registerDto.user_info.gender ||
            !registerDto.password)
            throw new UnauthorizedException(INVALID_USER_INFO.toJson());


        const users = await this.userRepository.find({
            where: [
                {
                    email: registerDto.user_info.email
                },
                {
                    user_name: registerDto.user_info.userName
                }
            ]
        });

        if (users.length != 0) {
            throw new UnauthorizedException(EMAIL_ALREADY_EXISTS.toJson());
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const userInfo = registerDto.user_info;
        const newUser = await this.userRepository.createQueryBuilder()
            .insert().into(UserEntity).values([
                {
                    first_name: userInfo.firstName,
                    last_name: userInfo.lastName,
                    user_name: userInfo.userName,
                    email: userInfo.email,
                    dob: userInfo.dob,
                    permission_id: 1,
                    password: hashedPassword,
                    avatar: userInfo.avatar,
                    phone_number: userInfo.phoneNumber,
                    is_active: true,
                    gender: userInfo.gender
                }
            ]).execute();

        if (!newUser) {
            throw new UnauthorizedException(AUTHENTICATION_FAILURE.toJson())
        }
        return new IResponse(true, SUCCESS_STATUS)

    }

    async refreshToken(refreshToken: string, callback: StateCallback<Token, Status>) {
        if (!refreshToken)
            callback.onFailure(401, REFRESH_TOKEN_FAILURE);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error: any, user: any) => {
            if (error) {
                callback.onFailure(401, REFRESH_TOKEN_FAILURE);
                return
            }
            const payload = { user_name: user.email, user_id: user.user_id };
            callback.onSuccess(
                new Token(this.jwtService.sign(payload), jwtWebToken(user.user_id, user.email))
            );
        });
    }
}
