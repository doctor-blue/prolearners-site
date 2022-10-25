
import { UserMapper } from "src/data/mappers/UserMapper";
import User from "src/domain/model/User";

export default class MapperModule {
    private static instance: MapperModule;

    private constructor() { }

    public static getInstance(): MapperModule {
        if (MapperModule.instance == null)
            MapperModule.instance = new MapperModule()
        return MapperModule.instance;
    }

    provideUserMapper(): UserMapper {
        return new UserMapper();
    }

}
