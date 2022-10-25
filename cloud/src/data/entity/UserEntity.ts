import { currentTime } from 'src/domain/utils/Time';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { IEntity } from './IEntity';

@Entity("users")
export class UserEntity implements IEntity {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    user_name: string;
    @Column({
        length: 254
    })
    email: string;
    @Column({
        length: 20,
        nullable: true
    })
    phone_number?: string;
    @Column({
        length: 254
    })
    password: string;
    @Column({
        nullable: true,
        default: currentTime()
    })
    created_at: Date;

    @Column({
        nullable: true,
        default: currentTime()
    })
    updated_at: Date;

    @Column()
    avatar: string;

    @Column({ nullable: true })
    gender: number;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: true })
    is_enable: boolean;

    @Column({ nullable: true })
    dob?: Date;
    
    @Column({ nullable: true })
    permission_id: number;


    constructor(user_id: string,
        first_name: string,
        last_name: string,
        user_name: string,
        email: string,
        phone_number: string,
        password: string,
        created_at: string,
        updated_at: string,
        avartar: string,
        gender: number,
        is_active: boolean,
        dob: string,
        permissionId: number) {

        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_name = user_name;
        this.email = email;
        this.phone_number = phone_number;
        this.password = password;
        this.created_at = new Date(created_at);
        this.updated_at = new Date(updated_at);
        this.avatar = avartar;
        this.is_active = is_active;
        this.dob = new Date(dob);
        this.permission_id = permissionId;
        this.gender = gender;
    }
}