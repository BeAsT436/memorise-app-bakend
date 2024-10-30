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

    public async updateUser(id:string, userData:Partial<Omit<IUser, "createdAt"|"UpdateAt"|"_id">>):Promise<IUser>{
        try {
            const updatedUser = await User.findByIdAndUpdate(id, userData, {new: true})
            if (!updatedUser) {
                throw new Error("user not found")
            }
            return updatedUser
        } catch (error) {
            throw new Error("failed to update user")
        }
    }

    public async deleteUser(id:string):Promise<boolean>{
        try {
            const result = await User.findByIdAndDelete(id)
            return result !== null
        } catch (error) {
            throw new Error("failed to delete user")
        }
    }
}
export default new UserService()