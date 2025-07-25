import { IUser } from './../interfaces/IUser'
import { Document, model, ObjectId, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  _id: ObjectId
  comperePassword: (password: string) => Promise<boolean>
}
const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar:{type: String, required:false},
    role: {
      type: String,
      enum: ['super', 'admin', 'user', 'guest'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})
userSchema.methods.comperePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

export default User
