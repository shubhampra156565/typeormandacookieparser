
import { Userrepo } from "../repo.ts/userreepo";
import { User } from "../entity/userEntity";


export class Register {

     private static instance : Register ;
     private constructor() { };

     public static getInstace() : Register{
        if( ! Register.instance) {
            Register.instance = new Register();
        }
        return Register.instance ; 
     }

     private async isEmailExits(email:string): Promise< boolean> {
        let isEMail = await Userrepo.findOne({where: {email : email }});
        if(!isEMail){
            return false
        }
        else{
            return true
        }
     }
     public main( email : string) {
        return this.isEmailExits(email)
     }
    private async retunrnUser(email : string) : Promise< User | null >  {

            return await Userrepo.findOne({ where : { email : email}});
        
      
    }  
    public main2( email : string ) {
        return this.retunrnUser(email)
    }
}