import { TokenJwtDTO } from "../dto/TokenJwtDTO";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { IRepositoryUser } from "../database/repository/IRepositoryUser";
import { RepositoryUser } from "../database/repository/RepositoryUser";
import { gerarToken } from "../utils/token";
import { IServiceUser } from "./IServiceUser";
import { UserDTO } from "../dto/userDTO";
import { Result } from "../utils/Result";
import { InvalidCredentials } from "../errors/InvalidCredentials";

export class ServiceUser implements IServiceUser{
    repository: IRepositoryUser
    constructor(repository ?: IRepositoryUser){
        this.repository = repository || new RepositoryUser()
    }

    async registerUser(user: UserDTO): Promise<Result<UserDTO>> {
        return await this.repository.createUser(user)
    }


    async validarUser(user: UserLoginDTO): Promise<Result<UserDTO>> {
        let userOrError = await this.repository.foundUserByName(user.name)
        if(!userOrError.isSucess) return Result.fail(new InvalidCredentials()) 
        if(this.validaPassword(user.password, userOrError.getValue().password)){
            return userOrError
        }else{
            return Result.fail(new InvalidCredentials())
        }
    }

    private validaPassword(passwordA: String, passwordB: String){
        return passwordA === passwordB
    }

}