import { Status } from "../model/Status";
import { Token } from "../model/Token";
import User from "../model/User";
import StateCallback from "../utils/StateCallback";

export default interface AuthenticationRepository extends Repository {

    login(userName: string, password: string, callback: StateCallback<Token, Status>): any;

    signUp(user: User, password: string, callback: StateCallback<boolean, Status>): any;

    forgotPassword(email: string): any

    refreshToken(refreshToken: string, callback: StateCallback<Token, Status>): any
}