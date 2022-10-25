export default class User {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    gender: number;
    isActive: boolean;
    dob: string;
    permissionId: number;

    constructor(userId: string,
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        phoneNumber: string,
        avatar: string,
        gender: number,
        isActive: boolean,
        dob: string,
        permissionId: number) {

        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.avatar = avatar;
        this.isActive = isActive;
        this.dob = dob;
        this.permissionId = permissionId;
        this.gender = gender;
    }

    static fromObj(obj: any): User {
        return new User(
            obj.userId,
            obj.firstName,
            obj.lastName,
            obj.userName,
            obj.email,
            obj.phoneNumber,
            obj.avatar,
            obj.gender,
            obj.isActive,
            obj.dob,
            obj.permissionId
        )
    }

}