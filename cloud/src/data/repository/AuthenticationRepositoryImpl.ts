import { AUTHENTICATION_FAILURE, EMAIL_ALREADY_EXISTS, INCORRECT_USER_NAME_PWD } from "../../domain/const/ErrorConst";
import { Status } from "../../domain/model/Status";
import User from "../../domain/model/User";
import AuthenticationRepository from "../../domain/repository/AuthenticationRepository";
import StateCallback from "../../domain/utils/StateCallback";
import bcrypt from 'bcrypt';
import { Token } from "../../domain/model/Token";


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;


// function jwtWebToken(user_id: string, user_name: string, permission_type: string): Token {
//     const user = { user_id, user_name, permission_type };
//     let acc = '';
//     let ref = '';
//     if (refreshTokenSecret) ref = refreshTokenSecret;
//     if (accessTokenSecret) acc = accessTokenSecret;

//     const accessToken = jwt.sign(user, acc, { expiresIn: '1 days' });
//     const refreshToken = jwt.sign(user, ref, { expiresIn: '7 days' });
//     return new Token(accessToken, refreshToken);
// }



export default class AuthenticationRepositoryImpl implements AuthenticationRepository {
    private userEmailQuery = "select * from users where email = $1 or user_name = $1";
    private signUpQuery = "insert into users(first_name,last_name,user_name,email,dob,permission_id,password) values($1,$2,$3,$4,$5,$6,$7) returning *";



    login(userName: string, password: string, callback: StateCallback<Token, Status>) {
        console.log("Login ", userName, password);

        this.startSignIn(userName, password, callback)
    }

    signUp(user: User, password: string, callback: StateCallback<boolean, Status>) {

        this.startSignUp(user, password, callback);
    }

    forgotPassword(email: string) {
        throw new Error("Method not implemented.");
    }

    refreshToken(refreshToken: string, callback: StateCallback<Token, Status>) {
        if (!refreshToken)
            callback.onFailure(401, new Status(401, 'refresh token is null.'));
        let ref = '';

        if (refreshTokenSecret) ref = refreshTokenSecret

        // jwt.verify(refreshToken, ref, (error: any, user: any) => {
        //     if (error)
        //         callback.onFailure(403, new Status(403, 'refresh token error.'));

        //     callback.onSuccess(jwtWebToken(user.user_id, user.email, user.permission_type));
        // });
    }



    private startSignIn = async (userName: string, password: string, callback: StateCallback<Token, Status>) => {
        try {
            // const users = await postgresPool.query(this.userEmailQuery, [userName]);
            // if (users.rows.length === 0) {
            //     callback.onFailure(401, INCORRECT_USER_NAME_PWD);
            //     return;
            // }
            // const validPassword = await bcrypt.compare(password, users.rows[0].password);

            // if (!validPassword) {
            //     callback.onFailure(401, INCORRECT_USER_NAME_PWD);
            //     return;
            // }
            // const tokens = jwtWebToken(users.rows[0].user_id, users.rows[0].email,users.rows[0].permission_type);
            // // generate and store token
            // callback.onSuccess(tokens)
        } catch (err) {
            console.log('signin err', err);

            callback.onFailure(401, AUTHENTICATION_FAILURE)
        }
    }

    private startSignUp = async (user: User, password: string, callback: StateCallback<boolean, Status>) => {

        // try {
        //     const users = await postgresPool.query(this.userEmailQuery, [user.email]);
        //     if (users.rows.length !== 0) {
        //         callback.onFailure(401, EMAIL_ALREADY_EXISTS);
        //         return;
        //     }

        //     const hashedPassword = await bcrypt.hash(password, 10);
        //     const newUser = await postgresPool.query(this.signUpQuery, [
        //         user.first_name, user.last_name, user.user_name, user.email, user.dob, 1, hashedPassword
        //     ]);
        //     callback.onSuccess(newUser.rows.length !== 0)
        // } catch (err) {
        //     callback.onFailure(401, AUTHENTICATION_FAILURE)
        // }
    }
}