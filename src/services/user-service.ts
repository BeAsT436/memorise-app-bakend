import { IUser } from "../interfaces/IUser"
import User from "../models/user-model"


class UserService {
    public async getAllUsers(){
        try {
            return User.find()
        } catch (error) {
            throw new Error("failde to fetch users")
        }
    }

    public async createUser(userData: Omit<IUser, "createdAt"|"UpdateAt"|"_id">):Promise<IUser>{
        try {
           const newUser = new User(userData)
           return await newUser.save()
        } catch (error) {
            throw new Error("failde to create user")
        }
    }
}
export default new UserService()