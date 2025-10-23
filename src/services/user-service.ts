import { IUser } from '../interfaces/IUser'
import User from '../models/user-model'

class UserService {
  public async getUserById(id: string) {
    try {
      // todo remove password before sending
      const result = await User.findById(id).exec()
      if (!result){
        return
      }
      const {password,__v,...rest} = result.toObject()
      console.log("result:", result);
      console.log("rest:", rest);
      return {id:rest._id,...rest}

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
    userData: Omit<
      IUser,
      'createdAt' | 'UpdateAt' | '_id' | 'subscribers' | 'subscriptions'
    >,
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
  public async subscribeUser(currentId:string,idToSubscribe:string){
    if (currentId === idToSubscribe) {
      throw new Error('cannot follow yourself')
    }

    const currentUser = await User.findById(currentId)
    const userToSubscribe = await User.findById(idToSubscribe)


    if (!currentUser || !userToSubscribe) {
      throw new Error(`user ${currentUser},${userToSubscribe} not found`)
    }

    currentUser.subscriptions.push(userToSubscribe.id)
    userToSubscribe.subscribers.push(currentUser.id)

    await currentUser.save()
    await userToSubscribe.save()

    return {message:"successfully subscribed"}
  }

  public async unsubscribeUser(currentId:string,idToUnsubscribe:string){

    const currentUser = await User.findById(currentId)
    const userToUnsubscribe = await User.findById(idToUnsubscribe)


    if (!currentUser || !userToUnsubscribe) {
      throw new Error(`user ${currentUser},${userToUnsubscribe} not found`)
    }

    currentUser.subscriptions = currentUser.subscriptions.filter((id)=>id.toString()!==idToUnsubscribe)
    userToUnsubscribe.subscriptions = userToUnsubscribe.subscriptions.filter((id)=>id.toString()!==currentId)

    await currentUser.save()
    await userToUnsubscribe.save()

    return {message:"successfully subscribed"}
  }
}
export default new UserService()
