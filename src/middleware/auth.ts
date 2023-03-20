import { Request,Response,NextFunction } from "express";
import { Userrepo, Sessionrepo } from "../repo.ts/userreepo";

async function AuthenticateSession(req : any ,res : any , next :NextFunction ) { 
    let session = req.signedCookies._smarttokenAuthid ; 
    if(session === undefined){
        return res.send(" Accesss denied you tempered the cookie")

    }
    let isSession = await Sessionrepo.findOne({where:{ session_id : session}})
        if(!isSession) { 
            req.isAuthorized = true
        }
        else{ 
            res.send({"staus":"failed","message":"is session is expred"}); 
        }


}