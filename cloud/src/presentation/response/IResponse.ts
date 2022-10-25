import { Status } from "../../domain/model/Status";

export class IResponse<T>{
    data?: T;
    status: Status
    constructor(data: T, status: Status) {
        this.data = data;
        this.status = status
    }
}