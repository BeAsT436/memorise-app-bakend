import { IUser } from '../interfaces/IUser'
import User from '../models/user-model'

class UserService {
  public async getUserById(id: string) {
    try {
      return User.findById(id)
    } catch (_error) {
      throw new Error('failed to fetch user')
    }
  }

  public async getAllUsers() {
    try {
      return User.find()
    } catch (_error) {
      throw new Error('failed to fetch users')
    }
  }

  public async createUser(
    userData: Omit<IUser, 'createdAt' | 'UpdateAt' | '_id'>,
  ): Promise<IUser> {
    try {
      const newUser = new User(userData)
      return await newUser.save()
    } catch (_error) {
      throw new Error('failed to create user')
    }
  }

  public async updateUser(
    id: string,
    userData: Partial<Omit<IUser, 'createdAt' | 'UpdateAt' | '_id'>>,
  ): Promise<IUser> {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,
      })
      if (!updatedUser) {
        throw new Error('user not found')
      }
      return updatedUser
    } catch (_error) {
      throw new Error('failed to update user')
    }
  }

  public async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await User.findByIdAndDelete(id)
      return result !== null
    } catch (_error) {
      throw new Error('failed to delete user')
    }
  }
}
export default new UserService()
