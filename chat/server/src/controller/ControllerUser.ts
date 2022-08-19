import { Request, Response } from "express";
import { UserLoginDTO } from "../dto/userLoginDTO";
import { IServiceUser } from "../services/IServiceUser";
import { ServiceUser } from "../services/ServiceUser";
import dotenv from 'dotenv'
dotenv.config({path: "./server/env/dev/.env"})

export class ControllerUser{
    serviceUser: IServiceUser
    constructor(serviceUser?: IServiceUser){
        this.serviceUser = serviceUser || new ServiceUser()
    }

    login(req: Request, res: Response){
        this.serviceUser.validarUsuario({}, new UserLoginDTO(req.body.user, req.body.password), process.env.SECRET_KEY!).then((token) => {
            res.status(201).send(token)
        }).catch((error) => {
            res.status(401).send({error:error})
        })

    }
    
}