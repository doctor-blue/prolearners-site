export class Status {
    code: number
    message: string

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message
    }

    toJson():string{
        return JSON.stringify(this);
    }
}