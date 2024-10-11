import { IUser } from './../interfaces/IUser';
import { Document, model, ObjectId, Schema } from "mongoose";

export interface IUserDocument extends Omit<IUser, "_id">, Document{
    _id:ObjectId
}
const userSchema = new Schema<IUserDocument>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique:true},
        password: {type: String, required: true}
    },
    {
        timestamps:true
    }

)

const User = model("User", userSchema)

export default User