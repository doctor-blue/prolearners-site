import DomainMapper from "../../domain/mappers/DomainMapper";
import User from "../../domain/model/User";
import { UserEntity } from "../entity/UserEntity";

export class UserMapper implements DomainMapper<User, UserEntity>{
    toDomain(entity: UserEntity): User {
        return new User(
            entity.user_id,
            entity.first_name,
            entity.last_name,
            entity.user_name,
            entity.email,
            entity.phone_number,
            entity.avatar,
            entity.gender,
            entity.is_active,
            entity.dob.toString(),
            entity.permission_id
        );
    }
    fromDomain(domain: User): UserEntity {
        return new UserEntity(
            domain.userId,
            domain.firstName,
            domain.lastName,
            domain.userName,
            domain.email,
            domain.phoneNumber,
            "",
            "",
            "",
            domain.avatar,
            domain.gender,
            domain.isActive,
            domain.dob,
            domain.permissionId
        )
    }
}