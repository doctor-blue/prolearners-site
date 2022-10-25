import User from "../../domain/model/User";

export class RegisterDto {
    user_info: User;
    password: string;

    constructor(user_info: User, password: string) {
        this.user_info = user_info;
        this.password = password;
    }

    static fromObj(obj: any): RegisterDto {
        return new RegisterDto(
            User.fromObj(obj.user_info),
            obj.password,
        )
    }
}