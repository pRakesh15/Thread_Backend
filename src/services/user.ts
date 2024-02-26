import JWT  from "jsonwebtoken"
import { prismaClient } from "../lib/db"
import { createHmac ,randomBytes} from "crypto"
export interface CreateUserPayload {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface GetUserTokenPayload{
    email: string
    password: string
}
const JWT_SECRET="i$aam$a$giidBOy"

class UserService {
    private static generateHash(salt:string,password:string)
    {
        const hashedPassword=  createHmac('sha256',salt).update(password).digest('hex')
        return hashedPassword
    }
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        const salt=randomBytes(32).toString();
        const hashedPassword=UserService.generateHash(salt,password);


        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword
            }
        })
    }
    
    private static getUserByEmail(email:string)
    {
        return prismaClient.user.findUnique({where:{email}});
    }

    public static async getUserToken(payload:GetUserTokenPayload)
    {
        const {email,password}=payload;
        const user=await UserService.getUserByEmail(email);
      if(!user) throw new Error('user nnot found');

      const userSalt=user.salt;
      const usershasedPassword=UserService.generateHash(userSalt,password);


      if(usershasedPassword!==user.password) throw new Error('incorrect Password');

      //Get a token
      const token=JWT.sign({id:user.id,email:user.email},JWT_SECRET)

      return token;
    }
    public static decodeJWTToken(token:string){
        return JWT.verify(token,JWT_SECRET);
    }
    public static getUserByid(id:string)
    {
        return prismaClient.user.findUnique({where:{id}})
    }

}

export default UserService