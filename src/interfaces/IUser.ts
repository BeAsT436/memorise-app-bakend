import { ObjectId } from "mongoose"

export interface IUser{
    email: string
    password: string
    name: string
    createdAt?:Date
    updatedAt?:Date
    _id?:ObjectId
}