

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entity/UserEntity';

export const DatabaseModule = TypeOrmModule.forRoot(
    {
        type: 'postgres',
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: 'prolearners',
        entities: [
            UserEntity,
        ],
        synchronize: true,
    }
);

export const DatabaseFeature = TypeOrmModule.forFeature([
    UserEntity
])