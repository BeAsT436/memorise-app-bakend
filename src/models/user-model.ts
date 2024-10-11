import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique:true},
        pasword: {type: String, required: true}
    },
    {
        timestamps:true
    }

)

const User = model("User", userSchema)

export default User