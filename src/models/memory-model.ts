import { ObjectId, Schema, model, Document } from "mongoose";

export interface IMemory{
    id:ObjectId
    createdAt?: Date
    updateAt?: Date
    desc:string
    title:string
    img?:string
    userId:ObjectId
    local:"public"|"private"
}
interface IMemoryDocument extends Omit<IMemory, "id">,Document{
    _id:ObjectId
}
const memorySchema = new Schema<IMemoryDocument>(
    {
        desc:{type:String, required:true},
        title:{type:String, required:true},
        img:{type:String, required:false},
        userId:{type:Schema.Types.ObjectId, ref:"User", required:true},
        local:{type:String,enum:["public","private"], default:"private"}
    },
    {
        timestamps:true
    }
)

const Memory = model<IMemoryDocument>("Memory", memorySchema)
export default Memory