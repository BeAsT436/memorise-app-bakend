import User from "../models/user-model"
import jwt from "jsonwebtoken"

class AuthService {
    private secretKey:string 
    constructor(secret:string) {
        this.secretKey = secret
    }
    async register(userData:{name:string, email:string, password:string}):Promise<{token:string}>{
        const {email,name,password} = userData
        const exitingUser = await User.findOne({email})
        if (exitingUser) {
            throw new Error("user is exiting")
        }
        const newUser = new User({name, email, password})
        await newUser.save()
        return {
            
            token:jwt.sign({userId:newUser._id, name:newUser.name, email:newUser.email}, this.secretKey, {expiresIn:"24h"})
        }
    }
}
export const authService = new AuthService("my secret key")