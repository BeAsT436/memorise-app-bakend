import User from "../models/user-model"


class UserService {
    public async getAllUsers(){
        try {
            return User.find()
        } catch (error) {
            throw new Error("failde to fetch users")
        }
    }
}
export default new UserService()