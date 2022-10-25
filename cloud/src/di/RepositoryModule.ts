import AuthenticationRepositoryImpl from "../data/repository/AuthenticationRepositoryImpl";
import AuthenticationRepository from "../domain/repository/AuthenticationRepository";
import { CategoryRepository } from "../domain/repository/CategoryRepository";


export default class RepositoryModule {
    private static instance: RepositoryModule;

    private constructor() { }

    public static getInstance(): RepositoryModule {
        if (RepositoryModule.instance == null)
            RepositoryModule.instance = new RepositoryModule()
        return RepositoryModule.instance;
    }


    provideAuthenticationRepository(): AuthenticationRepository {
        return new AuthenticationRepositoryImpl()
    }
}