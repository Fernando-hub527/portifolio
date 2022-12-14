import { IError } from "./IError";

export class InvalidCredentials implements IError{
    statusCode = 401;
    msgError: String;

    constructor(){
        this.msgError = `Invalid user credentials`
    }

    getError(): String {
        return this.msgError
    }
    getStatus(): number {
        return this.statusCode
    }

}